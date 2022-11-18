const errorMiddleware = (error, _req, res, _next) => {
    console.log(error)
    res.status(400).json(
        {
            success: false,
            error: error.message
        }
    )
} 

module.exports = errorMiddleware