import { devServer } from './server.dev';
import { initTracing } from './lib/tracing';
import { prodServer } from './server.prod';

// this export is expected by webpack-hot-server-middleware
// not used in prod

export default devServer;

// this is the actual production server
if (process.env.NODE_ENV === 'production') {
	initTracing();
	prodServer();
}
