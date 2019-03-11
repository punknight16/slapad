function generateId(data, name, counter){
	if(counter <= 0) return undefined;
	var universal_id = name+Math.random().toString(32).replace('.', '');
	var index = data.findIndex((item)=>{
		return (item == universal_id);
	});
	if(index==-1){
		data.push(universal_id);
		return universal_id
	} else {
		return generateId(data, name, counter-1)
	}
};

module.exports = generateId;