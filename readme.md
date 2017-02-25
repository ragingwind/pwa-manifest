# pwa-manifest [![Build Status](https://travis-ci.org/ragingwind/pwa-manifest.svg?branch=master)](https://travis-ci.org/ragingwind/pwa-manifest)

> Creating a Web Manifest for Progressive Web App with a variety of options


## Install

```
$ npm install --save pwa-manifest
```


## Usage

```js
const pwaManifest = require('pwa-manifest');

pwaManifest({
	name: 'My PWApp',
	short_name: 'My Short PWA Name',
	start_url: '/index.html?homescreen=1',
	display: 'standalone',
	background_color: '#EFEFEF',
	theme_color: 'FFEEFF'
}).then(function (manifest) {
	// dump new generated manifest file if you want
	pwaManifest.write('./', manifest);
});
```


## API

### pwaManifest([options])

#### options

Type: `object`

Web Manifest properties you want to set. The name of options are same as member property of Web Manifest. Icons sizes are followed in [lighthouse audits](https://github.com/GoogleChrome/lighthouse/tree/9f91ab405ca89882f40a71c6aef5dc6dc08543b4/lighthouse-core/audits)
```
{
  "name": "My Powerful Progressive Web App",
  "short_name": "PWApp",
  "icons": [{
    "src": "icon-144x144.png",
    "sizes": "144x144",
    "type": "image/png"
  }, {
    "src": "icon-192x192.png",
    "sizes": "192x192",
    "type": "image/png"
  }, {
    "src": "icon-512x512.png",
    "sizes": "512x512",
    "type": "image/png"
  }],
  "start_url": "/index.html?homescreen=1",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#3F51B5"
}
```

### pwaManifest.write(dir, manifest)

Returns a promise.

### pwaManifest.write.sync(dir, manifest)

Write a manifest file as `manifest.json` to dest path.

### pwaManifest.read(dir)

Returns a promise.

### pwaManifest.read.sync(dir)

Read a manifest file in the name of `manifest.json` to src path

## License

MIT © [Jimmy Moon](http://ragingwind.me)
