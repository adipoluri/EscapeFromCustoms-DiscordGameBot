module.exports = {
	name: 'profile',
	description: 'shows player profile',
	execute(message) {
        const Discord = require('discord.js');
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
			con.query("Select * FROM PStats", function (err, result) {
				if (err) throw err;
                
				var ID = message.member.id;
				var userIndex;
                var found = false;
				for(var i = 0; i < result.length; i++) {
					if(result[i].UserID == ID) {
						found = true;
						userIndex = i;
					}
                }
				if(found) {

					equip.connect(function(err){
						if (err) throw err;
						equip.query("Select * FROM Equip", function (err, result2) {
							if (err) throw err;
							
							var inventory = [result2[userIndex].Slot1, result2[userIndex].Slot2, result2[userIndex].Slot3, result2[userIndex].Slot4];
							
							const Embed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle(message.author.username + "'s Profile")
							.setAuthor(message.author.username, "https://forum.escapefromtarkov.com/uploads/monthly_2017_10/59e4399c40146_happyusec.jpg.fd31ebb7d3cca5bd9aa218e86441a5f1.jpg")
							.setThumbnail("https://forum.escapefromtarkov.com/uploads/monthly_2017_10/59e4399c40146_happyusec.jpg.fd31ebb7d3cca5bd9aa218e86441a5f1.jpg")
							.setDescription(result[userIndex].Description)
							.addFields(
								{ name: 'Inventory', value: inventory },
								{ name: 'Your Stats', value: "-------------------"},
								{ name: "STRENGTH :muscle:", value: result[userIndex].STR, inline: true },
								{ name: "DEXTERITY :raised_hand:", value: result[userIndex].DEX, inline: false },
								{ name: "PERCEPTION :eye:", value: result[userIndex].PERC, inline: true },
								{ name: "PRECISION :gun:", value: result[userIndex].PREC, inline: false },
							)
							.setImage(message.member.user.avatarURL)
							
							//.addField('Inline field title', 'Some value here', true)		
							//.setTimestamp()
							//.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
							//.setThumbnail('https://i.imgur.com/wSTFkRM.png')
							//.setURL('https://discord.js.org/')
					
						message.channel.send(Embed);


						});	
					})

				} else {
					message.reply('You are not Registered! Register already you simp!');
				}
			});	
        });	
	},
};