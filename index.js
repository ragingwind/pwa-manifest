'use strict';

const oassign = require('object-assign');
const path = require('path');
const writeJSON = require('write-json-file');
const loadJSON = require('load-json-file');
const readPkgUp = require('read-pkg-up');
const isCssColorHex = require('is-css-color-hex');
const isCssColorName = require('is-css-color-name');

function validate(vals, pkg) {
	const presets = {
		dir: ['ltr', 'rtl', 'auto'],
		icons: ['72', '96', '128', '144', '152', '192', '384', '512'],
		display: ['fullscreen', 'standalone', 'minimal-ui', 'browser'],
		orientation: [
			'any', 'natural', 'landscape', 'landscape-primary',
			'landscape-secondary', 'portrait', 'portrait-primary',
			'portrait-secondary'
		]
	};
	const err = m => new Error(m + ' has an invalid value: ' + vals[m]);
	const hasPreset = (m, v) => presets[m].indexOf(v) >= 0;
	const isCssColorVal = v => isCssColorHex(v) || isCssColorName(v);
	const shortize = name => name.slice(0, 12);

	if (vals.display && !hasPreset('display', vals.display)) {
		throw err('display');
	}

	if (vals.orientation && !hasPreset('orientation', vals.orientation)) {
		throw err('orientation');
	}

	if (!vals.name && pkg && pkg.name) {
		vals.name = pkg.name;
		vals.short_name = pkg.name;
	}

	if (vals.short_name) {
		vals.short_name = shortize(vals.short_name);
	}

	if (vals.background_color && !isCssColorVal(vals.background_color)) {
		throw err('background_color');
	}

	if (vals.theme_color && !isCssColorVal(vals.theme_color)) {
		throw err('theme_color');
	}

	if (vals.dir && !hasPreset('dir', vals.dir)) {
		throw err('dir');
	}

	return vals;
}

function manifestDir(dir) {
	return path.join(dir, 'manifest.json');
}

module.exports = function (opts) {
	opts = oassign({}, opts);

	return readPkgUp({}).then(res => {
		opts = validate(opts, res.pkg);
	})
	.then(() => loadJSON(path.join(__dirname, './assets/manifest.json')))
	.then(manifest => {
		oassign(manifest, opts);
		return manifest;
	});
};

module.exports.write = function (dir, manifest) {
	return writeJSON(manifestDir(dir), manifest);
};

module.exports.write.sync = function (dir, manifest) {
	return writeJSON.sync(manifestDir(dir), manifest);
};

module.exports.read = function (dir) {
	return loadJSON(manifestDir(dir));
};

module.exports.read.sync = function (dir) {
	return loadJSON.sync(manifestDir(dir));
};
