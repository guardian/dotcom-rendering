import type { PutMetricDataInput } from '@aws-sdk/client-cloudwatch';
import {
	CloudWatchClient,
	PutMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';

interface Metric {
	send: () => void;
}

process.env.AWS_PROFILE = 'frontend';

const cloudWatchClient = new CloudWatchClient({ region: 'eu-west-1' });

// how frequently we send metrics to aws in ms
const METRICS_TIME_RESOLUTION = 60 * 1000;

const sendMetric = (m: any[]) => {
	if (m.length === 0) {
		return;
	}

	const params: PutMetricDataInput = {
		MetricData: m,
		Namespace: 'Application',
	};

	const command = new PutMetricDataCommand(params);

	cloudWatchClient.send(command, (err: any) => {
		if (err) {
			// `err` is typed as `any` in the library:
			// https://github.com/aws/aws-sdk-js-v3/blob/main/packages/smithy-client/src/client.ts#L41-L43
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			console.error(err, err.stack);
		}
	});
};

// handles sending matrics to AWS

const collectAndSendAWSMetrics = (...metrics: Metric[]): void => {
	setInterval(() => {
		for (const m of metrics) m.send();
	}, METRICS_TIME_RESOLUTION);
};

// to record memory or file sizes

const BytesMetric = (
	app: string,
	stage: string,
	metricName: string,
): { record: (n: number) => void; send: () => void } => {
	const values: number[] = [];

	return {
		record: (n: number) => {
			values.push(n);
		},

		send: () => {
			sendMetric(
				values.map((v) => ({
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

export { collectAndSendAWSMetrics, BytesMetric };
