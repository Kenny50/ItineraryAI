const Company = require("../../db/model/Company");
const multer = require('multer');
const upload = multer();

function companyRoute(router) {
    router.post('/company', upload.none(), async (req, res, err) => {
        const companyData = req.body;
        const newCompany = await Company.create(companyData);
        res.status(200).json({ newCompany });
    })

    router.get('/company', upload.none(), async (req, res, err) => {
        const companyId = req.body.id;
        if(!companyId){
            throw new Error('invalid id')
        }
        const company = await Company.findOne({
            where: {
                id: companyId
            }
        });
        res.status(200).json({ company });
    })
}

module.exports = companyRoute;