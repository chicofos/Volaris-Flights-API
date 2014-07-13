
var express = require('express');
var app = express();


// configuration
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});


//Routes (Module)
var routes = require('./routes/flights.js')(app);

//listen
app.listen(8080);
console.log("app listening on port 8080");