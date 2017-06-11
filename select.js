var fs = require("fs");
var readline = require("readline");
var table_struct = [];
var db_name = "";
var select_obj = {
	fields:[],
	table_name:"",
	where:""
}

function select(){
	var fr = fs.createReadStream(db_name+"/"+select_obj.table_name);
	var fw = fs.createWriteStream(db_name+"/"+select_obj.table_name,{flags:"r+"});
	var obj_readline = readline.createInterface({
		input:fr,
		output:fw,
	});
	obj_readline.on("line",(line) => {
		var strarr = line.split(",");
		var line_obj = {};
		for(var i = 0; i < strarr.length; i++){
			var arr = strarr[i].split("="); 
			line_obj[arr[0]] = arr[1];
		}
		var line_arr = [];
		if(select_obj.fields === "*"){
			for(pro in line_obj){
				line_arr.push(line_obj[pro]);
			}
		}else{
			var filed_arr = select_obj.fields.split(",");
			for(var i = 0;i<filed_arr.length;i++){
				for(var j = 0;j<table_struct.length;j++){
					if(table_struct[j] === filed_arr[i])
						line_arr.push(line_obj[filed_arr[i]]);
				}
			}
		}
		console.log(line_arr.join(","));
	});
	obj_readline.on("close",()=>{
	});
}


//获取表结构
function get_table_struct(table_name){
	var data = fs.readFileSync("table_config.json");
	table_struct = JSON.parse(data)[table_name];
	select();
}


//解析命令
function parse(name,arr){
	db_name = name;
	select_obj.fields = arr[0];
	select_obj.table_name = arr[2];
	select_obj.where = arr[4];
	get_table_struct(select_obj.table_name);
}

exports.parse = parse;

