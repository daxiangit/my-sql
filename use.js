var fs = require("fs");

function use(dbName){
	var db_config = fs.readFileSync("db_config.json","utf-8");
	var json = JSON.parse(db_config);
	json.db = dbName;
	var str = JSON.stringify(json);
	fs.writeFileSync("db_config.json",str);
}

function parse(arr){
	use(arr[0]);
}

exports.parse = parse;