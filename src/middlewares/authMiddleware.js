const authMiddleware = (req, res, next) => {
    if(req.user && req.isAuthenticated()){
        return next()
    }
    res.redirect('login')
}

export default authMiddleware