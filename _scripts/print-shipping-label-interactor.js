function printShippingLabelInteractor(data, config, args, ext, cb){
	var err;
	
	

	var menu_obj = {menu_items: [
			{link: '/shipping-information', value: 'Shipping Information'},
			{link: '/create-shipping-label', value: 'Create Shipping Label'},
			{link: '/print-shipping-label', value: 'Print Shipping Label', active: 'active', sr: '<span class="sr-only">(current)</span>'}
	]};
	return cb(null, {
		token_obj: {token_id: 't1', public_token: 'k1', private_token: 'l1'}, 
		menu_items: menu_obj.menu_items
	});
}

module.exports = printShippingLabelInteractor;