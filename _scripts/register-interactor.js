function registerInteractor(data, config, args, ext, cb){
	var err;
	
	args.engagement_id = ext.generateId(data.universal_data, 'engagement-', 10);
	if(typeof args.engagement_id == 'undefined') return cb('no engagement_id');
	args.cred_id = ext.generateId(data.universal_data, 'cred-', 10);
	if(typeof args.cred_id == 'undefined') return cb('no cred_id');
	args.token_id = ext.generateId(data.universal_data, 'token-', 10);
	if(typeof args.token_id == 'undefined') return cb('no token_id');
	args.public_token = ext.generateId(data.universal_data, 'k-', 10);
	if(typeof args.public_token == 'undefined') return cb('no public_token');
	/*
	//
	err = ext.addCredObj(data, config, args, ext);
	if(err) return cb('failed to add cred_obj');
	args.universal_id = args.cred_id;
	args.universal_name = args.username;
	err = ext.addNameObj(data, config, args, ext);
	if(err) return cb('failed to add name_obj');
	args.resource_id = 'r-sa/logout';
	args.universal_id = args.cred_id;
	err = ext.addPermissionObj(data, config, args, ext);
	if(err) return cb('failed to add first permission_obj');
	
	err = ext.addEngagementObj(data, config, args, ext);
	if(err) return cb('failed to add engagement');
	var token_obj = ext.addTokenObj(data, config, args, ext);
	if(typeof token_obj == 'undefined') return cb('couldn\'t generate token_obj');
	var menu_id = ext.getMenuIdFromPermission(data.permission_data, args.cred_id, ext.getPermissionObj, ext.getObj);
	if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
	var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
	if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
	config.client_cache[args.cred_id] = {
		current_template = args.path[0] +'.html';
	};
	config.update_needed = true;
		*/

	var menu_obj = {menu_items: [
			{link: '/shipping-information', value: 'Shipping Information', active: 'active', sr: '<span class="sr-only">(current)</span>'},
			{link: '/create-shipping-label', value: 'Create Shipping Label'},
			{link: '/print-shipping-label', value: 'Print Shipping Label'}
	]};
	return cb(null, {
		token_obj: {token_id: 't1', public_token: 'k1', private_token: 'l1'}, 
		menu_items: menu_obj.menu_items
	});
}

module.exports = registerInteractor;