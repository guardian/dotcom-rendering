import os from 'os';
import { BytesMetric, collectAndSendAWSMetrics } from './aws-metrics';

const maxHeapMemory = BytesMetric('rendering', 'PROD', 'max-heap-memory');
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

collectAndSendAWSMetrics(
	maxHeapMemory,
	usedHeapMemory,
	totalPhysicalMemory,
	freePhysicalMemory,
);

export const recordBaselineCloudWatchMetrics = () => {
	maxHeapMemory.record(process.memoryUsage().heapTotal);
	usedHeapMemory.record(process.memoryUsage().heapUsed);
	totalPhysicalMemory.record(os.totalmem());
	freePhysicalMemory.record(os.freemem());
};
