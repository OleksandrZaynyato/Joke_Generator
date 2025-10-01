import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};
