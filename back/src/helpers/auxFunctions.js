import multer from 'multer';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + uuidv4() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**Comprobamos que tenga entre 8-30 de longitud y que tenga al menos una mayúscula, un dígito, una minúscula y un carácter especial */
function validatePass(pass) {
    let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/;
    return passRegex.test(String(pass));
}
/**Comprobamos que el nombre solo tenga mayúsculas, minúsculas o dígitos */
function validateUserName(name) {
    const nameRegex = /^[a-zA-Z0-9\-]+$/;
    return nameRegex.test(String(name));
}

export { upload, validatePass, validateEmail, validateUserName };
