var iplocation = require('iplocation');

async function detect() {
	let ipHeader = this.headers['x-forwarded-for'];
	let ip = ipHeader.split(',')[0] || this.ip || '127.0.0.1';
	let info = await iplocation(ip);
	let locationData = {
		code: info.country_code,
		country: info.country_name,
		region: info.region_name,
		city: info.city
	};

	this.locationData = locationData;
	return locationData;
}

module.exports = function(options) {
	options = options || {};
	let autoDetect = options.autoDetect || false;

	return async function(ctx, next) {
		ctx.request.detect = detect;
		if (autoDetect) await ctx.request.detect();
		await next();
	}
}