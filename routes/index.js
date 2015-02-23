var express = require('express');
var router = express.Router();
var users = [];
var gameDetails = {};

var requireRegistration = function(req,res,next){
	req.session.username? next(): res.redirect('/');
}

router.get("/registration",function(req,res){
	req.session.username ? res.redirect('/dashboard') : res.render("registration");
})

router.get("/dashboard",requireRegistration,function(req,res){
	var isCreator;
	var username = req.session.username;
	users.length==0 && (isCreator = true);
	users.push(username);
	res.locals.username = username;
	res.render('dashboard',{isCreator:isCreator});
})

router.get("/game",requireRegistration,function(req,res){
	res.locals.username = req.session.username;
	res.render("game");
})

router.get("/waiting",requireRegistration,function(req,res){
	res.render("waiting");
})

router.post("/registerUser",function(req,res){
	var username = req.body.name;
	req.session.username = username;
	res.redirect("/dashboard");
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
