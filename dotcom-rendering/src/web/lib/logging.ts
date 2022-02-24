import fetch from 'node-fetch';

type Field<T> = Array<{ name: string; value: T }>;

const prepare = <T extends string | number>(
	obj?: Record<string, T>,
): Field<T> | undefined =>
	obj && Object.entries(obj).map(([name, value]) => ({ name, value }));

/**
 * Record a log. Runs server-side.
 * Can be inspected via BigQuery for further analysis.
 * Ensure data protection is involved if capturing
 * any personally identifiable information (PII).
 *
 * ## Good candidate for @guardian/libs
 *
 * @param options.properties Textual values to record.
 * @param options.metrics Numeric values to record.
 */
const recordLog = ({
	label,
	isDev,
	properties,
	metrics,
}: {
	label: string;
	isDev: boolean;
	properties?: Record<string, string>;
	metrics?: Record<string, number>;
}) => {
	const data: {
		label: string;
		properties?: Field<string>;
		metrics?: Field<number>;
	} = {
		label,
		properties: prepare(properties),
		metrics: prepare(metrics),
	};

	const endpoint = isDev
		? 'https://logs.guardianapis.com/log'
		: 'https://logs.code.dev-guardianapis.com/log';

	// eslint-disable-next-line no-void
	void fetch(endpoint, {
		method: 'POST',
		body: JSON.stringify(data),
	});
};
export { recordLog };
