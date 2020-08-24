//Linter says these two vars are not used, ill leave them but delete them if u dont need it
//const { execute } = require("./register");
//var ID = [i, null];
const Discord = require('discord.js')
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
var first = new Boolean(true);
var Stats = [];
var alreadyinraid = false;
var alreadyregistered = new Boolean(false);
var raidstarted = new Boolean(false);
module.exports = {
	name: 'raid',
	description: 'Raid',
	execute(message) {
		var mysql = require('mysql');
		//Establish connection with temporary data of all players in raid
			var con = mysql.createConnection({
				host: "localhost",
				user: "root",
				password:"password",
				database: "PlayersInRaid"
		});
		//Establish connection with PlayerStats record to be used later (see #1)
			var cont = mysql.createConnection({
				host: "localhost",
				user: "root",
				password:"password",
				database: "PlayerStats"
		});
	//#1 Connects to and assigns the player stats from the user who used !raid into an array named Stats
	cont.connect(function (err){
			if (err) throw err;
			cont.query("Select * FROM PStats", function(err, result){
				var ID = message.member.id;
				for(var i=0; i < result.length; i++){
					if(result[i].UserID == ID){
						Stats = [result[i].STR, result[i].DEX, result[i].PREC, result[i].PERC]
					}
				}
			})
		//ensures that the individual isn't from someone who has already registered for !raid, preventing their UserID and Stats from being duplicated
		con.query("Select * FROM Players", function (err, result) {
			if (err) throw err;
			var ID = message.member.id;
			for(var i = 0; i < result.length; i++) {
				if(result[i].UserID == ID) {
					alreadyinraid = true;
					//emits a message for myEmitter.on to activate
				}
			}
			CheckIfRegistered(message.member.id);
				//emits a message for myEmitter.on to activate
				setTimeout(function(){
			if(!alreadyinraid && alreadyregistered == true && raidstarted == false) {
					//Utilizes the Stats array to store the player's stats for in game use, see 'PlayersInRaid' Schema.
					con.query("INSERT INTO `Players` (UserID) VALUES (" + ID + ")");
					con.query("UPDATE `Players`"+ "set STR = " + Stats[0] + " Where USERID = " + ID);
					con.query("UPDATE `Players`"+ "set DEX = " + Stats[1] + " Where USERID = " + ID);
					con.query("UPDATE `Players`"+ "set PREC = " + Stats[2] + " Where USERID = " + ID);
					con.query("UPDATE `Players`"+ "set PERC = " + Stats[3] + " Where USERID = " + ID);
					if(!alreadyinraid && alreadyregistered == true && raidstarted == false)
						message.channel.send('You have entered the raid!');
			} else {
				if(raidstarted == false){
					message.channel.send('You are already queued or have not registered, make sure to user !register');
				}
				else{
					message.channel.send('Raid already started!')
				}
			}}, 1000);
			//function to check if user has registered beforehand 'if true they have used !register beforehand'
			function CheckIfRegistered(ID){
				console.log('registerd ID is ' + ID)
				if (err) throw err;
				cont.query("SELECT * FROM PStats", function(err, result){
					for(var i=0; i < result.length; i++){
						if(result[i].UserID == ID){
							alreadyregistered = true;
							i = 100;
						}
						else
						alreadyregistered = false;
					}
				}
			)}		
		});
	})
	setTimeout(function(){
		myEmitter.emit('alreadyinraid');
	}, 2000)
	var time = 10;
	//awaits for 'alreadyinraid' to be emitted from myEmitter
	myEmitter.on('alreadyinraid', () => {
		console.log('User who used !raid is, first to initialize a new raid: ', first, 'already in a raid: ', alreadyinraid, 'already registered: ', alreadyregistered)
			if(first == true && alreadyinraid == false && alreadyregistered == true && raidstarted == false){
				console.log('User has met all requirements, adding them to playersinraid database!')
				message.channel.send('Timer started, 1 minute before raid starts')
				first = false;
				alreadyinraid = false;
				var countdown = setInterval(function(){
					//time countdown, later add an if (time == 0) to start raid
					time = time - 10;
					message.channel.send('Time left: ' + time + 's')
					if (time == 0){
						//raid officially starts, initializing variables
						raidstarted = true;
						clearInterval(countdown)
						var players  = [];

						con.query("Select * from Players", function (err, result){
							if (err) throw err;
							for(var i=0; i < result.length; i++){
								players.push(result[i].UserID)
								console.log(players)
								for(var x = 0; x < players.length;){
									rollencounter(players.UserID)
								}
							}
						})
					}
				}, 10000)
			}
	});
	//rolls encounters, currently only has embedded message for it, will add more to it later -alex
	var rollencounter = function(){
		const roll = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Roll for Encounter')
		.setThumbnail('https://cdnb.artstation.com/p/assets/images/images/018/042/671/large/hayo-sena-00.jpg?1558240182')
		message.channel.send(roll)
	}
	},
};
