class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // Handle MongoDB duplicate key error
    if (err.code === 10000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // Handle invalid JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `JSON Web Token is invalid. Try again.`;
        err = new ErrorHandler(message, 400);
    }

    // Handle expired JWT error
    if (err.name === "TokenExpiredError") {
        const message = `JSON Web Token has expired. Please log in again.`;
        err = new ErrorHandler(message, 400);
    }

    // Handle invalid MongoDB ObjectId
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Handle other validation errors
    const errorMessage = err.errors
        ? Object.values(err.errors)
            .map(error => error.message)
            .join(" ")
        : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
};

export default ErrorHandler;
