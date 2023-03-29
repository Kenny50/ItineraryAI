const multer = require('multer');
const generateItinerary = require('../usecase/generateItinerary');

function aiRoute(router){

    router.post('/generate-itinerary',multer().array(),(req, res) => {
        try{
            console.log(req.body);
            // const { country, days, tags} = req.body;
            generateItinerary(req, res)
        } catch( error ){
            res.status(500).json({ error: error})
        }

    })
}

module.exports = aiRoute;