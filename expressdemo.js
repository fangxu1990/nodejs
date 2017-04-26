
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs");
var cookieParser = require("cookie-parser");

var urlencodedparser = bodyParser.urlencoded({extended:false});

app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({dest:'/'}).array('image'));
app.use(cookieParser());
//app.use(express.static("public"));
 
app.get("/index",function (req,res) {
	console.log(__dirname);
	console.log(req.cookies);
	res.sendFile(__dirname+"/index.html");
})

app.get("/process_get",function (req,res) {
	var response = {
		firstName:req.query.first_name,
		lastName:req.query.last_name
	}
	console.log(response);
	res.end(JSON.stringify(response));
	//res.send("ok");
})

app.post("/process_post",urlencodedparser,function(req,res) {
	var response = {
		firstName:req.body.first_name,
		lastName:req.body.last_name
	}
	console.log(response);
	res.end(JSON.stringify(response)); 
})

app.post("/fileupload",function(req,res) {
	console.log(req.files[0]);  // 上传的文件信息
	var destfile = __dirname+"/"+req.files[0].originalname;
	fs.readFile(req.files[0].path,function(err,data){
	    fs.writeFile(destfile, data, function (err) {
			if(err){
				console.log(err);
			}else{
				response={message:'file uploaded successfully',filename:req.files[0].originalname};
			}
			res.set("text/plain");
          	res.end( JSON.stringify( response ) );
		});
	})
})


//  主页输出 "Hello World"
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   console.log("mountpath:"+app.mountpath);

   res.cookie("cookietest","test");
   console.log("params:"+req.params);
   res.send('Hello GET');
})
 
 
//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})
 
//  /del_user 页面响应
app.get('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
})
 
//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})
 
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})
 
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
