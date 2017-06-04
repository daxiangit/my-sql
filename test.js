
function table(name){
	console.log(name.length);
	var str = name.slice(1,name.length-1);
	var strarr = str.split(",");
	console.log(strarr);
}






function main(argv){
	console.log(argv[0]);
	table(argv[0]);
}


console.log(process.argv.slice(2));
main(process.argv.slice(2));