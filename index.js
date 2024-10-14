const express = require('express');
const app = express();
const PORT = 3000;
const {connect}= require('./connect')
const URL = require('./models/url')
app.use(express.json())


connect()


app.get('/', (req,res)=> res.end('hello'))
app.use('/url', require('./routes/url'))
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const red_url = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true } 
        );

        // Check if the URL exists
        if (!red_url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.redirect(red_url.redirectURL); 
    } catch (error) {
        console.error('Error while redirecting:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, ()=> console.log('server started'))