// var mysql = require('mysql');
// var PStats;

// //Establishes connection to MySQL Database
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password:"password",
//     database: "Players"
// });


// con.connect(function(err){
//     if (err) throw err;
//     console.log("Connected!");
    
//     con.query("Select * FROM Playerstats", function (err, result) {
//         if (err) throw err;
//         console.log(result);
//           PStats = [result[0].STR,
//                    result[0].DEX,
//                    result[0].PERC,
//                    result[0].PREC];
//         process(PStats);
//     });
// });

// //deprecated -- see function below
// //setTimeout(function(){exports.PStats = PStats; console.log(PStats)}, 100);

// function process(callback){
//     exports.PStats = callback;
// }