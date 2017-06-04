使用 node.js 设计数据库

一、文件列表
1. 	cmd_parse.js 			数据库命令解析
2. 	db_config.json			数据库配置文件
3. 	table_config.json		表配置文件
4. 	create.js				创建数据库或表
5. 	use.js					使用当前数据库
6. 	drop.js					删除数据库或表
7. 	selete.js				查询记录
8. 	insert.js				插入记录
9. 	delete.js				删除记录
10. update.js				更新记录


二、文件详解
1. 	cmd_parse.js 			数据库命令解析
	提供一个数据库命令运行环境
2. 	db_config.json			数据库配置文件
	属性		值类型			作用
	dbpath	string		数据库文件存放位置
	db		string		当前数据库
	dbs		array		数据库列表
3. 	table_config.json		表配置文件
	属性		值类型			作用
	name 	array			存放表结构
	
	
三、命令模式
1. 	create.js				创建数据库或表
	create database db_name    \\      create db db_name
	create table table_name table_struct
2. 	use.js					使用当前数据库
	use db_name
3. 	drop.js					删除数据库或表
	drop database db_name	   || 	   drop db db_name
	drop table table_name
4. 	selete.js				查询记录
5. 	insert.js				插入记录
6. 	delete.js				删除记录
7. 	update.js				更新记录

	















