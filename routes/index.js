var express = require('express');
var router = express.Router();
var wb_lib = require("../own_modules/wb_lib.js");
var users = [];
var gameDetails = {};

var requireRegistration = function(req,res,next){
	req.session.username? next(): res.redirect('/');
}

router.get("/registration",function(req,res){
	req.session.username ? res.redirect('/dashboard') : res.render("registration");
})

router.get("/dashboard",requireRegistration,function(req,res){
	var isGameRunning;
	var isCreator = wb_lib.isCreator(users);
	var username = req.session.username;
	users.length == gameDetails.numberOfPlayers && (isGameRunning = true);
	users.push(username);
	res.locals.username = username;
	res.render('dashboard',{isGameRunning:isGameRunning,isCreator:isCreator});
})

router.get("/game",requireRegistration,function(req,res){
	res.locals.username = req.session.username;
	res.render("game",{currentUser:users[0]});
})

router.get("/waiting",requireRegistration,function(req,res){
	res.render("waiting",{numberOfPlayers:gameDetails.numberOfPlayers , playersJoined:users.length});
})

router.post("/registerUser",function(req,res){
	var username = req.body.name;

	if(wb_lib.isUserExist(users,username))
		res.redirect("/registration");
	else{
		req.session.username = username;
		res.redirect("/dashboard");
	}
})

router.get("/createGame",requireRegistration,function(req,res){
	res.render("createGame");
})

router.post("/createGame",requireRegistration,function(req,res){
	gameDetails.numberOfPlayers = req.body.numberOfPlayers;
	gameDetails.time = req.body.time;
	res.redirect("/waiting");
})

module.exports = router;
