const express = require('express');
const connectmongoDB = require('./connection');
const urlRoutes = require('./routes/urlroute');
const urlcontroller = require('./controller/urlcontroller');
const Url = require('./model/urlSchema');
const app = express();
const emitter = require('events');
const { timeStamp } = require('console');
emitter.setMaxListeners(0); // Pass 0 to set no limit
const PORT = process.env.PORT || 6775;

app.use(express.json());

connectmongoDB("mongodb://localhost:27017/url--shortner-app")
  .then(() => { console.log('connected to server'); })
  .catch((err) => { console.error('Error connecting to MongoDB:', err); });

app.use('/url', urlRoutes);

app.get('/:short_id', async (req, res) => {
  const short_id = req.params.short_id;
  console.log(short_id)
  try {
    const entry = await Url.findOneAndUpdate(
      {  shortId:short_id },
      { $push: { visitHistory: {timestamps :Date.now()} } }
   // Option to return the updated document
    );
    
    console.log(entry)
    if (entry) {
      res.redirect(entry.requiredurl);
    } else {
      res.status(404).send('Short Url not found');
    }
  } catch (error) {
    console.error('Error finding and updating URL:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
