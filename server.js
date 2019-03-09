var http = require('http');

var config = {
	SHIPPO_KEY: require('./_config/creds.js').SHIPPO_KEY
}

var server = http.createServer(function(req, res){
	var path_vars = req.url.split('/');
	console.log('path_vars: ', path_vars);
	switch(path_vars[1]){
		case 'index':
			res.end('index');
			break;
		case 'documentation':
			res.end('documentation');
			break;
		case 'splash':
			res.end('splash');
			break;
		case 'register':
			res.end('register');
			break;
		case 'login': 
			res.end('login');
			break;
		case 'onboard-advertiser':
			res.end('onboard-advertiser')
			break;
		case 'onboard-retailer':
			res.end('/onboard-retailer');
			break;
		case 'create-shipping-label':
			createShippingLabelInteractor(config, function(err, shipment){
				console.log('err: ', err);
				console.log('shipment: ', shipment);
				res.end('/create-shipping-label');
			});
			break;
		case 'users':
			res.end('/users');
			break;
		case 'coupons':
			res.end('/coupons');
			break;
		case 'shipping-quotes':
			res.end('/shipping-quotes');
			break;
		case 'printed-labels':
			res.end('printed-labels');
			break;
		case 'logout':
			res.end('logout');
			break;
		case 'deactivate-account':
			res.end('deactivate-account');
			break;
		default:
			res.end('bad request');
	}
}).listen(3000, function(){
	console.log('server is running on port 3000');
});


function createShippingLabelInteractor(config, cb){
	console.log("using SHIPPO_KEY: ", config.SHIPPO_KEY);
	var shippo = require('shippo')(config.SHIPPO_KEY);
	

	var addressFrom  = {
	    "name": "Shawn Ippotle",
	    "street1": "215 Clayton St.",
	    "city": "San Francisco",
	    "state": "CA",
	    "zip": "94117",
	    "country": "US"
	};

	var addressTo = {
	    "name": "Mr Hippo",
	    "street1": "Broadway 1",
	    "city": "New York",
	    "state": "NY",
	    "zip": "10007",
	    "country": "US"
	};

	var parcel = {
	    "length": "5",
	    "width": "5",
	    "height": "5",
	    "distance_unit": "in",
	    "weight": "2",
	    "mass_unit": "lb"
	};

	shippo.shipment.create({
	    "address_from": addressFrom,
	    "address_to": addressTo,
	    "parcels": [parcel],
	    "async": false
	}, function(err, shipment){
	    if (err) return cb('err: ', err);
	    return cb(null, shipment);
	});
}