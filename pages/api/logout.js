import { magicAdmin } from '../../lib/magic';
import { removeTokenCookie } from '../../lib/cookies';
import { getUserIdFromToken } from '../../lib/utils';

const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'User is not logged in' });
        }

        const userId = getUserIdFromToken(token);
        removeTokenCookie(res);

        try {
            await magicAdmin.users.logoutByIssuer(userId);
        } catch (error) {
            console.error("Error occurred while logging out magic user", error);
        }

        return res.status(200).json({ done: true });
    } catch (error) {
        console.error('Error logging out user: ', error);
        return res.status(401).json({ message: 'User is not logged in' });
    }
};

export default logout;