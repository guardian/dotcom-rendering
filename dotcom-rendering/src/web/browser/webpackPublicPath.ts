// allows us to define public path dynamically
// dynamic imports will use this as the base to find their assets
// https://webpack.js.org/guides/public-path/#on-the-fly
__webpack_public_path__ =
	window.location.hostname === (process.env.HOSTNAME || 'localhost')
		? '/assets/'
		: `${window.guardian.config.frontendAssetsFullURL}assets/`;
