var fs = require("fs");
var readline = require("readline");
var table_struct = [];
var db_name = "";
var insert_obj = {
	table_name:"",
	value_list:[]
}

function insert(){
	var fw = fs.createWriteStream(db_name+"/"+insert_obj.table_name,{flags:"a+"});
	
	var arr = [];
	for(var i = 0;i<table_struct.length;i++){
		var value = table_struct[i]+"="+insert_obj.value_list[i];
		arr.push(value);
	}
	fw.write(arr.join(",")+"\n");
}


//获取表结构
function get_table_struct(table_name){
	var data = fs.readFileSync("table_config.json");
	table_struct = JSON.parse(data)[table_name];
	insert();
}


//解析命令
function parse(name,arr){
	db_name = name;
	insert_obj.table_name = arr[0];
	insert_obj.value_list = arr[2].slice(1,arr[2].length-1).split(",");
	// insert_obj.where = arr[4];
	get_table_struct(insert_obj.table_name);
}

exports.parse = parse;

