var fs = require("fs");
var db_name = "";
var drop_obj = {
	flags:"",
	name:""
}

function drop(){
	if(drop_obj.flags === "database" || drop_obj.flags === "db"){
		db_del(drop_obj.name);
	}else if(drop_obj.flags === "table"){
		table_del(drop_obj.name);
	}else{
		console.log("无此选项");
	}
}

function db_del(db_name){
	fs.readdir(db_name,function(err,files){
		if(err)
			return console.error(err);
		files.forEach(function(file){
			table_del(file);
		});
		fs.rmdir(db_name,function(err){
			if(err)
				return console.error(err);
			console.log("database deleted successfully :" + "   " + db_name);
		});
	});
}

function table_del(table_name){
	fs.unlink(db_name+"/"+table_name,function(err){
		if(err)
			return console.error(err);
		var table_config = fs.readFileSync("table_config.json","utf-8");
		var table_obj = JSON.parse(table_config);
		delete table_obj[table_name];
		var talbe_str = JSON.stringify(table_obj);
		fs.writeFileSync("table_config.json",talbe_str);
		console.log("Table deleted successfully :" + "  " + table_name);
	});
}

function parse(name,arr){
	db_name = name;
	drop_obj.flags = arr[0];
	drop_obj.name = arr[1];
	drop();
}

exports.parse = parse;
