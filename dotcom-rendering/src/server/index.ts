import { devServer } from './dev-server';
import { prodServer } from './prod-server';

// this export is expected by webpack-hot-server-middleware
// not used in prod
export default devServer;

// this is the actual production server
if (process.env.NODE_ENV === 'production') {
	prodServer();
}
