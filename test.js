import test from 'ava';
import pwaManifest from './';

var opts = {
	name: 'My PWApp',
	short_name: 'My Short PWA Name',
	start_url: '/index.html?homescreen=1',
	display: 'standalone',
	background_color: '#EFEFEF',
	theme_color: 'FFEEFF'
};

test('generate a manifest', t => {
	return pwaManifest(opts).then(function (manifest) {
		t.ok(manifest);
		console.log(manifest);
	});
});
