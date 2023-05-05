const upload = require('../../middleware/multer');
const { Op } = require('sequelize');
const { Industry, SecuritiesFirms, Rate, StockAnalysisReport } = require('../../db/model/models');
const fs = require('fs');
const constant = require('../../constant/constant');
const multer = require('multer');

function pdfRoute(router) {
    // sort des, asc
    // q, keyword, industry, securitiesFirms, rate
    router.get('/pdf', async (req, res) => {
        const queryParams = {
            file: req.query.q ? { [Op.substring]: req.query.q } : undefined,
            date: req.query.date
        };

        const where = Object.fromEntries(
            Object.entries(queryParams).filter(([_, value]) => value !== undefined)
        );

        const reports = await StockAnalysisReport.findAll({
            where: where,
            include: [
                {
                    model: Rate,
                    where: req.query.rate ? { code: req.query.rate } : null
                },
                {
                    model: SecuritiesFirms,
                    where: req.query.securitiesFirms ? { code: req.query.securitiesFirms } : null
                },
                {
                    model: Industry,
                    where: req.query.industry ? { code: req.query.industry } : null
                }
            ]
        })

        res.json({ reports })
    })

    router.get('/pdf/today', (req, res) => {

    })

    //get file
    //parse file name
    //match from table
    //save to s3
    //get endpoint
    //save endpoint with ${PdfFormat} as a table
    router.post('/pdf', upload.single('pdfFile'), (req, res, err) => {
        const fileName = req.file.originalname; // get the file name
        res.send(fileName);
    })

    router.post('/pdf-bulk-upload', upload.array('pdfFile'), (req, res) => {
        const files = req.files;
        if (!files || files.length === 0) {
            res.status(400).send('No files uploaded.');
        } else {
            res.send(`${files.length} files uploaded.`);
        }

    })

    //find file by name
    //get new name
    //check does new name existed
    router.post('/pdf/rename', multer().none(), async (req, res) => {
        const oldName = req.body.oldName;
        const newName = req.body.newName;
        const report = await StockAnalysisReport.findOne({
            where: {
                file: oldName
            }
        })
        if (report) {
            fs.rename(constant.realFileAddress + oldName, constant.realFileAddress + newName, () => {
                
            });
            report.file = newName;
            await report.save();
            res.json({ status: 'rename file success' });
        } else {
            res.status(404).json({ err: 'file not found' });
        }
    })
}

module.exports = pdfRoute;