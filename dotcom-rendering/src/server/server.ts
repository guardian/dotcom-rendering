import { devServer } from './server.dev';
import { prodServer } from './server.prod';

// this export is expected by webpack-hot-server-middleware
// not used in prod
// eslint-disable-next-line import/no-default-export -- it is what Webpack wants
export default devServer;

// this is the actual production server
if (process.env.NODE_ENV === 'production') {
	prodServer();
}

//
