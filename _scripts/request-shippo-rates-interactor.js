function requestShippoRatesInteractor(data, config, args, ext, cb){
	if(config.SHIPPO_KEY===null){
		return cb('this route cannot be used unless on the deploy branch');
	} else {
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
		}, function(err, shipment_obj){
	    if (err) return cb('err: ', err);
	    var menu_obj = {menu_items: [
				{link: '/shipping-information', value: 'Shipping Information'},
				{link: '/create-shipping-label', value: 'Create Shipping Label', active: 'active', sr: '<span class="sr-only">(current)</span>'},
				{link: '/print-shipping-label', value: 'Print Shipping Label'}
			]};
			return cb(null, {
				shipment_obj: shipment_obj, 
				menu_items: menu_obj.menu_items
			}); 
		});
	}
}

module.exports = requestShippoRatesInteractor;