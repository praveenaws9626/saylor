const express = require('express');
const router = express.Router();
const passport = require("passport");
var jwt    = require('jsonwebtoken');
const superSecret = process.env.SECRET_KEY;

require('../passport/setup');

const loginController = require("../controllers/login.controller")

// Load User model
const User = require('../models/User');
// Load Game model
const Game = require('../models/Game');


router.post("/register", (req, res, next) => {
  let {email, password, name} = req.body;
  if(!email || !password || !name) {
    return res.status(400).json({ errors: "Missing Mandatory fields" });
  }
  loginController.registerUser(req, res, next)
});

// @route POST api/scores
// @description login
// @access Public
router.post("/login", (req, res, next) => {
  let {email, password} = req.body;
  if(!email || !password) {
    return res.status(400).json({ errors: "Missing Mandatory fields" });
  }
  loginController.loginUser(req, res, next);
});



router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  // decode token
  if (token) {
	  token = token.replace('JWT ', '');
    // verifies secret and checks exp
    jwt.verify(token, superSecret, function(err, decoded) {      
      if (err) {
        res.status(401).json({ noscoressfound: 'Invalid Token' })
      } else {
        User.findOne({ email: decoded.email })
          .then(user => {
              // Create new User
              if (!user) {
                  return done(null, false, { message: "Not a Valid User" });
              } else {
                req.decoded = decoded;
                next();
              }
          });
      }
    });
  } else {
		res.status(401).json({ noscoressfound: 'No Token Provided' })
	}
});

// @route GET api/game-result
// @description Get player games
// @not access Public
router.get('/game-result', (req, res) => {
  const user = req.decoded;
  console.log("****************************");
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  console.log(user);
  Game.find({ player_id: user._id }).sort( { action_date: -1 } )
  .then(games => res.json(games))
    .catch(err => res.status(404).json({ noscoresfound: 'No Games found' }));
});

// @route GET api/scores/:id
// @description Update score
// @access Public
router.post('/game-result' ,(req, res) => {
  const {winner, description} = req.body;
  const user = req.decoded;
  if( winner && winner != "") {
    let payload = {
      winner,
      player_id: user._id,
      description
    }
    if(winner == "Player") {
      payload.description = `${user.name} won the game`;
    } else {
      payload.description = `${description ? description + '!!': ''} Dragon won the game`;
    }
    Game.create(payload)
    .then(game => res.json({ msg: 'Saved Game Result Successfully' }))
    .catch(err => {
      console.log("yeyys");
      res.status(400).json({ error: 'Unable to Save Game Result to the Database' })
    }
    );
  } else {
    res.status(400).json({ error: 'Bad Request' })
  }
  
});

module.exports = router;