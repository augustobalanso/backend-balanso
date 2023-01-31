import { Router } from "express";
import { fork } from "child_process"
const router = Router()

router.get('/randoms', async (req, res) => {
    
    const { cant } = req.query

    const loopCycles = cant || 100000000

    const forked  = fork("./src/services/api/randoms.api.js")

    forked.on('message', (msg) => {
        res.render('charts', {dataObject : msg.message})
    })

    forked.send({message : loopCycles})
});

export default router