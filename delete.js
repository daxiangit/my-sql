var fs = require("fs");
var readline = require("readline");
var table_struct = [];
var db_name = "";
var delete_obj = {
	table_name:"",
	where:""
}

function del(){
	var fr = fs.createReadStream(db_name+"/"+delete_obj.table_name);
	var fw = fs.createWriteStream(db_name+"/"+"temp",{flags:"w+"});
	var obj_readline = readline.createInterface({
		input:fr,
		output:fw,
	});
	obj_readline.on("line",(line) => {
	});
	obj_readline.on("close",()=>{
		fs.unlinkSync("test/"+delete_obj.table_name);
		fs.renameSync("test/temp","test/"+delete_obj.table_name);
	});
}


//获取表结构
function get_table_struct(table_name){
	var data = fs.readFileSync("table_config.json");
	table_struct = JSON.parse(data)[table_name];
	del();
}


//解析命令
function parse(name,arr){
	db_name = name;
	delete_obj.table_name = arr[0];
	// delete_obj.where = arr[4];
	get_table_struct(delete_obj.table_name);
}

exports.parse = parse;

