var fs = require("fs");
var readline = require("readline");
var create = require("./create.js");
var use = require("./use.js");
var drop = require("./drop.js");
var select = require("./select.js");
var update = require("./update.js");
var del = require("./delete.js");
var insert = require("./insert.js");

var readline_obj = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});

var db_config = fs.readFileSync("db_config.json");
var db_name = JSON.parse(db_config).db;
readline_obj.setPrompt(">");
readline_obj.prompt(); 
readline_obj.on("line",(line) => {
	var sql = line.split(" ");
	switch(sql[0]){
		case "create":
			create.parse(sql.slice(1));
			break;
		case "use":
			use.parse(sql.slice(1));
			break;
		case "drop":
			drop.parse(db_name,sql.slice(1));
			break;
		case "select":
			select.parse(db_name,sql.slice(1));
			break;
		case "update":
			update.parse(db_name,sql.slice(1));
			break;
		case "delete":
			del.parse(db_name,sql.slice(1));
			break;
		case "insert":
			insert.parse(db_name,sql.slice(1));
			break;
		default:
			console.log("not fund table");
	}
	readline_obj.prompt();
});