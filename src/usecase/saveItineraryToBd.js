const { City, Country, Itinerary, Tag, User } = require('../db/model/models');
const ItineraryTag = require('../db/model/intermediate/ItineraryTag');

async function saveItineraryToDb(content, user, tags, country) {
    const anonymous = await User.findOrCreate({
        where: { id: user ? user : 1 },
        defaults: {
            email: 'anonymous@gmail.com',
            name: 'anonymous',
            password: 'anonymous'
        }
    });

    let recordCountry = await Country.findOne({
        where: { name: country }
    })
    if(recordCountry){
        console.log("update exist")
        recordCountry.update({ searchTimes: recordCountry.searchTimes + 1 });
    } else {
        console.log("create new country");
        recordCountry = await Country.create({
            name: country,
            searchTimes: 1
        })
    }

    const itinerary = await Itinerary.create({
        content: content,
        UserId: anonymous[0].id,
        CountryId: recordCountry.id
    });
    console.log(itinerary);

    const tagsColumn =
        await Tag.findAll({ where: { name: tags } })
            .then(async (existingTags) => {
                const tagsArray = [...(Array.isArray(tags) ? tags : [tags])];

                const existingTagNames = existingTags.map(tag => tag.name);
                const newTagNames = tagsArray.filter(tag => !existingTagNames.includes(tag));

                // Create new tags that don't exist
                const newTags = await Promise.all(newTagNames.map(tagName => Tag.create({ name: tagName })));

                // Combine existing and new tags
                return [...existingTags, ...newTags];
            })

    console.log(tagsColumn);

    tagsColumn.map(async (tag) => {
        await ItineraryTag.create({
            ItineraryId: itinerary.id,
            TagId: tag.id
        })
    })
    return itinerary
}

module.exports = saveItineraryToDb;