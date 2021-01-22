#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async');
var Category = require('./models/category');
var VideoGame = require('./models/videoGame');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var categories = [];
var videoGames = [];

function categoryCreate(name, description, cb) {
  const categoryDetail = { name, description };
  
  var newCategory = new Category(categoryDetail);
       
  newCategory.save(function (err) {
    if (err) {
      cb(err, null)
      return;
    }

    console.log('New video game category: ' + newCategory);
    categories.push(newCategory);
    cb(null, newCategory);
  });
}

function videoGameCreate(title, category, description, company, price, cb) {
  const videoGameDetail = { title, category, description, company, price };
  const newVideoGame = new VideoGame(videoGameDetail);
       
  newVideoGame.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log('New video game: ' + newVideoGame);
    videoGames.push(newVideoGame);
    cb(null, newVideoGame);
  });
}

function createVideoGameCategories(cb) {
    async.series([
        function(callback) {
          categoryCreate(
            'Life simulation',
            'Control virtual characters in an awesome, cool world!',
            callback
          );
        },
        function(callback) {
          categoryCreate(
            'Social deduction',
            'Uncover the hidden villain using logic and reasoning!',
            callback
          );
        },
        function(callback) {
          categoryCreate(
            'Battle royale',
            'Try to be the last man standing!',
            callback
          );
        }
        ],
        // optional callback
        cb);
}


function createVideoGames(cb) {
    async.parallel([
        function(callback) {
          videoGameCreate('Animal Crossing: New Horizons', [categories[0]], 'Escape to a deserted island and create your own paradise as you explore, create, and customize in the Animal Crossing: New Horizons game. Your island getaway has a wealth of natural resources that can be used to craft everything from tools to creature comforts. You can hunt down insects at the crack of dawn, decorate your paradise throughout the day, or enjoy sunset on the beach while fishing in the ocean. The time of day and season match real life, so each day on your island is a chance to check in and find new surprises all year round.', 'Nintendo', 79.99, callback);
        },
        function(callback) {
          videoGameCreate('Among Us', [categories[1]], 'An online and local party game of teamwork and betrayal for 4-10 players... in space!', 'Innersloth', 0, callback);
        },
        function(callback) {
          videoGameCreate("PlayerUnknown's Battlegrounds", [categories[2]], "PlayerUnknown's Battlegrounds is a battle royale shooter that pits 100 players against each other in a struggle for survival. Gather supplies and outwit your opponents to become the last person standing.", 'KRAFTON, Inc.', 12.99, callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createVideoGameCategories,
    createVideoGames
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Video games: '+videoGames);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



