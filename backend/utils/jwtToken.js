

export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();  // This will use the JWT secret from env
   // Send the token as a cookie
    res.status(statusCode)
        .cookie("token", token, {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true,  // Security measure: prevents access to the cookie via client-side JS
        })
        .json({
            success: true,
            message,
            token,
            user,
        });
};
