const decidePublicPath = () => {
	const isDev = process.env.NODE_ENV === 'development';
	if (isDev && window.location.hostname === 'localhost') {
		return 'http://localhost:3030/assets/';
	} else if (
		window.location.hostname === (process.env.HOSTNAME ?? 'localhost')
	) {
		return '/assets/';
	} else {
		return `${window.guardian.config.frontendAssetsFullURL}assets/`;
	}
};

// allows us to define public path dynamically
// dynamic imports will use this as the base to find their assets
// https://webpack.js.org/guides/public-path/#on-the-fly
__webpack_public_path__ = decidePublicPath();
