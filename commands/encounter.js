//ALL MOVED INTO RAID.JS

// var mysql = require('mysql');
// const Discord = require('discord.js')
// var raid = require('../Main');
// var players  = [];
// //Establish connection with temporary data of all players in raid
//     var con = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password:"password",
//         database: "PlayersInRaid"
//     });

//     module.exports.BeginRaid = () =>{
//         con.query("Select * from Players", function (err, result){
//             if (err) throw err;
//             for(var i=0; i < result.length; i++){
//                 players.push(result[i].UserID)
//                 console.log(players)
//                 for(var x = 0; x < players.length; x++){
//                     rollencounter(players.UserID)
//                 }
//             }
//         })
//     }

// var rollencounter = function(){
//     const roll = new Discord.MessageEmbed()
//     .setColor('#0099ff')
//     .setTitle('Roll for Encounter')
//     .setThumbnail('https://cdnb.artstation.com/p/assets/images/images/018/042/671/large/hayo-sena-00.jpg?1558240182')
//     raid.client.channels.cache.get('747021523814055936').send('hi');
// }
