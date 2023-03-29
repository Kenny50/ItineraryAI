const { Tag, Itinerary } = require('../db/model/models');

function tagRoute(router) {

    // GET all tags
    router.get('/tags', async (req, res) => {
        try {
            const tags = await Tag.findAll({
                include: false
            });
            res.json(tags);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    });

    // GET itineraries by tag ID
    router.get('/tag/:id/itineraries', async (req, res) => {
        try {
            const tagId = req.params.id;
            const itineraries = await Itinerary.findAll({
                include: {
                    model: Tag,
                    where: {
                        id: tagId,
                    },
                },
            });
            res.json(itineraries);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    });

    // POST new tag
    router.post('/', async (req, res) => {
        try {
            const tagData = req.body;
            const tag = await Tag.create(tagData);
            res.json(tag);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    });
}

module.exports = tagRoute;