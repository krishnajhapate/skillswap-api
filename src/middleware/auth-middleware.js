import APIResponse from "../helpers/APIResponse";
import tokenService from "../services/token-service";

// eslint-disable-next-line consistent-return
async function authenticate(req, res, next) {
    try {
        const { learnbloomAccessCookie } = req.cookies;

        if (!learnbloomAccessCookie) {
            return APIResponse.validationErrorWithData(
                res,
                "invalid token",
                "sign in to view"
            );
        }

        const userData = await tokenService.verifyAccessToken(
            learnbloomAccessCookie
        );

        if (!userData) {
            throw new Error();
        }

        req.user = userData;
        next();
    } catch (err) {
        console.log(err);
        return APIResponse.unauthorizedResponse(res, "invalid token");
    }
}

export default authenticate;
