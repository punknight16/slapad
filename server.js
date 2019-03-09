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
		case 'register':
			res.end('register');
			break;
		case 'login': 
			res.end('login');
			break;
		case 'home':
			res.end('home');
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