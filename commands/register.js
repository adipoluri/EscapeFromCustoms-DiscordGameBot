module.exports = {
	name: 'register',
	description: 'registers player into database',
	execute(message, args) {
		var mysql = require('mysql');
		
		//Establishes connection to MySQL Database
		var con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password:"password",
			database: "PlayerStats",
		});
		var equip = mysql.createConnection({
			host: "localhost",
			user: "root",
			password:"password",
			database: "Equipment",
		});
		
		
		con.connect(function(err){
			if (err) throw err;
			con.query("Select * FROM PStats", function (err, result, fields) {
				if (err) throw err;
				var ID = message.member.id;
				var found = false;
				for(i = 0; i < result.length; i++) {
					if(result[i].UserID == ID) {
						found = true;
					}
				}
				if(!found) {
					con.query("INSERT INTO `PStats` (UserID) VALUES (" + ID + ")");
					message.channel.send('You have been Registered!');
				} else {
					message.channel.send('You are already Registered!');
				}
			});	
		});
		equip.connect(function(err){
			equip.query("Select * FROM Equipment", function (err, result, fields) {
				if (err) throw err;
				var ID = message.member.id;
				var found = false;
				for(i = 0; i < result.length; i++) {
					if(result[i].UserID == ID) {
						found = true;
					}
				}
				if(!found) {
					equip.query("INSERT INTO `Equipment` (UserID) VALUES (" + ID + ")");
				} else {
				}
			});	
		})
		
	},
};