/*
 * Copyright Fastly, Inc.
 * Licensed under the MIT license. See LICENSE file for details.
 */

/** @type {import('@fastly/compute-js-static-publish').StaticPublisherConfig} */
export default {
	rootDir: './',
	staticContentRootDir: './static-publisher',
	excludeDirs: ['./node_modules'],
	moduleAssetInclusionTest: function (path) {
		if (path.startsWith('/build/') && !path.endsWith('.map')) {
			return 'static-import';
		}
		return false;
	},
	contentAssetInclusionTest: function (path) {
		if (path.startsWith('/public/')) {
			return true;
		}
		return false;
	},
	server: {
		// publicDirPrefix: '/public/dcr-test',
		publicDirPrefix: '/public',
	},
};
