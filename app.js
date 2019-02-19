// Require packages and set the port
const express = require('express');
const port = 3000;
//const process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes');

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

routes(app);

// Start the server
//const server = app.listen(port, (error) => {
const server = app.listen(process.env.PORT || port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});