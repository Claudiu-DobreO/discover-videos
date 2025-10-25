import { getUserIdFromToken } from "@/lib/utils";

const useRedirectUser = (context) => {
    const token = context.req ? context.req.cookies.token : null;
    const userId = getUserIdFromToken(token);

    return {
        userId,
        token,
    };
};

export default useRedirectUser;