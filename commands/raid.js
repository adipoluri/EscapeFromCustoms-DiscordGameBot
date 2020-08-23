//Linter says these two vars are not used, ill leave them but delete them if u dont need it
//const { execute } = require("./register");
//var ID = [i, null];
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
var first = new Boolean(false);
var Stats = [];
var found = false;
var alreadyregistered = new Boolean(false);
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
					found = true;
					//emits a message for myEmitter.on to activate
					myEmitter.emit('found');
				}
			}
			CheckIfRegistered(message.member.ID);
			setTimeout(function() {
				//emits a message for myEmitter.on to activate
				myEmitter.emit('found');
			if(!found && alreadyregistered == false) {
				setTimeout(function(){
					//Utilizes the Stats array to store the player's stats for in game use, see 'PlayersInRaid' Schema.
				con.query("INSERT INTO `Players` (UserID) VALUES (" + ID + ")");
				con.query("UPDATE `Players`"+ "set STR = " + Stats[0] + " Where USERID = " + ID);
				con.query("UPDATE `Players`"+ "set DEX = " + Stats[1] + " Where USERID = " + ID);
				con.query("UPDATE `Players`"+ "set PREC = " + Stats[2] + " Where USERID = " + ID);
				con.query("UPDATE `Players`"+ "set PERC = " + Stats[3] + " Where USERID = " + ID);
				message.channel.send('You have entered the raid!');
			}, 1000);
			} else {
				message.channel.send('You are already queued or have not registered, make sure to user !register');
				console.log(CheckIfRegistered(message.member.ID));
			}}, 100)
			//function to check if user has registered beforehand 'if true they have used !register beforehand'
			function CheckIfRegistered(ID){
				if (err) throw err;
				cont.query("SELECT * FROM PStats", function(err, result){
					for(var i=0; i < result.length; i++){
						if(result[i].UserID == ID){
							alreadyregistered = true;
						}
						else
						alreadyregistered = false;
					}
				}
			)}		
		});
	})
	var time = 60;
	//awaits for 'found' to be emitted from myEmitter
	myEmitter.on('found', () => {
		console.log('found!')
		console.log('first: ', first, 'found: ', found, 'alreadyregistered: ', alreadyregistered)
	if(first == false && found == false && alreadyregistered == false){
		message.channel.send('Timer started, 1 minute before raid starts')
		first = true;
	var countdown = setInterval(function(){
			//time countdown, later add an if (time == 0) to start raid
			time = time-10;
			message.channel.send('Time left: ' + time + 's')
			if (time == 0)
			clearInterval(countdown)
		}, 10000)
	}
	});
	},
};
