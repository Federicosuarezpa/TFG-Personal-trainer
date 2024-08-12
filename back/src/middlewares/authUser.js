import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: 'Token is required' });
        }
        const token = authorization.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token is required' });
        }
        req.userAuth = jwt.verify(token, process.env.SECRET);

        next();
    }catch (error) {
        next(error)
    }
}
