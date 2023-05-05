const Article = require("../../db/model/Article");
const router = require("../router");
const multer = require('multer');

function articleRoute() {
    router.get('/article/:id',  multer().none(), async(req, res) => {
        const articleId = req.params.id;
        const newArticle = await Article.findOne({
            where: {
                id: articleId
            }
        });
        res.json(newArticle);
    })

    router.post('/article/:id',  multer().none(), async(req, res) => {
        const articleId = req.params.id;
        const newArticleContent = req.body
        const article = await Article.findOne({
            where: {
                id: articleId
            }
        });
        article.title = newArticleContent.title
        article.content = newArticleContent.content
        article.save()
        res.json(article);
    })

    router.delete('/article/:id',  multer().none(), async(req, res) => {
        const articleId = req.params.id;
        const newArticle = await Article.delete({
            where: {
                id: articleId
            }
        });
        res.json(newArticle);
    })

    router.post('/article',  multer().none(), async(req, res) => {
        const article = req.body;
        const newArticle = await Article.create(article);
        res.json({id: newArticle.id })
    })

    // q = keyword
    // sort = des, asc
    // regax "text":\s*".*keyword.*"
    router.get('/articles', multer().none(), async (req, res) => {
        const query = req.query.q;
        const articles = await Article.findAll({
            where: {
                [Op.or]: [
                    {
                        content: {
                            [Op.regexp]: `text:\\s*".*${query}.*"`
                        }
                    },
                    {
                        title: {
                            [Op.substring]: query
                        }
                    }
                ]
            }
        });

        res.json({articles});
    })
}
module.exports = articleRoute;