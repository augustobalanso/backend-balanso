import { Router } from "express";
const router = Router()

router.get('/randoms', async (req, res) => {

    function randomNumberGenerator(min = 1, max = 1000) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    let trackingObject = {};

    for (let i = 0; i < (req.query.cant || 100000000); i++) {
        const randomNumber = randomNumberGenerator(); 
        
        if (trackingObject[randomNumber]) {
            trackingObject[randomNumber]++;
        } else {
            trackingObject[randomNumber] = 1;
        }
    }

    console.log(trackingObject)

    res.render('charts');
});

export default router