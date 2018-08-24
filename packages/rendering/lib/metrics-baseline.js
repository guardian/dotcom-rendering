// @flow

import os from 'os';
import disk from 'diskusage';
import { BytesMetric, Collector } from './aws-metrics';

const maxHeapMemory = BytesMetric('rendering', 'PROD', 'max-heap-memory');
const freeDiskSpace = BytesMetric('rendering', 'PROD', 'free-disk-memory');
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

Collector(
    maxHeapMemory,
    usedHeapMemory,
    totalPhysicalMemory,
    freePhysicalMemory,
    freeDiskSpace,
);

// records system metrics

const recordBaselineCloudWatchMetrics = function recordBaselineCloudWatchMetrics() {
    disk.check('/', (err, diskinfo) => {
        if (err) {
            console.error(err);
        } else {
            maxHeapMemory.record(process.memoryUsage().heapTotal);
            usedHeapMemory.record(process.memoryUsage().heapUsed);
            totalPhysicalMemory.record(os.totalmem());
            freePhysicalMemory.record(os.freemem());
            freeDiskSpace.record(diskinfo.free);
        }
    });
};

export default recordBaselineCloudWatchMetrics;
