mongoskin = require('mongoskin');

module.exports = function(app){

	//Connection to Database
	var db = mongoskin.db('mongodb://localhost/flights', {safe:true});

	//Define parameter collectionName
	app.param('collectionName', function(req, res, next, collectionName){
	  req.collection = db.collection(collectionName)
	  return next()
	});

	//Function to Find Data in Collection
	function FindFlightMonth(req,res){
		req.collection.find({},{limit:10, sort: [['_id',-1]]}).toArray(function(err, results){
			if(!err)
				res.send(results)
			else
				res.send('Error:' + err);
		});
	};

	//Function to Find Flight in a Month
	function FindFlightById(req,res){
	  var id = req.params.id;

	  req.collection.findById(id, function(err, results){
	  		if(!err)
			    res.send(results)
			else
				res.send('Error:' + err);
		});
	};

	function NotFound(req,res){
		res.send("Not Found!");
	}

	//Link routes
	app.get('/api/:collectionName', FindFlightMonth);
	app.get('/api/:collectionName/:id', FindFlightById);
	app.get('/*', NotFound);
};