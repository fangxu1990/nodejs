
var express = require("express");
var fs = require("fs");
var app = express();

app.get("/listUsers",function(req,res) {
	fs.readFile(__dirname+"/"+"user.json",'utf8',function(err,data) {
		res.set("Content-Type","text/json;charset=utf-8");
		res.end(data);
	})
})

var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.get("/addUser",function(req,res) {

	fs.readFile(__dirname+"/"+"user.json","utf8",function(err,data) {
		var users = JSON.parse(data);
		users["user4"] = user;
		res.set("Content-Type","text/json;charset=utf-8");
		res.end(JSON.stringify(users));
	})
})


app.get("/deleteUser",function(req,res) {
	fs.readFile(__dirname+"/user.json",function(err,data){
		data = JSON.parse(data);
		delete data["user3"];

		res.end(JSON.stringify(data));
	})
})



var server = app.listen(8081,function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("访问地址：http://%s:%s",host,port);
})
NAVD-7ZEH-SW6J-CPDO

