import jwt from 'jsonwebtoken';

export const getUserIdFromToken = (token) => {
    if (!token) return null;
    
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken?.issuer || null;
    } catch {
        // Token is invalid, expired, or malformed
        return null;
    }
};