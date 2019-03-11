var http = require('http');
var fs = require('fs');
var mu = require("mu2-updated"); //mustache template engine

var receivePostData = require('./_models/receive-post-data');
var createShippingLabelInteractor = require('./_scripts/create-shipping-label-interactor');

var data = {
	universal_data: ["cred-0vndq7krkn6o", 'engagement-0u6v80trf7q8'],
	cred_data: [
		{ 
			cred_id: 'cred-0vndq7krkn6o',
		  email: 'demo%40mail.com',
		  password: '77de38e4b50e618a0ebb95db61e2f42697391659d82c064a5f81b9f48d85ccd5',
		  engagement_id: 'engagement-0u6v80trf7q8' 
		}
	],
	name_data: [
		{universal_id: 'cred-0vndq7krkn6o', universal_name: 'demo-user'}
	],
	permission_data: [
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/menu', universal_id: 'menu-0'},
		{cred_id: 'cred-0vndq7krkn6o', resource_id:'r-mt/logout', universal_id: 'public'}
	],
	engagement_data: [],
	menu_data: [
		{menu_id: 'menu-0', menu_items: [
			{link: '/shipping-information', value: 'Shipping Information', active: 'active', sr: '<span class="sr-only">(current)</span>'},
			{link: '/create-shipping-label', value: 'Create Shipping Label'},
			{link: '/print-shipping-label', value: 'Print Shipping Label'}
		]}
	]
};

var config = {
	SHIPPO_KEY: require('./_config/creds.js').SHIPPO_KEY
}

var ext = {};

var error = function(res, err_msg){
	console.log(JSON.stringify(err_msg));
	displayTemplate(res, err_msg, 'error.html');
};

var displayTemplate = function(res, msg, template=null, args={}){
	console.log('args: ', args);
	var template_path = "./_templates/"+template;
	var full_args = Object.assign(args, {msg: msg});
	console.log("full_args: ", full_args);
	var stream = mu.compileAndRender(template_path, full_args);
	stream.pipe(res);
}

var server = http.createServer(function(req, res){
	var path_vars = req.url.split('/');
	var path = path_vars[1].split('?');
	switch(req.method){
		case 'GET':
			switch(path[0]){
				case 'index':
					var stream = fs.createReadStream(__dirname+'/_pages/index.html');
					stream.pipe(res);
					break;
				case 'documentation':
					var stream = fs.createReadStream(__dirname+'/_pages/documentation.html');
					stream.pipe(res);
					break;
				case '_imgs':
					var file = __dirname+'/_imgs/'+path_vars[2];
					fs.exists(file, function(exists){
						if(exists){
							var stream = fs.createReadStream(file);
							stream.pipe(res);	
						} else {
							res.statusCode = 404;
							res.end('404: file not found');
						}
					});
					break;
				case 'landing':
					var stream = fs.createReadStream(__dirname+'/_pages/landing.html');
					stream.pipe(res);
					break;
				case 'register':
					var stream = fs.createReadStream(__dirname+'/_pages/register.html');
					stream.pipe(res);
					break;
				case 'login': 
					var stream = fs.createReadStream(__dirname+'/_pages/login.html');
					stream.pipe(res);
					break;
				default: 
					res.write("<html><form method='post' action='/test'>");
					res.write("<input type='hidden' name='hidden' value='haha' />");
					res.write("<input type='submit' value='test' />");
					res.write("</form></html>");
					res.end();			
			}
			break;
		case 'POST':
			receivePostData(req, function(err, post_obj){
				if(err) return error(res, err);
				if(post_obj.hasOwnProperty('form_id')){
					var args = Object.assign(post_obj, {path: path, path_vars: path_vars});
					templateRouter(data, config, args, ext, function(err, msg, template, confirm_args){
						displayTemplate(res, msg, template, confirm_args)
					});	
				} else {
					error(res, 'bad post request');
				}
			});
			break;
		default:
			res.end('bad request');
	} 
}).listen(3000, function(){
	console.log('server is running on port 3000');
});


function templateRouter(data, config, args, ext, cb){
	switch(args.path){
		case 'shipping-information':
			return cb(null, 'shipping-information')
			break;
		case 'create-shipping-label':
			createShippingLabelInteractor(config, function(err, shipment){
				console.log('err: ', err);
				console.log('shipment: ', shipment);
				return cb(null, '/create-shipping-label');
			});
			break;
		case 'print-shipping-label':
			return cb(null, '/print-shipping-label');
			break;
		case 'users':
			return cb(null,  '/users');
			break;
		case 'coupons':
			return cb(null, '/coupons');
			break;
		case 'labels':
			return cb(null, '/labels');
			break;
		case 'logout':
			return cb(null, 'logout');
			break;
		case 'deactivate-account':
			return cb(null, 'deactivate-account');
			break;
		default:
			return cb('bad request');
	}
};