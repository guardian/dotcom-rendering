import { log, prompt, warn } from '../../../../scripts/log.js';

if (!['development', 'production'].includes(process.env.NODE_ENV)) {
	warn(`Invalid NODE_ENV value ("${String(process.env.NODE_ENV)}")`);
	prompt('You must set it to "development" or "production", e.g.');
	log('$ NODE_ENV=development yarn webpack');
	process.exit(1);
}

export const mode = process.env.NODE_ENV;
export const isDev = mode === 'development';
export const isProd = mode === 'production';
