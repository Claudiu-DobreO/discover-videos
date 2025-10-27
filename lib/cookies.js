import cookie from 'cookie';

const MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export const setTokenCookie = (token, res) => {
    const setCookie = cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000), // seconds to milliseconds
        path: '/',
    });

    res.setHeader('Set-Cookie', setCookie);
};

export const removeTokenCookie = (res) => {
    const deleteCookie = cookie.serialize('token', '', {
        maxAge: -1,
        path: '/',
    });

    res.setHeader('Set-Cookie', deleteCookie);
};