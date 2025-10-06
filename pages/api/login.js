const login = async (req, res) => {
    if (req.method === 'POST') {    
        try {
            const auth = req.headers.authorization;
            const token = auth.split(' ')[1];
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