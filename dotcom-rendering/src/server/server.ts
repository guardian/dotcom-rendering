import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import { devServer } from './server.dev';
import { prodServer } from './server.prod';

// this is the development server
// this export is expected by webpack-hot-server-middleware
// eslint-disable-next-line import/no-default-export -- it is what Webpack wants
export default devServer;

// this is the production server
if (process.env.NODE_ENV === 'production') {
	const totalCPUs = availableParallelism();
	const totalWorkers = totalCPUs;
	if (cluster.isPrimary) {
		// eslint-disable-next-line no-console -- testing
		console.log(`Number of CPUs is ${totalCPUs}`);
		// eslint-disable-next-line no-console -- testing
		console.log(`Primary ${process.pid} is running`);

		for (let i = 0; i < totalWorkers; i++) {
			cluster.fork({
				// makes process.env.NODE_APP_INSTANCE available to each worker
				// used by log4js to set the field 'thread_name'
				NODE_APP_INSTANCE: i,
			});
		}

		cluster.on('exit', (worker) => {
			// eslint-disable-next-line no-console -- testing
			console.log(
				`worker died with pid: ${worker.process.pid ?? 'unknown pid'}`,
			);
			// eslint-disable-next-line no-console -- testing
			console.log('Forking another worker');
			cluster.fork();
		});
	} else {
		prodServer();
	}
}
