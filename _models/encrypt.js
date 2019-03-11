function encryptPassword(password, pass_secret, crypto, cb){
	const hash = crypto.createHmac('sha256', pass_secret)
   .update(password)
   .digest('hex');
	return cb(null, hash);
}

function compareCreds(cred_data, email, password, pass_secret, crypto, cb){
	var cred_obj = cred_data.find((item)=>{
		return (email==item.email)
	});
	encryptPassword(password, pass_secret, crypto, function(err, hash){
		if(typeof cred_obj === 'undefined'){
			return cb('email not found');
		} else if (cred_obj.password===hash){
			return cb(null, cred_obj.cred_id);
		} else {
			return cb('wrong password');
		}
	});
}

exports.encryptPassword = encryptPassword;
exports.compareCreds = compareCreds;