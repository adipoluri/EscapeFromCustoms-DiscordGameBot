module.exports = {
	name: 'register',
	description: 'registers player into database',
	execute(message) {
		var mysql = require('mysql');
		
		//Establishes connection to MySQL Database for Stats
		var con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password:"password",
			database: "PlayerStats",
		});
		//Establishes connection to MySQL Database for Equipment
		var equip = mysql.createConnection({
			host: "localhost",
			user: "root",
			password:"password",
			database: "Equipment",
		});
		
		//generates default stats for new !register
		con.connect(function(err){
			if (err) throw err;
			con.query("Select * FROM PStats", function (err, result) {
				if (err) throw err;
				var ID = message.member.id;
				var found = false;
				for(var i = 0; i < result.length; i++) {
					if(result[i].UserID == ID) {
						found = true;
					}
				}
				if(!found) {
					con.query("INSERT INTO `PStats` (UserID) VALUES (" + ID + ")");
					message.channel.send('You have been Registered!');
				} else {
					message.reply('you are already Registered!');
				}
			});	
		});
		//generates default equipment for new !register
		equip.connect(function(err){
			if (err) throw err;
			equip.query("Select * FROM Equip", function (err, result) {
				if (err) throw err;
				var ID = message.member.id;
				var found = false;
				for(var i = 0; i < result.length; i++) {
					if(result[i].UserID == ID) {
						found = true;
					}
				}
				if(!found) {
					equip.query("INSERT INTO `Equip` (UserID) VALUES (" + ID + ")");
				}
			});	
		})
		
	},
};