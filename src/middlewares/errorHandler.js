const errorMiddleware = (error,_req,res) => {
    console.log(error)
    res.status(400).json(
        {
            response: 'error',
            error: error.message
        }
    )
} 

module.exports = errorMiddleware