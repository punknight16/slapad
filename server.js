var http = require('http');

var server = http.createServer(function(req, res){
	var path_vars = req.url.split('/');
	switch(path_vars[0]){
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
		case '/onboard-advertiser':
			res.end('onboard-advertiser')
			break;
		case '/onboard-retailer':
			res.end('/onboard-retailer');
			break;
		case '/create-shipping-label':
			res.end('/create-shipping-label');
			break;
		case '/users':
			res.end('/users');
			break;
		case '/coupons':
			res.end('/coupons');
			break;
		case '/shipping-quotes':
			res.end('/shipping-quotes');
			break;
		case '/printed-labels':
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