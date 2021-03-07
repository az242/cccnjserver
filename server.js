const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};



app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use([routes.english]);

mongoose.connect(`mongodb://localhost:27017/cccnj`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to database');
    });
const kittySchema = new mongoose.Schema({
    name: String
});
kittySchema.methods.speak = function () {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }
const Kitten = mongoose.model('Kitten', kittySchema);
const silence = new Kitten({
    name: 'Silence'
});
console.log(silence.name); // 'Silence'

// silence.save(function (err, fluffy) {
//     if (err) return console.error(err);
//     fluffy.speak();
//   });
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })
// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to bezkoder application."
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});