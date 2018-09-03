type Metric = {
    send: () => void,
};

process.env.AWS_PROFILE = 'frontend';

const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-1' });

// how frequently we send metrics to aws in ms
const METRICS_TIME_RESOLUTION = 60 * 1000;

const sendMetric = (m: Array<any>) => {
    if (m.length === 0) {
        return;
    }

    const cloudWatchClient = new AWS.CloudWatch();

    const params = {
        MetricData: m,
        Namespace: 'Application',
    };

    cloudWatchClient.putMetricData(params, err => {
        if (err) {
            console.error(err, err.stack);
        }
    });
};

// handles sending matrics to AWS

const collectAndSendAWSMetrics = function(...metrics: Metric[]) {
    setInterval(() => {
        console.log('Collecting metrics');
        metrics.forEach(m => m.send());
    }, METRICS_TIME_RESOLUTION);
};

// to record things like latency

const TimingMetric = function TimingMetric(
    app: String,
    stage: String,
    metricName: String,
) {
    const values: Array<number> = [];

    return {
        recordDuration: (n: number) => {
            values.push(n);
        },

        send: () => {
            sendMetric(
                values.map(v => ({
                    Dimensions: [
                        {
                            Name: 'ApplicationName',
                            Value: app,
                        },
                        {
                            Name: 'Stage',
                            Value: stage,
                        },
                    ],
                    MetricName: metricName,
                    Unit: 'Milliseconds',
                    Value: v,
                })),
            );

            values.length = 0;
        },
    };
};

// to record memory or file sizes

const BytesMetric = function BytesMetric(
    app: String,
    stage: String,
    metricName: String,
) {
    const values: Array<number> = [];

    return {
        record: (n: number) => {
            values.push(n);
        },

        send: () => {
            sendMetric(
                values.map(v => ({
                    Dimensions: [
                        {
                            Name: 'ApplicationName',
                            Value: app,
                        },
                        {
                            Name: 'Stage',
                            Value: stage,
                        },
                    ],
                    MetricName: metricName,
                    Unit: 'Bytes',
                    Value: v,
                })),
            );

            values.length = 0;
        },
    };
};

module.exports = {
    collectAndSendAWSMetrics,
    BytesMetric,
    TimingMetric,
};
