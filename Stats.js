var mysql = require('mysql');
var STR;
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
        STR = result[0].STR;
        return STR
    });
});

setTimeout(function(){exports.STR = STR;}, 100);
