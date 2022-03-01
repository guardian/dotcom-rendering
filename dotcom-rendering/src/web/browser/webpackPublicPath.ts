// allows us to define public path dynamically
// dynamic imports will use this as the base to find their assets
// https://webpack.js.org/guides/public-path/#on-the-fly
__webpack_public_path__ =
	window.location.hostname ===
	(process.env.DEVELOPMENT_HOSTNAME || 'localhost')
		? '/assets/'
		: `${window.guardian.app.data.CAPI.config.frontendAssetsFullURL}assets/`;
