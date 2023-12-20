import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import { devServer } from './server.dev';
import { prodServer } from './server.prod';

// this export is expected by webpack-hot-server-middleware
// not used in prod
// eslint-disable-next-line import/no-default-export -- it is what Webpack wants
export default devServer;

// this is the actual production server
if (process.env.NODE_ENV === 'production') {
	const totalCPUs = availableParallelism();
	if (cluster.isPrimary) {
		// eslint-disable-next-line no-console -- testing
		console.log(`Number of CPUs is ${totalCPUs}`);
		// eslint-disable-next-line no-console -- testing
		console.log(`Primary ${process.pid} is running`);

		for (let i = 0; i < totalCPUs; i++) {
			cluster.fork();
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
