function listLabelInteractor(data, config, args, ext, cb){
	/*ext.authorizeRequest(data, config, args, ext, function(err, cred_id){
		if(err) return cb(err);
		args.cred_id = cred_id;
		var menu_id = ext.getMenuIdFromPermission(data.permission_data, cred_id, ext.getPermissionObj, ext.getObj);
		if(typeof menu_id == 'undefined') return cb('couldn\'t get menu_id');
		if(menu_id=='menu-0') menu_id='menu-6';		
		var menu_obj = ext.getMenuObj(data.menu_data, menu_id, ext.getObj);
		if(typeof menu_obj == 'undefined' || !menu_obj.hasOwnProperty('menu_items')) return cb('couldn\'t get menu_items');
		
		var cred_arr = ext.listCredObj(data.cred_data, 'r0', ext.listObj);
		if(typeof cred_arr == 'undefined') return cb('couldn\'t get cred_objs');
		const unique = [...new Set(cred_arr.map(item => item.cred_id))];

		var engagement_arr = ext.listEngagementObj(data.engagement_data, 'r0', ext.listObj);
		if(typeof engagement_arr == 'undefined') return cb('couldn\'t get engagement_objs');
		var engagement_reduced = engagement_arr.reduce((acc, obj)=>{
			if(unique.indexOf(obj.cred_id)!=-1){
				if(typeof acc[obj.cred_id] == 'undefined'){
					acc[obj.cred_id] = {total_engagements: 0, initial_date: obj.date, last_date: obj.date};
				}

				if(acc[obj.cred_id].initial_date > obj.date){
					acc[obj.cred_id].initial_date = obj.date;	
				}
				if(acc[obj.cred_id].last_date < obj.date){
					acc[obj.cred_id].last_date = obj.date;	
				}
				acc[obj.cred_id].total_engagements++
			}
			return acc;
		}, {})
		//create an array of objs using cred_id and engagements per day
		var user_arr = [];
		for (k in engagement_reduced){
			
			var d1 = new Date(engagement_reduced[k].initial_date);
	
			var d2 = new Date(engagement_reduced[k].last_date);
		
			var a = engagement_reduced[k].total_engagements;
		

			var number_of_days = Math.ceil((d2-d1)/86400000);
			
			console.log('number_of_days: ', number_of_days)
			console.log('engagements_per_day: ', a/number_of_days);
			user_arr.push({cred_id: k, engagements_per_day: a/number_of_days})
		}

		if(typeof args.user_cursor == 'undefined'){
			args.user_cursor = 1;	
		}
		config.client_cache[cred_id].user_arr = user_arr.map((item, index)=>{item.index=index; return item});
		config.client_cache[cred_id].user_pages = Math.ceil(user_arr.length/10);
		config.client_cache[cred_id].user_cursor = args.user_cursor;
		return cb(null, {
			menu_items: menu_obj.menu_items,
			user_arr: config.client_cache[cred_id].user_arr.slice((args.user_cursor-1)*10, args.user_cursor*10),
			user_pages: config.client_cache[cred_id].user_pages,
			user_cursor: config.client_cache[cred_id].user_cursor
		});
	});*/
	var menu_obj = {menu_items: [
			{link: '/user', value: 'Users'},
			{link: '/coupon', value: 'Coupons'},
			{link: '/label', value: 'Labels', active: 'active', sr: '<span class="sr-only">(current)</span>'},
			{link: '/transaction', value: 'Transactions'}
	]};
	var label_arr = [
		{label_id: 'label-0', date_last_active: '2019-03-03T03:10:45.724Z'},
		{label_id: 'label-1', date_last_active: '2019-02-02T03:10:45.724Z'},
		{label_id: 'label-2', date_last_active: '2019-01-01T03:10:45.724Z'}
	];
	return cb(null, {
		menu_items: menu_obj.menu_items,
		label_arr: label_arr,
		label_pages: 1,
		label_cursor: 1
	});
}

module.exports = listLabelInteractor;