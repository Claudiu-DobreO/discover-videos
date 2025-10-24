import jwt from 'jsonwebtoken';

export const getUserIdFromToken = (token) => {
    if (!token) return null;
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken?.issuer || null;
};