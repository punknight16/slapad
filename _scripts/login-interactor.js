function loginInteractor(data, config, args, ext, cb){
	var err;
	args.engagement_id = ext.generateId(data.universal_data, 'engagement-', 10);
	if(typeof args.engagement_id == 'undefined') return cb('no engagement_id');
	args.token_id = ext.generateId(data.universal_data, 'token-', 10);
	if(typeof args.token_id == 'undefined') return cb('no token_id');
	args.public_token = ext.generateId(data.universal_data, 'k-', 10);
	if(typeof args.public_token == 'undefined') return cb('no public_token');
	//
	ext.compareCreds(data.cred_data, args.email, args.password, config.pass_secret, ext.crypto, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		/*
		err = ext.addEngagementObj(data, config, args, ext);
		if(err) return cb('failed to add engagement');
		var token_obj = ext.addTokenObj(data, config, args, ext);
		if(typeof token_obj == 'undefined') return cb('couldn\'t generate token_obj');
		var menu_id = ext.getMenuIdFromPermission(data.permission_data, cred_id, ext.getPermissionObj, ext.getObj);
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
		var link_arr = ext.checkoutLinkObj(data.link_data, cred_id, ext.checkoutObj);
		config.client_cache[args.cred_id] = {
			goal_arr: [],
			goal_pages: null, 
			link_arr: [],
			link_pages: null
		};
		if(typeof args.link_cursor == 'undefined'){
			args.link_cursor = 1;	
		}
		config.client_cache[cred_id].link_arr = link_arr.map((item, index)=>{item.index=index; return item});
		config.client_cache[cred_id].link_pages = Math.ceil(link_arr.length/10);
		config.client_cache[cred_id].link_cursor = args.link_cursor;
		return cb(null, {
			token_obj: token_obj,
			menu_items: menu_obj.menu_items,
			link_arr: config.client_cache[cred_id].link_arr.slice((args.link_cursor-1)*10, args.link_cursor*10),
			link_pages: config.client_cache[cred_id].link_pages,
			link_cursor: config.client_cache[cred_id].link_cursor
		});
	});
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
	});
}

module.exports = loginInteractor;