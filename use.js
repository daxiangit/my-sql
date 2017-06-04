var fs = require("fs");

function use(dbName){
	var db_config = fs.readFileSync("db_config.json","utf-8");
	var json = JSON.parse(db_config);
	json.db = dbName;
	var str = JSON.stringify(json);
	fs.writeFileSync("db_config.json",str);
}

function main(argv){
	use(argv[0]);
}

main(process.argv.slice(2));