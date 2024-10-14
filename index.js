const express = require('express');
const app = express();
const PORT = 3000;
const {connect}= require('./connect')
const URL = require('./models/url')
app.use(express.json())


connect()

app.use('/url', require('./routes/url'))
app.use('/:shortId', async (req,res)=>{
    const shortId = req.params.shortId;
    const red_url = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    )
    res.redirect(red_url)
})

app.listen(PORT, ()=> console.log('server started'))