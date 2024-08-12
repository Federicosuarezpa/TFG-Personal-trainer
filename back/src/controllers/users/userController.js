import hashPassword from '../../utils/hashingPassword.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import createUserUseCase from "../../useCases/users/createUser.js";
import getUserByEmail from "../../useCases/users/getUserByEmail.js";
import getUserByEmailAndPassword from "../../useCases/users/getUserByEmailAndPassword.js";
import getUserById from "../../useCases/users/getUserById.js";
import updateUserData from "../../useCases/users/updateUserData.js";
import updateUserProfileImage from "../../useCases/users/updateUserProfileImage.js";
import removeUserAccount from "../../useCases/users/removeUser.js";
import {validateEmail, validatePass, validateUserName} from "../../helpers/auxFunctions.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import getUserByToken from "../../useCases/users/getUserByToken.js";

dotenv.config({ path: '../../.env' });

async function login(req, res, next) {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required'});
        }

        const user = await getUserByEmailAndPassword(email, password);

        if (!user) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const info = {
            id: user.id,
            date: new Date(),
        };
        const token = jwt.sign(info, process.env.SECRET, {
            expiresIn: "1d",
        });

        res.status(200).json({message: 'Login successful', token});
    } catch (error) {
        next(error)
    }
}

async function register(req, res, next) {
    try {
        const {email, password, age, name, lastname, address, phone} = req.body;

        if (!email || !password || !age || !name || !lastname || !address || !phone) {
            res.status(400).json({message: 'All fields are required'});
        }

        const validEmail = validateEmail(email);

        if (!validEmail) {
            return res.status(400).json({message: 'Invalid email'});
        }

        const validPassword = validatePass(password);

        if (!validPassword) {
            return res.status(400).json({message: 'Invalid password. Password must be 8-30 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character'});
        }

        const validUserName = validateUserName(name);

        if (!validUserName) {
            return res.status(400).json({message: 'Invalid name'});
        }

        const user = await getUserByEmail(email);

        if (user) {
            return res.status(401).json({message: 'Email already in use'});
        }

        const newUser = await createUserUseCase(email, password, age, name, lastname, address, phone);

        const info = {
            id: newUser.id,
            date: new Date(),
        };
        const token = jwt.sign(info, process.env.SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({message: 'User created', token});
    } catch (error) {
        next(error)
    }
}

async function updateUser(req, res, next) {
    try {
        const { age, address, phone, gender } = req.body;

        if ( !age || !address || !phone || !gender) {
            res.status(400).json({message: 'All fields are required'});
        }

        const { id } = req.userAuth;

        await updateUserData(age, address, phone, gender, id);

        res.status(200).json({message: 'User updated'});
    } catch (error) {
        next(error)
    }
}

async function saveProfileImage(req, res, next) {
    try {
        const uploadFIle = req.file;

        const { id } = req.userAuth;

        await updateUserProfileImage(uploadFIle.filename, id);

        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${uploadFIle.filename}`;

        res.status(200).json({message: 'User updated', fileUrl});
    } catch (error) {
        next(error)
    }
}

async function getUserData(req, res, next) {
    try {
        const {id} = req.params;

        if (!id) {
            res.status(400).json({message: 'Id is required'});
        }

        const user = await getUserById(id);

        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }

        const userInfo = {
            name: user.name,
            lastname: user.lastname,
            age: user.age,
            address: user.address,
            phone: user.phone,
            gender: user.gender,
            email: user.email,
        }

        res.status(200).json({message: 'User updated', userInfo});
    } catch (error) {
        next(error)
    }
}

async function getUserProfilePhoto(req, res, next) {
    try {
        const { id } = req.userAuth;

        if (!id) {
            res.status(400).json({message: 'Id is required'});
        }

        const userData = await getUserById(id);
        const userDataFormatted = userData.dataValues;
        const imageLink = userDataFormatted.image;
        if (!imageLink) {
            return res.status(200).json({message: 'Image not found'});
        }
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${imageLink}`;

        res.status(200).json({message: 'User updated', fileUrl});
    } catch (error) {
        next(error)
    }
}


async function changePasswordWithToken(req, res, next) {
    try {
        const { password, token } = req.body;

        if ( !password || !token) {
            res.status(400).json({error: 'All fields are required'});
        }

        const validPassword = validatePass(password);

        if (!validPassword) {
            return res.status(400).json({error: 'Invalid password. Password must be 8-30 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character'});
        }


        const user = await getUserByToken(token);

        if (!user) {
            return res.status(400).json({error: 'Invalid Token'});
        }

        const hashedPassword = hashPassword(password);

        await user.update({
            password: hashedPassword,
            token: null,
        });

        res.status(200).json({message: 'Password updated'});
    } catch (error) {
        next(error)
    }
}

async function forgottenPassword(req, res, next) {
    try {
        const {email} = req.body;

        if (!email) {
            res.status(400).json({error: 'Email is required'});
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(400).json({error: 'User not found'});
        }

        const token = crypto.randomBytes(20).toString('hex');

        await user.update({
            token,
        });

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'pokz1z2x@gmail.com',
                pass: 'gunw hgea uzsi deun',
            },
        });

        const mailOptions = {
            from: 'pokz1z2x@outlook.es',
            to: email,
            subject: 'Password reset token',
            text: `Here you have your token to generate new password: ${token}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({message: 'Token created', token});
    } catch (error) {
        next(error)
    }
}

async function removeUser(req, res, next) {
    try {
        const {id} = req.userAuth;

        if (!id) {
            res.status(400).json({message: 'Token is not valid'});
        }

        await removeUserAccount(id);

        res.status(200).json({message: 'User deleted'});
    } catch (error) {
        next(error)
    }

}

export {login, register, forgottenPassword, changePasswordWithToken, updateUser, removeUser, getUserData, saveProfileImage, getUserProfilePhoto};