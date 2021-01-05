// allows us to define public path dynamically
// dynamic imports will use this as the base to find their assets
// https://webpack.js.org/guides/public-path/#on-the-fly
// eslint-disable-next-line @typescript-eslint/camelcase
__webpack_public_path__ =
	window.location.hostname === 'localhost'
		? '/assets/'
		: `${window.guardian.app.data.CAPI.config.frontendAssetsFullURL}assets/`;
