const SecuritiesFirms = require("../../db/model/SecuritiesFirms");
const multer  = require('multer');
const upload = multer();

function firmsRoute(router){
    router.post('/securities-firms', upload.none(), async (req, res, err) => {
        const firmsData = req.body;
        const newFirm = await SecuritiesFirms.create(firmsData);
        res.status(200).json({ newFirm });
    })
    
    router.get('/securities-firms', async (req, res, err) => {
        const firmId = req.body;
        const firm = await SecuritiesFirms.findOne(firmId);
        res.status(200).json({ firm });
    })
}

module.exports = firmsRoute;