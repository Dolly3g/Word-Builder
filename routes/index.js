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
	var isCreator = wb_lib.isCreator(gameDetails);
	var username = req.session.username;
	users.length == gameDetails.numberOfPlayers && (isGameRunning = true);
	if(!wb_lib.isUserExist(users,username)){
		users.push(username);
		res.locals.username = username;
		res.render('dashboard',{isGameRunning:isGameRunning,isCreator:isCreator});
	}
	else
		res.redirect('waiting');
})

router.get("/game",requireRegistration,function(req,res){
	if(users.length == gameDetails.numberOfPlayers){
		res.locals.username = req.session.username;
		res.render("game",{currentUser:users[0],users:JSON.stringify(users)});
	}
	else{
		res.redirect("/waiting");
	}
})

router.get("/waiting",requireRegistration,function(req,res){
	if(!gameDetails.numberOfPlayers){
		res.redirect("dashboard");
		return;
	}
	var numberOfPlayers = gameDetails.numberOfPlayers;
	var playersJoined = users.length;
	var remainingPlayers = numberOfPlayers - playersJoined;
	(remainingPlayers==0) ? res.redirect("/game") : res.render("waiting",{remainingPlayers:remainingPlayers});
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
	if(!wb_lib.isCreator(gameDetails)){
		res.redirect("/waiting");
	}
	else{
		res.render("createGame");
	}
})

router.post("/createGame",requireRegistration,function(req,res){
	gameDetails.numberOfPlayers = req.body.numberOfPlayers;
	gameDetails.time = req.body.time;
	res.redirect("/waiting");
})

module.exports = router;


//readyTOplay(){
//	username
	//waiting

	//..all users
	//game
//}