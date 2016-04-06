'use strict';

const oassign = require('object-assign');
const path = require('path');
const fs = require('fs');
const isUrl = require('is-url-superb');
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

module.exports = function (opts) {
	const manifest = require('./assets/manifest.json');

	oassign({}, opts);

	var v = validators(function () {
		if (!opts.name) {
			const pkg = require(path.join(process.cwd, 'pakcage.json'));
			if (pkg && pkg.name) {
				opts.name = pkg.name;
				opts.short_name = pkg.name;
			}
		}
	}).then(function () {
		if (opts.start_url && !isUrl(opts.start_url)) {
			return new MemberError('start_url', opts.start_url);
		}
	}).then(function () {
		if (opts.background_color && !isCssVal(opts.background_color)) {
			return new MemberError('background_color', opts.background_color);
		}
	}).then(function () {
		if (opts.theme_color && !isCssVal(opts.theme_color)) {
			return new MemberError('theme_color', opts.theme_color);
		}
	}).then(function () {
		if (opts.dir && !existMemberValue('dir', opts.dir)) {
			return new MemberError('dir', opts.dir);
		}
	}).then(function () {
		if (opts.display && !existMemberValue('display', opts.display)) {
			return new MemberError('display', opts.display);
		}
	}).then(function () {
		if (opts.orientation && !existMemberValue('orientation', opts.orientation)) {
			return new MemberError('orientation', opts.orientation);
		}
	}).then(function () {
		oassign(manifest, opts);

		manifest.short_name = shortize(manifest.short_name);

		return manifest;
	});

	return v;
};

module.exports.write = function (dest, manifest) {
	const data = JSON.stringify(manifest);
	return fs.writeFileSync(path.join(dest, 'manifest.json'), data, 'utf8');
};

module.exports.read = function (src) {
	const data = fs.readFileSync(path.join(src, 'manifest.json'), 'utf8');
	return JSON.parse(data);
};
