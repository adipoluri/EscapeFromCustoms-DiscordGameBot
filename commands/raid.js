//Linter says these two vars are not used, ill leave them but delete them if u dont need it
//const { execute } = require("./register");
//var ID = [i, null];

var Stats = [];
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
			var found = false;
			for(var i = 0; i < result.length; i++) {
				if(result[i].UserID == ID) {
					found = true;
				}
			}
			if(!found) {
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
				message.channel.send('You are already queued!');
			}
		});	
	})
	},
};