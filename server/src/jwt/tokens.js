import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("JWT_SECRET is not defined");
}

export function createToken(user) {
    if (!user || !user.id) {
        throw new Error("User object must contain an id");
    }

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    return token;
}

export function verifyToken(token) {
    try {
        if (!token || !token.startsWith("Bearer ")) {
            throw new Error("Token format is invalid");
        }

        const tokenToVerify = token.split(" ")[1];
        const decoded = jwt.verify(tokenToVerify, secret);
        return decoded;
    } catch (error) {
        console.error("Error verifying token:", error.message);
        return null;
    }
}

export function verifyIsAdmin(token) {
    const decoded = verifyToken(token);
    if (decoded?.role === "admin") {
        return true;
    }
    return false;
}

export function decodeToken(token) {
    if (!token) {
        throw new Error("Token is not provided");
    }
    return jwt.decode(token);
}

export function getUserByToken(token) {
    const decoded = verifyToken(token);
    if (decoded) {
        return { id: decoded.id, role: decoded.role };
    }
    return null;
}
