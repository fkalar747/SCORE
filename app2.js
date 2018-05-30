

var express = require('express');
var app = express();

var path = require('path');
var request = require('request');

app.use(express.static("img"));
app.set("view engine","ejs");


app.get('/',function(req,res){
	res.sendFile(path.join(__dirname,"img/"))
});



app.get('/results',function(req,res){
	var term = req.query.term;
	var url = 'http://www.omdbapi.com/?apikey=thewdb&s='+term;
	request(url,function(error,response,body){
		if(error){

		}else{

			var json1 = JSON.parse(body);

			if(response.statusCode == 200){
				res.render('results2',{ejsdata:json1.Search});
			}
		}
	});
});



app.get('/to3000',function(req,res){
	//var term = req.query.term;
	console.log("sending post to 3000");
	request(
		{
			url: 'http://127.0.0.1:3000/api/v1/transactions',
 			method: 'POST',
 			headers: {
        	"content-type": "application/json",
        	},
    		json: { 
			    "jsonrpc": "2.0",
			    "channel": "channel_name",
			    "method": "contract",   
			    "id": "test_query",    
			    "params": {          
			        "key":"", //계약번호
					"value":{
							"farmer":"",		//농부 id, 번호?
							"location":"",		//농장 지역 주소
							"reward":"",		//보상
							"citizen":"",		//시민 id
							"when":"",			//도와줄 일시
							"uptime":"",
							"fulfillment": "yet"
					}
			    }
			}


			/*
				# method = done
				"key":"" #계약번호
				"value":{
					"starting_time":""
					"end_time":""
					}

				# method = cancel
				"key":"" #계약번호
				"value":{
					"who":""
					"why":""
					"uptime":""
					}
			*/
		},function(error,response,body){
			if(error){

			}else{
				if(response.statusCode == 200){
					/*
					{
					    "response_code" : "int : RES_CODE",
					    "tx_hash" : "트랜잭션 해시",
					    "more_info" : "추가 정보"
					}
					*/
					console.log(body);
					console.log(response.body);
					res.send(response.body);
				}
			}
	});
});

app.get('/to3000',function(req,res){
	//var term = req.query.term;
	console.log("sending post to 3000");
	request(
		{


			/*
			{ 
				"jsonrpc":"2.0", 
				"id": ~~, <== Must be string in Query. 
				"method":”……..", 
				"params": { …… } 
			}*/
			

			url: 'http://127.0.0.1:3000/api/v1/query',
 			method: '',
 			headers: {
        	"content-type": "application/json",
        	},
    		json: { 
			    "jsonrpc": "2.0",
			    "channel": "channel_name",
			    "method": "get_bid",   
			    "id": "test_query",    
			    "params": {          
			        "name": "1",
			        "identity": "2"
			    }
			}
		},function(error,response,body){
			if(error){

			}else{
				if(response.statusCode == 200){
					/*
					{ 'code' : integer value. <== 'Success' is 0. 'Exception' is 9000. 'result’ : …… }
					*/
					console.log(body);
					console.log(response.body);
					res.send(response.body);
				}
			}
	});
});


app.listen(3100,console.log("server is running"));