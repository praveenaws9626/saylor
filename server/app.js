const express = require('express');
const cors = require('cors');
require('dotenv-safe').config();
const connectDB = require('./config/db');
const passport = require("./passport/setup");

const routers = require("./routes/api")

const app = express();

// Connect Database
connectDB();

// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enabled CORS
app.use(cors());

app.get('/', (req, res) => res.send('Hello world!'));

// Passport middleware
//app.use(passport.initialize());
//app.use(passport.session());

let routes = require("./routes/api");
//map the routs

// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./react_client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./react_client/build", "index.html"));
});

app.use('/api', routes);

const port = process.env.PORT || 8081;

module.exports = app.listen(port, () => console.log(`Server running on port ${port}`));