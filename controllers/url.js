const {nanoid} = require('shortid');
const URL = require('../models/url')


async function generateNewShortUrl(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"url is required"})
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHisory: [],
    })

    return res.json({id: shortId})
}
// use module shortid


module.exports = {
    generateNewShortUrl,
}
