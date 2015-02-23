var express = require('express');
var router = express.Router();
var wb_lib = require("../own_modules/wb_lib.js");
var users = [];
var gameDetails = {};


router.get("/game",function(req,res){
	res.render("game",{isEnabled:true});
})

router.get("/waiting",function(req,res){
	res.render("waiting");
})

router.post("/registerUser",function(req,res){
	var username = req.body.name;
	res.render("dashboard",{username:username,isCreator:wb_lib.isUserExist(users,username)});
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
