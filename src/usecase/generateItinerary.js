const { Configuration, OpenAIApi } = require("openai");
const saveItineraryToDb = require('../usecase/saveItineraryToBd');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateItinerary(req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }

    const { country, days, user, tags, destination } = req.body;
    let tagsArray = tags.split(',').map((text) => { return text.trim()});
    tagsArray = Array.isArray(tagsArray) ? tagsArray : [tags];
    
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",//gpt-3.5-turbo
            messages: generatePrompt(country, days, tagsArray, destination),
            temperature: 0.6
        });

        //save to db
        const itinerary = await saveItineraryToDb(completion.data.choices[0].message.content, user, tagsArray, country);

        //res 
        res.status(200).json({ 
            result: itinerary
        });
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}

function generatePrompt(country, days, tags, destination) {
    let  basicPrompt = `${days} days in ${destination} ${country} itinerary`;
    if(tags){
        basicPrompt += `related to ${tags.join()}`;
    }
    
    return [
        { role: "system", content: `You are a experienced travel planner.` },
        {
          role: "user",
          content: `Where do you recommended for ${basicPrompt}`,
        },
      ];
}

module.exports = generateItinerary;