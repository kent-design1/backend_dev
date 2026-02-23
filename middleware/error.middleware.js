import {json} from "express";


const errorMiddleware = (err, req, res, next) => {
    try {
    let error = {...err}
        error.message = err.message
        console.error(err)
        // Resources not found
        if(err.name === "CastError") {
            const message = "Resource not found"
            error = new Error(message)
            error.statusCode = 404
        }

        // Duplicate key
        if(err.code === 11000) {
            const message = "Duplicate field entered"
            error = new Error(message)
            error.statusCode = 400
        }

    //     Validation error
        if(err.name === "ValidationError") {
            const message = Object.values(err.error).map(e => e.message)
            error = new Error(message.join(', '))
            error.statusCode = 400
        }
        res.status(error.statusCode || 500).json({success: false, error:error.message || 'Server Error'})
    }

    catch (error) {
        next(error);
    }
}

export default errorMiddleware;