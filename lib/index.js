var iplocation = require('iplocation').default;

async function detect() {
	let ipHeader = this.headers['x-forwarded-for'];
	if (!ipHeader) {
		return null;
	}
	let ip = ipHeader.split(',')[0] || this.ip || '127.0.0.1';
	let info = await iplocation(ip);
	let locationData = {
		code: info.countryCode,
		country: info.country,
		region: info.region,
		city: info.city,
		latitude: info.latitude,
		longitude: info.longitude
	};

	this.location = locationData;
	return locationData;
}

module.exports = function(options) {
	options = options || {};
	let autoDetect = options.autoDetect || false;
	let freeUrls = options.freeUrls || [];

	return async function(ctx, next) {
		ctx.request.detect = detect;
		let url = ctx.request.originalUrl;
		let detectCondition = (autoDetect && !(freeUrls.includes(url)));

		if (detectCondition) await ctx.request.detect();
		await next();
	}
}
