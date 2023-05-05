const Rate = require("../../db/model/Rate");
const multer  = require('multer');
const upload = multer();

function rateRoute(router){
    router.post('/rate', upload.none(), async (req, res, err) => {
        const rateData = req.body;
        const newRate = await Rate.create(rateData);
        res.status(200).json({ newRate });
    })
    
    router.get('/rate', async (req, res, err) => {
        const rateId = req.body;
        const rate = await Rate.findOne({
            where:{
                id: rateId
            }
        });
        res.status(200).json({ rate });
    })
}

module.exports = rateRoute;