export const BUILD_LEGACY =
	process.env.NODE_ENV === 'production' ||
	process.env.BUILD_LEGACY === 'true';
