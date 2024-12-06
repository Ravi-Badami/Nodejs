const http = require('http'); //core module
//const http = require('node:http'); //core module

/*
 * this method gives instance of the server.
 * This is creating the application
 * The incoming request is handled by the function.
 */
const server = http.createServer(function (req, res) {
  /*
   * who ever comes to our server respond them with  hello world
   * The below code means that the end of the response (reply to the request) and sending the data back
   */
  if (req.url === '/secret') {
    res.end('there is not secret');
  }
  res.end('Hello world');
  console.log('this is here');
});

/*
 * when you do this the sever is now ready to listen to incoming request 
 
*/
server.listen(7777);

/*
 * when you enter and run the application the terminal will get busy because it is waiting for the request to come in
 * from the client (browser).
 */
