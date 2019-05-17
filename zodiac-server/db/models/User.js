const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  fame: Number,
  moderator: Boolean,
});

// NOTE: Must add methods to the schema BEFORE compiling it with mongoose.model()

/*
  Example of creating and saving a new user(s)

  var user = new User({
    name: "Player One",
    score: 0,
  })
  user.save(function(err){
    if(err) return console.error(err);
    // saved!
  })

  or

  User.create({
    name: "Player One",
    score: 0,
  }, function(err, user) {
    if(err) return console.error(err);
    // saved!
  })

  or

  User.insertMany([
    {
      name: "Player One",
      score: 0,
    },
    {
      name: "Player Two",
      score: 0,
    }
  ], function(err) {
    if(err) return console.error(err);
    // saved many!
  })

*/

const User = mongoose.model('User', userSchema);

const RESEED = true;

// Seed database
User.find().select('name').exec(function (err, users) {
  if (err) return console.error(err);

  if (users.length > 0) {
    if (RESEED) {
      console.log('Removing users in database');
      User.deleteMany({}, function (err) {
        if (err) return console.error(err);
      })
    } else {
      console.log('Database already seeded with users');
      return;
    }
  }

  console.log('Seeding users in database');
  User.insertMany([
    {
      name: "Yan",
      fame: 0,
      moderator: true,
    },
    {
      name: "Dave",
      fame: 0,
      moderator: true,
    },
    {
      name: "Chris",
      fame: 0,
      moderator: false,
    },
    {
      name: "Jordan",
      fame: 0,
      moderator: false,
    },
    {
      name: "Nick",
      fame: 0,
      moderator: false,
    }
  ], function (err) {
    if (err) return console.error(err);

    console.log('Finished seeding database')
  })
})

module.exports = User;

