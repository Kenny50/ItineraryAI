const { Country, Itinerary } = require('../db/model/models');

function countryRoute(router) {
    // GET all countries
    router.get('/countries', async (req, res) => {
        try {
            const countries = await Country.findAll({ include: false });
            res.json(countries);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    });

    // GET itineraries by country ID
    router.get('/country/:id/itineraries', async (req, res) => {
        try {
            const countryId = req.params.id;
            const itineraries = await Itinerary.findAll({
                include: {
                    model: Country,
                    where: {
                        id: countryId,
                    },
                },
            });
            res.json(itineraries);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    });

    // GET top 10 most searched countries
    router.get('/countries/top-searched', async (req, res) => {
        try {
            const countries = await Country.findAll({
                order: [['searchTimes', 'DESC']],
                limit: 10,
            });
            res.json(countries);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    });

}

module.exports = countryRoute;