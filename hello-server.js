// Build a server with Node's HTTP module
const http = require('http');
const port = 3001;
const server = http.createServer();

//create a server object:
// http.createServer(function (req, res) {
//     res.write('Hello World!'); //write a response to the client
//     res.end(); //end the response
//   }).listen(8080); //the server object listens on port 8080

// server**on('request'** (request, response) => {
//     console.log(`URL: ${request.url}`);
//     response.end('Hello, server!')
// })

//server(function (req, res) {
http.createServer(function (req, res) {
        res.write('Hello World!'); //write a response to the client
        res.end('Hello, server!'); //end the response
});

  // Start the server
server.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server is listening on port ${port}`)
})