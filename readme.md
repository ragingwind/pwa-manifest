# pwa-manifest [![Build Status](https://travis-ci.org/ragingwind/pwa-manifest.svg?branch=master)](https://travis-ci.org/ragingwind/pwa-manifest)

> Create a Web Manifest for Progressive Manifest with a variety of options


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

### pwaManifest(options)

#### options

Type: `object`

Web Manifest properties you want to set. if not, manifest will be generated with default value of members as follow.

```
{
  "name": "My Powerful Progressive Web App",
  "short_name": "PWApp",
  "icons": [{
    "src": "icon-72x72.png",
    "sizes": "72x72",
    "type": "image/png"
  }, {
    "src": "icon-96x96.png",
    "sizes": "96x96",
    "type": "image/png"
  }, {
    "src": "icon-128x128.png",
    "sizes": "128x128",
    "type": "image/png"
  }, {
    "src": "ms-touch-icon-144x144-precomposed.png",
    "sizes": "144x144",
    "type": "image/png"
  }, {
    "src": "apple-touch-icon-152x152.png",
    "sizes": "152x152",
    "type": "image/png"
  }, {
    "src": "chrome-touch-icon-192x192.png",
    "sizes": "192x192",
    "type": "image/png"
  }, {
    "src": "chrome-splashscreen-icon-384x384.png",
    "sizes": "384x384",
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

### pwaManifest.write(destPath, manifest)

Write a manifest file to dest path

### pwaManifest.read(srcPath)

Read a manifest file to dest path

## License

MIT © [Jimmy Moon](http://ragingwind.me)
