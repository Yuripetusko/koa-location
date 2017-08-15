var Koa = require('koa');
var app = new Koa();
//app.proxy = true;

var middleware = require('./lib');

app.use(middleware({
	autoDetect: true
}));

app.use(async (ctx, next) => {
	ctx.body = 'Ce Kavo';
	//await ctx.request.detect();
	//console.log(ctx.request.headers['x-forwarded-for']);
	console.log(ctx.request.locationData);
});

var port = 8000;
app.listen(port, ()=> {
	console.log('Сервер работает на порту ' + port);
});