import os from 'node:os';
import { BytesMetric, collectAndSendAWSMetrics } from './aws-metrics';

const stage =
	typeof process.env.GU_STAGE === 'string'
		? process.env.GU_STAGE.toUpperCase()
		: 'DEV';

const maxHeapMemory = BytesMetric('rendering', stage, 'max-heap-memory');
const usedHeapMemory = BytesMetric('rendering', stage, 'used-heap-memory');
const freePhysicalMemory = BytesMetric(
	'rendering',
	stage,
	'free-physical-memory',
);
const totalPhysicalMemory = BytesMetric(
	'rendering',
	stage,
	'total-physical-memory',
);

collectAndSendAWSMetrics(
	maxHeapMemory,
	usedHeapMemory,
	totalPhysicalMemory,
	freePhysicalMemory,
);

export const recordBaselineCloudWatchMetrics = (): void => {
	maxHeapMemory.record(process.memoryUsage().heapTotal);
	usedHeapMemory.record(process.memoryUsage().heapUsed);
	totalPhysicalMemory.record(os.totalmem());
	freePhysicalMemory.record(os.freemem());
};
