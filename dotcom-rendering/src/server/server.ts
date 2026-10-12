import { prodServer } from './server.prod';

// Re-export devServer for use by Vite's ssrLoadModule in dev
export { devServer } from './server.dev';

if (process.env.NODE_ENV === 'production') {
	prodServer();
}
