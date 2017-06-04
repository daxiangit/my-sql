var fs = require("fs");

function drop(arr){
	if(arr[0] === "database" || arr[0] === "db"){
		db_del(arr[1]);
	}else if(arr[0] === "table"){
		table_del(arr[1]);
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
			console.log("database deleted successfully :" + "   " + "db_name");
		});
	});
}

function table_del(table_name){
	fs.unlink(table_name,function(err){
		if(err)
			return console.error(err);
		var table_config = fs.readFileSync("table_config.json","utf-8");
		var table_obj = JSON.parse(table_config);
		delete table_obj[arr[1]];
		var talbe_str = JSON.stringify(table_obj);
		fs.writeFileSync("table_config.json",talbe_str);
		console.log("Table deleted successfully :" + "  " + table_name);
	});
}

function main(argv){
	drop(argv);
}

main(process.argv.slice(2));