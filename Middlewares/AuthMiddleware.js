    const jwt = require('jsonwebtoken');

    const verifyToken = (req, res, next) => {
        const authHeader = req.header('Authorization');
        if (!authHeader) return res.status(401).json({ message: "No Token Provided" });

        const token = authHeader.split(' ')[1]; // Splits "Bearer <token>" into ["Bearer", "<token>"]

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            req.admin = verified; 
            next();
        } catch (err) {
            res.status(400).json({ message: "Invalid Token" });
        }
    };

    const checkSuperAdmin = (req, res, next) => {
        if (req.admin && req.admin.role === 'superadmin') {
            next();
        } else {
            res.status(403).json({ message: "Access denied. SuperAdmin rights required." });
        }
    };

    module.exports = {verifyToken, checkSuperAdmin};