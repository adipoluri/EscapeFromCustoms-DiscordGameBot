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
			database: "Players",
		});
		
		var profilePictures = 
		["https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTea4j_bNlLVmYEQvD0QSEJsbQuzLOPH_OESw&usqp=CAU", 
		"https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/1/1a/Dealmaker_Portrait.png/revision/latest/scale-to-width-down/109?cb=20190927130858",
		"https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/a/ac/Killa_Portrait.png/revision/latest/scale-to-width-down/127?cb=20181002041751",
		"https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/4/44/Gluhar_Portrait.PNG/revision/latest/scale-to-width-down/127?cb=20190822134430",
		"https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/3/3f/Shturman_Portrait.png/revision/latest/scale-to-width-down/127?cb=20190826162653",
		"https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/2/23/Sanitar_Portrait.png/revision/latest/scale-to-width-down/127?cb=20200721020828",
		"https://forum.escapefromtarkov.com/uploads/monthly_2017_10/59e4399c40146_happyusec.jpg.fd31ebb7d3cca5bd9aa218e86441a5f1.jpg"];
		
		
		con.connect(function(err){
			if (err) throw err;
			con.query("Select * FROM PlayerStats", function (err, result) {
				if (err) throw err;
				con.query("Select * FROM Equipment", function (err, result2) {
					if (err) throw err;
					
					var ID = message.member.id;
					var userIndex;
					var alreadyinraid = false;

					for(var i = 0; i < result.length; i++) {
						if(result[i].UserID == ID) {
							alreadyinraid = true;
							userIndex = i;
						}
					}

					if(alreadyinraid) {
						var inventory = [result2[userIndex].Slot1, result2[userIndex].Slot2, result2[userIndex].Slot3, result2[userIndex].Slot4];
						var image = profilePictures[Math.floor(Math.random() * profilePictures.length)];		
						const Embed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle(message.author.username + "'s Profile")
						.setAuthor(message.author.username, image)
						.setThumbnail(image)
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

					} else {
						message.reply('You are not Registered! Use !Register now you simp!');
					}
				});	
			});	
        });	
	},
};