var fs = require("fs");
var create_obj = {
	flags:"",
	name:"",
	struct:[]
}

function create(){
	if(create_obj.flags === "database" || create_obj.flags === "db"){
		fs.mkdir(create_obj.name,function(err){
			if(err)
				return console.error(err);
			console.log("数据库创建成功");
			setDbname(create_obj.name);
		})
	}else if(create_obj.flags === "table"){
		var file = fs.readFileSync("db_config.json","utf-8");
		var	db = JSON.parse(file).db;

		fs.open(db+"/"+create_obj.name,"wx",function(err,fd){
			if(err)
				return console.error(err);
			console.log("表创建成功");
			setTable(create_obj.name,create_obj.struct);
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

function setTable(table,struct){
	fs.readFile("table_config.json","utf-8",function(err,data){
		if(err)
			return console.error(err);
		var table_config = JSON.parse(data);
		table_config[table] = struct;
		var jsonstr = JSON.stringify(table_config);
		fs.writeFileSync("table_config.json",jsonstr);
	});
}

function parse(arr){
	create_obj.flags = arr[0];
	create_obj.name = arr[1];
	if(create_obj.flags === "table")
		create_obj.struct = arr[2].slice(1,arr[2].length-1).split(",");
	create();
}

exports.parse = parse;