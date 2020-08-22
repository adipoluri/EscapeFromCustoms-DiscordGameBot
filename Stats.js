var mysql = require('mysql');
var PStats;

//Establishes connection to MySQL Database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"password",
    database: "PlayerStats"
});


con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
    
    con.query("Select * FROM PStats", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
          PStats = [result[0].STR,
                   result[0].DEX,
                   result[0].PERC,
                   result[0].PREC];
        process(PStats);
    });
});

//setTimeout(function(){exports.PStats = PStats; console.log(PStats)}, 100);

function process(callback){
    exports.PStats = callback;
}