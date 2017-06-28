import test from 'ava';
import osTmpdir from 'os-tmpdir';
import deepEqual from 'deep-equal';
import pwaManifest from './';

const tmpdir = osTmpdir();
const opts = {
	name: 'My PWApp',
	short_name: 'My Short PWA Name',
	start_url: '/main.html?homescreen=1',
	display: 'standalone',
	background_color: '#EFEFEF',
	theme_color: '#FFEEFF'
};

function isIconProp(icon, src, size) {
	return icon.src === src && icon.sizes === `${size}x${size}`;
}

test('generate a manifest', async t => {
	await pwaManifest(opts).then(manifest => {
		t.is(manifest.name, opts.name);
		t.is(manifest.short_name, 'My Short PWA');
		t.is(manifest.icons.length, 3);
		t.true(isIconProp(manifest.icons[0], 'icon-144x144.png', 144));
		t.true(isIconProp(manifest.icons[1], 'icon-192x192.png', 192));
		t.true(isIconProp(manifest.icons[2], 'icon-512x512.png', 512));
		t.is(manifest.start_url, opts.start_url);
		t.is(manifest.background_color, opts.background_color);
		t.is(manifest.theme_color, opts.theme_color);
	});
});

test('generate a manifest with the name assigning from pkg', async t => {
	await pwaManifest({}).then(manifest => {
		t.is(manifest.name, '@pwa/manifest');
		t.is(manifest.short_name, '@pwa/manifes');
	});
});

test('read a manifest', async t => {
	const manifest = await pwaManifest(opts);
	await pwaManifest.write(tmpdir, manifest);
	const loadManifest = await pwaManifest.read(tmpdir);
	t.true(deepEqual(manifest, loadManifest));
});
