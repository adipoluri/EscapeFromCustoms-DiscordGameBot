module.exports = {
	name: 'setdesc',
	description: 'sets player description',
	execute(message, args) {
		var mysql = require('mysql');
		
		//Establishes connection to MySQL Database
		var con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password:"password",
			database: "PlayerStats",
		});
		
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
				if(found) {
					var argClean = args.join(" ");
					con.query('UPDATE PStats SET Description = "' + argClean + '" WHERE UserID = '+ ID);
					
					
				} else {
					message.channel.send("You're not Registered!");
				}
			});	
		});
	},
};