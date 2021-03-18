// TODO re-enable disk space checks after Graviton testing complete (the diskusage module doesn't work on ARM).

import os from 'os';
// import disk from 'diskusage';
import { BytesMetric, collectAndSendAWSMetrics } from './aws-metrics';

const maxHeapMemory = BytesMetric('rendering', 'PROD', 'max-heap-memory');
// const freeDiskSpace = BytesMetric('rendering', 'PROD', 'free-disk-memory');
const usedHeapMemory = BytesMetric('rendering', 'PROD', 'used-heap-memory');
const freePhysicalMemory = BytesMetric(
	'rendering',
	'PROD',
	'free-physical-memory',
);
const totalPhysicalMemory = BytesMetric(
	'rendering',
	'PROD',
	'total-physical-memory',
);

// transmits metrics to AWS

collectAndSendAWSMetrics(
	maxHeapMemory,
	usedHeapMemory,
	totalPhysicalMemory,
	freePhysicalMemory,
	// freeDiskSpace,
);

// records system metrics

export const recordBaselineCloudWatchMetrics = () => {
	// TODO re-enable once ARM testing complete
	// disk.check('/', (err, diskinfo) => {
	// 	if (err) {
	// 		// eslint-disable-next-line no-console
	// 		console.error(err);
	// 	} else {
	// 		maxHeapMemory.record(process.memoryUsage().heapTotal);
	// 		usedHeapMemory.record(process.memoryUsage().heapUsed);
	// 		totalPhysicalMemory.record(os.totalmem());
	// 		freePhysicalMemory.record(os.freemem());
	// 		if (diskinfo) {
	// 			freeDiskSpace.record(diskinfo.free);
	// 		}
	// 	}
	// });

	maxHeapMemory.record(process.memoryUsage().heapTotal);
	usedHeapMemory.record(process.memoryUsage().heapUsed);
	totalPhysicalMemory.record(os.totalmem());
	freePhysicalMemory.record(os.freemem());
};
