const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/User');
const keys = require('./config/keys');
const cors = require('cors');

const db = keys.mongoURI;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

mongoose.connect(db, {useNewUrlParser: true}).then(()=> console.log("Db Connect")).catch(err => console.log(err));
 

const userRoutes = require('./routes/user')
app.use('/user', userRoutes);

const genRoutes = require('./routes/gernerate')
app.use('/gen', genRoutes);


app.get('/', (req, res) => res.json({
    msg: "Hello!! taha"
}));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));