
function route(handle,pathname) {
	console.log("route pathname"+pathname);
	if(typeof handle[pathname] === 'function'){
		handle[pathname]();
	}else{
		console.log("no request handler found for "+pathname);
	}
}

exports.route = route;
