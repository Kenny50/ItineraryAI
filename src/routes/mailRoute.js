const { Mail } = require('../db/model/models');
const multer = require('multer');


function mailRoute(router) {

    // POST create new itinerary
    router.post('/add-mail', multer().array(), async (req, res) => {
        try{
            const { mail } = req.body;
            const register = await Mail.create({
                mail: mail
            });
            
            res.json(register);
        } catch(error){
            res.status(500).json({error: error});
        }
    });
}

module.exports = mailRoute;