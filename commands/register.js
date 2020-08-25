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
			database: "Players",
		});
		
		//generates default stats for new !register
		con.connect(function(err){
			if (err) throw err;
			con.query("Select * FROM Playerstats", function (err, result) {
				if (err) throw err;
				var ID = message.member.id;
				var exists = false;
			
				for(var i = 0; i < result.length; i++) {
					if(result[i].UserID == ID) {
						exists = true;
					}
				}

				if(!exists) {
					con.query("INSERT INTO `Playerstats` (UserID) VALUES (" + ID + ")");
					con.query("INSERT INTO `Equipment` (`Playerstats_UserID`) VALUES (" + ID + ")");
					con.query("INSERT INTO `Stash` (`Playerstats_UserID`) VALUES (" + ID + ")");
					message.channel.send('You have been Registered!');
				} else {
					message.reply('you are already Registered!');
				}
			});	
		});
	},
};