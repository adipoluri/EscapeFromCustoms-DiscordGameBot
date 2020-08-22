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
			database: "PlayerStats"
		});
		
		
		con.connect(function(err){
			if (err) throw err;
			
			con.query("Select * FROM PStats", function (err, result, fields) {
				if (err) throw err;
				var found = false;
				var ID = message.member.id;
				for(i = 0; i < result.length; i++) {
					if(result[i] == ID) {
						found = true;
					}
				}
				if (!found) {
					con.query("INSERT INTO `PStats` (UserID) VALUES (" + ID + ")");
					if(err & err != "ER_DUP_ENTRY"){
						message.channel.send('Already Registered!');
					} else {
						message.channel.send('Successfully Registered!');
					}
				}

			});
		});
		
	},
};