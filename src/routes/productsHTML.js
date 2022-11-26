const router = require('express').Router()

router.get('/', async (_req, res) => {
    res.render('index')
})

module.exports = router