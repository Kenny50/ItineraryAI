const { Model } = require('sequelize');
const { City, Country, Itinerary, Tag, User } = require('../db/model/models');
const ItineraryTag = require('../db/model/intermediate/ItineraryTag');
const multer = require('multer');
const saveItineraryToDb = require('../usecase/saveItineraryToBd');

function itineraryRoute(router) {

    // GET all itineraries
    router.get('/itineraries', async (req, res) => {
        try {
            const itineraries = await Itinerary.findAll();
            res.json(itineraries);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    });

    // POST create new itinerary
    router.post('/itinerary', multer().array(), async (req, res) => {
        try {
            const { country, content, user, tags } = req.body;
            const itinerary = await saveItineraryToDb(content, user, tags, country);

            res.json(itinerary);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    });

    // GET itineraries by user ID
    router.get('/itineraries/user/:id', async (req, res) => {
        try {
            const userId = req.params.id;
            const itineraries = await Itinerary.findAll({
                where: {
                    UserId: userId,
                },
            });
            res.json(itineraries);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    });

    // GET itinerary by ID
    router.get('/itineraries/:id', async (req, res) => {
        try {
            const itineraryId = req.params.id;
            const itinerary = await Itinerary.findByPk(itineraryId, {
                include: User,
            });
            res.json(itinerary);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    });

    module.exports = router;

}

module.exports = itineraryRoute;
