const Country = require("./Country")
const City = require("./City")
const Itinerary = require("./Itinerary")
const Tag = require("./Tag")
const User = require("./User")
const ItineraryTag = require('./intermediate/ItineraryTag')
const Mail = require('./Mail')

Tag.belongsToMany(Itinerary, { through: ItineraryTag });
Itinerary.belongsToMany(Tag, { through: ItineraryTag });

Itinerary.belongsTo(Country);
Itinerary.hasMany(City);
Itinerary.belongsTo(User);

Country.hasMany(City);

City.belongsTo(Country);
City.belongsTo(Itinerary);

module.exports = {
    Country,
    City,
    Itinerary,
    Tag,
    User,
    Mail
}
