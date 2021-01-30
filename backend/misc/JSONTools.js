

	const create_JSON_Object = () => {
		return JSON.parse('{}');
	}

	const add_JSON_Object = (JSON_OBJ,JSON_key,JSON_value) => {
		let str_JSON = JSON.stringify(JSON_OBJ);
		str_JSON = str_JSON.substring(0,str_JSON.length - 1);
		JSON_key.forEach( (value,index) => {
			str_JSON += `\"${value}\":\"${JSON_value[index]}\",`;
		});
		str_JSON = str_JSON.substring(0,str_JSON.length -1) + " }"


		console.log(str_JSON)
		return JSON.parse(str_JSON);

	}

exports.add_JSON_Object = add_JSON_Object;
exports.create_JSON_Object = create_JSON_Object;
