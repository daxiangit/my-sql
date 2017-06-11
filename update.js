var fs = require("fs");
var readline = require("readline");
var table_struct = [];
var db_name = "";
var update_obj = {
	table_name:"",
	set_obj:{},
	where:{}
}

function update(){
	var fr = fs.createReadStream(db_name+"/"+update_obj.table_name);
	var fw = fs.createWriteStream(db_name+"/"+"temp",{flags:"w+"});
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

		for(var pro in update_obj.set_obj){
			if(pro in line_obj){
				line_obj[pro] = update_obj.set_obj[pro];
			}
		}
		for(var pro in line_obj){
			var str = pro + "=" + line_obj[pro];
			line_arr.push(str);
		}
		fw.write(line_arr.join(",")+"\n");
	});
	obj_readline.on("close",()=>{
		fs.unlinkSync("test/"+update_obj.table_name);
		fs.renameSync("test/temp","test/"+update_obj.table_name);
	});
}


//获取表结构
function get_table_struct(table_name){
	var data = fs.readFileSync("table_config.json");
	table_struct = JSON.parse(data)[table_name];
	update();
}


//解析命令
function parse(name,arr){
	db_name = name;
	var set_arr = arr[2].split(",");
	// var where_arr = arr[4].split("=");

	update_obj.table_name = arr[0];
	for(var i=0;i<set_arr.length;i++){
		var arr = set_arr[i].split("=");
		update_obj.set_obj[arr[0]] = arr[1];
	}
	// update_obj.where = arr[4];
	get_table_struct(update_obj.table_name);
}

exports.parse = parse;

