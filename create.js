var fs = require("fs");

function create(arr){
	if(arr[0] === "database" || arr[0] === "db"){
		fs.mkdir(arr[1],function(err){
			if(err)
				return console.error(err);
			console.log("数据库创建成功");
			setDbname(arr[1]);
		})
	}else if(arr[0] === "table"){
		var file = fs.readFileSync("db_config.json","utf-8");
		var	db = JSON.parse(file).db;

		fs.open(db+"/"+arr[1],"wx",function(err,fd){
			if(err)
				return console.error(err);
			console.log("表创建成功");
			setTable(arr[1],arr[2]);
			fs.close(fd,function(err){
				if(err)
					return console.error(err);
			});
		});
	}else{
		console.log("无此选项");
	}
}

function setDbname(dbname){
	fs.readFile("db_config.json","utf-8",function(err,data){
		if(err)
			return console.error(err);
		var db_config = JSON.parse(data);
		db_config.db = dbname;
		var jsonstr = JSON.stringify(db_config);
		fs.writeFileSync("db_config.json",jsonstr);
	});
}

function setTable(table,name){
	var str = name.slice(1,name.length-1);
	var strarr = str.split(",");
	fs.readFile("table_config.json","utf-8",function(err,data){
		if(err)
			return console.error(err);
		var table_config = JSON.parse(data);
		table_config[table] = strarr;
		var jsonstr = JSON.stringify(table_config);
		fs.writeFileSync("table_config.json",jsonstr);
	});
}

function main(argv){
	create(argv);
}

main(process.argv.slice(2));