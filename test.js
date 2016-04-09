import test from 'ava';
import pwaManifest from './';
import osTmpdir from 'os-tmpdir';
import deepEqual from 'deep-equal';

const tmpdir = osTmpdir();
const opts = {
	name: 'My PWApp',
	short_name: 'My Short PWA Name',
	start_url: '/main.html?homescreen=1',
	display: 'standalone',
	background_color: '#EFEFEF',
	theme_color: 'FFEEFF'
};

function isIconProp(icon, src, size) {
	return icon.src === src && icon.sizes === `${size}x${size}`;
}

test('generate a manifest', t => {
	return pwaManifest(opts).then(manifest => {
		t.is(manifest.name, opts.name);
		t.is(manifest.short_name, 'My Short PWA');
		t.is(manifest.icons.length, 8);
		t.ok(isIconProp(manifest.icons[0], 'icon-72x72.png', 72));
		t.ok(isIconProp(manifest.icons[1], 'icon-96x96.png', 96));
		t.ok(isIconProp(manifest.icons[2], 'icon-128x128.png', 128));
		t.ok(isIconProp(manifest.icons[3], 'ms-touch-icon-144x144-precomposed.png', 144));
		t.ok(isIconProp(manifest.icons[4], 'apple-touch-icon-152x152.png', 152));
		t.ok(isIconProp(manifest.icons[5], 'chrome-touch-icon-192x192.png', 192));
		t.ok(isIconProp(manifest.icons[6], 'chrome-splashscreen-icon-384x384.png', 384));
		t.ok(isIconProp(manifest.icons[7], 'icon-512x512.png', 512));
		t.is(manifest.start_url, opts.start_url);
		t.is(manifest.background_color, opts.background_color);
		t.is(manifest.theme_color, opts.theme_color);
	});
});

test('generate a manifest with the name assigning from pkg', t => {
	return pwaManifest({}).then(manifest => {
		t.is(manifest.name, 'pwa-manifest');
		t.is(manifest.short_name, 'pwa-manifest');
	});
});

test('read a manifest', t => {
	return pwaManifest(opts).then(manifest => {
		return pwaManifest.write(tmpdir, manifest).then(() => {
			return pwaManifest.read(tmpdir).then(loadManifest => {
				t.ok(deepEqual(manifest, loadManifest));
			});
		});
	});
});
