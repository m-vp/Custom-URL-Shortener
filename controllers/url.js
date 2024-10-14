const shortid = require('shortid'); // Corrected import
const URL = require('../models/url');

async function generateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "URL is required" });

    const shortId = shortid(); // Now this should work
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [], // Fixed typo: visitHisory to visitHistory
    });

    return res.json({ id: shortId });
}

module.exports = {
    generateNewShortUrl,
};
