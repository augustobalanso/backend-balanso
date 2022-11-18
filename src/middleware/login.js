function login(req, res, next) {
    const admin = true
    try {
        (admin) ? next() : res.status(401).json({ error: 'access denied' })
    } catch (error) {
        res.status(500).json({ error: 'server error' })
    }
}

module.exports = login