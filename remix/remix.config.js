/** @type {import('@remix-run/dev').AppConfig} */
const basePath = '/dcr-test';
export default {
	devServerBroadcastDelay: 5000,
	ignoredRouteFiles: ['**/.*'],
	serverConditions: ['worker'],
	serverDependenciesToBundle: 'all',
	serverMainFields: ['browser', 'module', 'main'],
	serverMinify: true,
	serverModuleFormat: 'esm',
	serverPlatform: 'neutral',
	// appDirectory: "app",
	// assetsBuildDirectory: "public/build",
	// serverBuildPath: "build/index.js",
	// publicPath: "/build/",
	publicPath: `${basePath}/build/`,
	assetsBuildDirectory: `public${basePath}/build`,
};
