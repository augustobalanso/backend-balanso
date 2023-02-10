import { Router } from "express";
import { fork } from "child_process"
import parseArgs from "minimist"
const router = Router()

router.get('/randoms', async (req, res) => {
    const { cant } = req.query

    const launchParams = parseArgs(process.argv.slice(2))
    console.log(launchParams)

    const loopCycles = cant || 100000000

    const forked  = fork("./src/services/api/randoms.api.js")

    forked.on('message', (msg) => {
        res.render('charts', {dataObject : msg.message})
    })

    forked.send({message : loopCycles})
});

export default router