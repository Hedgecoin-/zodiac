const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);



// Database connection
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database')
});
// End of database connection




app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});


app.listen(PORT, () => {
  console.log('ZODIAC: Online')
  console.log(`Listening on port ${PORT}`)
});