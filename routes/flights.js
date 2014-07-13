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
		req.collection.find().toArray(function(err, results){
			if(!err){
	  			if(results != null){
	  				if(results.length == 0)
			    		res.send("Date Not Found");
			    	else
			    		res.send(results);
				}
				else
					res.send("Date Not Found");
			}
			else
				res.send("Error:" + err);
		});
	};

	//Function to Find Flight in a Month
	function FindFlightById(req,res){
		
	  var id = req.params.id;
	  req.collection.findById(id, function(err, results){
	  		if(!err){
	  			if(results != null){
				    res.send(results)
				}
				else
					res.send('ID Not Found');
			}
			else
				res.send('Error:' + err);
		});
	};

	function NotFound(req,res){
		res.sendfile('public/notfound.html');
	}

	//Link routes
	app.get('/api/:collectionName', FindFlightMonth);
	app.get('/api/:collectionName/:id', FindFlightById);
	app.get('/*', NotFound);
};