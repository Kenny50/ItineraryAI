const Industry = require("../../db/model/Industry");
const multer  = require('multer');
const upload = multer();

function industryRoute(router){
    router.post('/industry', upload.none(), async (req, res, err) => {
        const industryData = req.body;
        const newIndustry = await Industry.create(industryData);
        res.status(200).json({ newIndustry });
    })
    
    router.get('/industry', async (req, res, err) => {
        const industryId = req.body;
        const industry = await Industry.findOne(industryId);
        res.status(200).json({ industry });
    })
}

module.exports = industryRoute;