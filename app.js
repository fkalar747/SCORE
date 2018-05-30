var express = require("express");
var app = express();
var path    = require("path");
var request = require('request');

var bodyParser = require('body-parser');
 
//app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


출처: http://lazydev.tistory.com/54 [Kern]

app.set("view engine","ejs");

app.use(express.static("css"));
app.use(express.static("img"));
app.use(express.static("js"));



app.get("/",function(req,res){
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/mymy',function(req,res){
	res.render('mymy')
});

app.get('/__dirname',function(req,res){
	res.sendFile(path.join(__dirname+'/views/mymy.html'));
});


app.get('/mymy2',function(req,res){
	res.sendFile(path.join(__dirname+'/views/mymy.html'));
});

/*
app.get('/some/:filename',function(req,res){
	var filename = req.params.filename;
	res.sendFile(path.join(__dirname+'/img/some/'+filename));
});
*/

app.get("/Bye",function(req,res){
	//res.sendFile(path.join(__dirname+'/index.html'));
	res.render('index.ejs');
});

app.post("/from3100",function(req,res){
	console.log('received post from 3100');
	console.log(req.body);
	res.send("some content");
});

app.get("/search",function(req,res){
	//res.sendFile(path.join(__dirname+'/index.html'));
	res.render('search_movie.ejs');
});

app.get("/results",function(req,res){
	//res.sendFile(path.join(__dirname+'/index.html'));
	
	var q = req.query.term;
	var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + q;

	request(url,function(error, response , body){		
		if(error){
			console.log('error happended');
			console.log(error);
		}else{
			if(response.statusCode == 200){
				var json1 = JSON.parse(body);
				res.render("results.ejs",{data : json1});
			}
		}
	});

	//res.render('results.ejs');
});


app.get("/love/:thing",function(req,res){
	var thing = req.params.thing;
	res.render("love.ejs",{thingVar:thing});

});

app.get("/movie",function(req,res){

	request('https://query.yahooapis.com/v1/public/yql?q=select%20wind%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',function(error, response , body){
		if(error){
			console.log('error happended');
			console.log(error);
		}else{
			if(response.statusCode == 200){
				var json1 = JSON.parse(body);
				res.send(json1["query"]['results']['channel']);
			}
		}
	});

});



// &apikey=thewdb


app.get("*",function(req,res){
	res.send("gaeg");
});

app.listen(3000,console.log("Server is started !!!"));