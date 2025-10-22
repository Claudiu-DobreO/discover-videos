import { magicAdmin } from '../../lib/magic';
import { isNewUser, createNewUser } from '../../lib/db/hasura';
import { setTokenCookie } from '../../lib/cookies';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    if (req.method === 'POST') {    
        try {
            const auth = req.headers.authorization;
            const didToken = auth.substring(7);

            const metadata = await magicAdmin.users.getMetadataByToken(didToken);

            // create jwt token
            const token = jwt.sign({
                ...metadata,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
                "https://hasura.io/jwt/claims": {
                    "x-hasura-default-role": "user",
                    "x-hasura-allowed-roles": ["user", "admin"],
                    "x-hasura-user-id": `${metadata.issuer}`,
                  }
            }, process.env.JWT_SECRET);

            // Check if the user is already in the database
            const isNew = await isNewUser(metadata.issuer, token);

            // If new user, create them in the database
            if (isNew) {
                await createNewUser(token, metadata);
            }

            setTokenCookie(token, res);

            res.send({ done: true })
        } catch (error) {
            console.error('Something went wrong with the login: ', error);
            res.status(500).send({ done: false });
        }
    } else {
        res.status(405).send({ done: false });
    }
};

export default login;