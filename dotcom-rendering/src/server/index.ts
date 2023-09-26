import { devServer } from './dev-server';
import { prodServer } from './prod-server';
import cluster from 'node:cluster';
import os from 'node:os';

// this export is expected by webpack-hot-server-middleware
// not used in prod
// eslint-disable-next-line import/no-default-export -- it is what Webpack wants
export default devServer;

// this is the actual production server
if (process.env.NODE_ENV === 'production') {
	if (cluster.isPrimary) {
		for (let i = 0; i < os.cpus().length; i++) {
			cluster.fork();
		}
	} else {
		prodServer();
	}
}
