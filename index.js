'use strict';

const oassign = require('object-assign');
const path = require('path');
const writeJSON = require('write-json-file');
const loadJSON = require('load-json-file');
const readPkgUp = require('read-pkg-up');
const isCssVal = function (v) {
	return require('is-css-color-hex')(v) || require('is-css-color-name')(v);
};

const MEMBERS_VALUES = {
	dir: ['ltr', 'rtl', 'auto'],
	icons: ['72', '96', '128', '144', '152', '192', '384', '512'],
	displays: ['fullscreen', 'standalone', 'minimal-ui', 'browser'],
	orientation: [
		'any', 'natural', 'landscape', 'landscape-primary',
		'landscape-secondary', 'portrait', 'portrait-primary',
		'portrait-secondary'
	]
};

function existMemberValue(m, v) {
	return MEMBERS_VALUES[m] && MEMBERS_VALUES[m].indexOf(v) >= 0;
}

function MemberError(m, v) {
	this.name = 'OptionsError';
	this.message = m + ' option has an invalid value: ' + v;
	this.stack = (new Error()).stack;
}

MemberError.prototype = Object.create(Error.prototype);
MemberError.prototype.constructor = MemberError;

function validators(validator) {
	var p = new Promise(function (resolve, reject) {
		const res = validator();
		if (res instanceof Error) {
			reject(res);
		} else {
			resolve(res);
		}
	});

	return p;
}

function shortize(name) {
	return name.slice(0, 12);
}

function manifestDir(dir) {
	return path.join(dir, 'manifest.json');
}

module.exports = function (opts) {
	const manifest = require('./assets/manifest.json');

	opts = oassign({}, opts);

	var v = validators(() => {
		if (opts.background_color && !isCssVal(opts.background_color)) {
			return new MemberError('background_color', opts.background_color);
		}
	}).then(() => {
		if (opts.theme_color && !isCssVal(opts.theme_color)) {
			return new MemberError('theme_color', opts.theme_color);
		}
	}).then(() => {
		if (opts.dir && !existMemberValue('dir', opts.dir)) {
			return new MemberError('dir', opts.dir);
		}
	}).then(() => {
		if (opts.display && !existMemberValue('display', opts.display)) {
			return new MemberError('display', opts.display);
		}
	}).then(() => {
		if (opts.orientation && !existMemberValue('orientation', opts.orientation)) {
			return new MemberError('orientation', opts.orientation);
		}
	}).then(() => {
		return readPkgUp();
	}).then(res => {
		if (!opts.name && res.pkg) {
			opts.name = res.pkg.name;
			opts.short_name = res.pkg.name;
		}

		oassign(manifest, opts);
		manifest.short_name = shortize(manifest.short_name);

		return manifest;
	});

	return v;
};

module.exports.write = function (dir, manifest) {
	return writeJSON(manifestDir(dir), JSON.stringify(manifest));
};

module.exports.write.sync = function (dir, manifest) {
	return writeJSON.sync(manifestDir(dir), JSON.stringify(manifest));
};

module.exports.read = function (dir) {
	return loadJSON(manifestDir(dir)).then(manifest => JSON.parse(manifest));
};

module.exports.read.sync = function (dir) {
	return JSON.parse(loadJSON.sync(manifestDir(dir)));
};
