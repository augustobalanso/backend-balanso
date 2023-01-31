process.on('message', (msg) => {
    let trackingObject = {};

    function randomNumberGenerator(min = 1, max = 1000) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    for (let i = 0; i < (msg.message); i++) {
        const randomNumber = randomNumberGenerator(); 
        
        if (trackingObject[randomNumber]) {
            trackingObject[randomNumber]++;
        } else {
            trackingObject[randomNumber] = 1;
        }
    }
    process.send({message: trackingObject})
})




