function receivePostData (req, cb){
	post_str = '';
	req.setEncoding = 'utf8';
	req.on('data', function(chunk){
		post_str += chunk;
	});
	req.on('end', function(){
		//post_str = post_str.replace(/%5B(\d+)%5D/g, "[$1]");
		post_str = post_str.replace(/\+/g, " ");
		var post_obj = {};
		if(post_str == ''){
			return cb('no post data');
		} else if (post_str.indexOf('=')>0){
			try {
				
				var post_arr = post_str.split('&');
				
				
				
				post_arr.map((item)=>{
					var parse = item.split('=');
					
					post_obj[parse[0]] = parse[1];
				});
				console.log('hang C, post_obj: ', post_obj);
				return cb(null, post_obj);
			} catch(e) {
				console.log(e);
				return cb(e)
			} finally {
				//console.log('this should work');
			}
		} else {
			try {
				//has post_str bean created by JSON.stringify(obj)?
	    	post_obj = JSON.parse(post_str);
				return cb(null, post_obj);
	    } catch (e) {
	        return cb(e)
	    }
		}
	});
}

module.exports = receivePostData;