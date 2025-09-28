export const authAdmin = (req, res, next) => {
    //get token from header

    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: not admin" });
    }
    next();
};
