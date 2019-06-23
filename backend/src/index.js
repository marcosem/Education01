// Instance of the express module
const express = require('express'); // allow manage routs, parameters, etc
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// create a server
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

// cluster0-shard-00-01-mckr1.mongodb.net:27017
// mongodb+srv://app:YoYoApp@cluster0-mckr1.mongodb.net/test?retryWrites=true&w=majority
// mongodb://app:YoYoApp@cluster0-shard-00-00-mckr1.mongodb.net:27017,cluster0-shard-00-01-mckr1.mongodb.net:27017,cluster0-shard-00-02-mckr1.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
mongoose.connect(
  'mongodb://app:YoYoApp@cluster0-shard-00-00-mckr1.mongodb.net:27017,cluster0-shard-00-01-mckr1.mongodb.net:27017,cluster0-shard-00-02-mckr1.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
  { useNewUrlParser: true },
  function(err, client) {
    if (err) {
      console.log(err);
    }
  }
);

// Creating a new middleware, adding "io" as member of req
app.use((req, res, next) => {
  req.io = io;

  next(); // next ensure that the application will not stop after this middleware function
}); // after this function, all reqs will contain io as class member

// Allow any application (back or frontend) to access thi application
app.use(cors());

// Define a static route to a folder
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))
);

// Define the routes
app.use(require('./routes.js'));

server.listen(3333); // make the application listen the port 3333
//app.listen(3333); // make the application listen the port 3333
