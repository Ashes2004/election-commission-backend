import jwt from "jsonwebtoken";

// Middleware to authenticate user
export const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), "hashmap"); 
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

// Middleware to authorize admin
export const authorizeAdmin = (req, res, next) => {
    authenticateUser(req, res, () => {
        if (req.user.role !== "Admin") {
            return res.status(403).json({ message: "Access Denied. Admins only." });
        }
        next();
    });
};

// Middleware to authorize voter
export const authorizeVoter = (req, res, next) => {
    authenticateUser(req, res, () => {
        if (req.user.role !== "voter") {
            return res.status(403).json({ message: "Access Denied. Voters only." });
        }
        next();
    });
};

// Middleware to authorize candidate
export const authorizeCandidate = (req, res, next) => {
    authenticateUser(req, res, () => {
        if (req.user.role !== "candidate") {
            return res.status(403).json({ message: "Access Denied. Candidates only." });
        }
        next();
    });
};
