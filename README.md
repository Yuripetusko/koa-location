# koa-location
Koa middleware getting location information about client via user's IP.

### Install
---
Install with [npm](https://npmjs.org)

```
$ npm install koa-location --save
```

### Usage

This module works detects the location of client by requests to following providers:
- https://freegeoip.net/
- https://ipapi.co/

Example of the object you will get with location information
```javasscript
{
 code: "BG",
 country: "Bulgaria",
 region: "Burgas",
 city: "Burgas"
}
```

##### Example without auto detecting of location

```javascript
var Koa = require('koa');
var app = new Koa();
var location = require('koa-location');

app.use(location());

app.use(async (ctx, next) => {
	await ctx.request.detect();
	ctx.body = 'Ce Kavo';
	console.log(ctx.request.locationData); // => getting the location info
});

var port = 8000;
app.listen(port, ()=> {
	console.log('Сервер работает на порту ' + port);
});
```

##### Example with auto detecting of location
```javascript
var Koa = require('koa');
var app = new Koa();
var location = require('koa-location');

app.use(location({
	autoDetect: true
}));

app.use(async (ctx, next) => {
	ctx.body = 'Ce Kavo';
	console.log(ctx.request.locationData);  // => getting the location info
});

var port = 8000;
app.listen(port, ()=> {
	console.log('Сервер работает на порту ' + port);
});
```

If you not set to **true** the **autoDetect** option you need for calling additionaly the **detect()** function of the request object.

By default, **autoDetect** is **false**.

###### Support for FreeUlrs when **autoDetect** is **true**

When **autoDetect** is **true**, the detecting of location will not runs.

```javascript
var Koa = require('koa');
var app = new Koa();
var location = require('koa-location');

app.use(location({
	autoDetect: true,
	freeUrls: ['/', '/cekavo','/hello']
}));

app.use(async(ctx, next) => {
	ctx.body = 'Ce Kavo';
	// detecing will runs if request url is not included in the array of free urls
	console.log(ctx.request.locationData); 
});

var port = 8000;
app.listen(port, () => {
	console.log('Сервер работает на порту ' + port);
});
```
