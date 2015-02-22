var express = require('express');
var router = express.Router();
var users = [];
var gameDetails = {};

router.get("/game",function(req,res){
	res.render("game");
})

router.get("/waiting",function(req,res){
	res.render("waiting");
})

router.post("/registerUser",function(req,res){
	var username = req.body.name;
	var isCreator;
	if(users.length==0)
		isCreator = true;
	users.push(username);
	console.log(users);
	res.render("dashboard",{username:username,isCreator:isCreator});
})

router.get("/createGame",function(req,res){
	res.render("createGame");
})

router.post("/createGame",function(req,res){
	gameDetails.numberOfPlayers = req.body.numberOfPlayers;
	gameDetails.time = req.body.time;
	res.redirect("/waiting");
})


module.exports = router;
