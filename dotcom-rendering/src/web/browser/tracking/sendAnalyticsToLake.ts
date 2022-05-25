// THIS IS TO BE PROMOTED TO LIBS
// SEE https://github.com/guardian/libs/pull/323

/** Nominal data */
type Properties = Record<string, string>;
/** Numerical data */
type Metrics = Record<string, number>;

type Flatten<R extends Record<string, string | number>> = Array<{
	name: keyof R;
	value: R[keyof R];
}>;

/** This turns an object’s key-value pairs into an array objects
 * with `name` and `value` keys.
 *
 * @example
 * ({
 *   label: 'libs',
 *   network: 'wifi',
 * }) => [
 *   {
 *		name: 'label',
 *		value: 'libs',
 *   },
 *		name: 'network',
 *		value: 'wifi',
 *   },
 * ]
 */
const flatten = <Value extends string | number>(obj: Record<string, Value>) =>
	Object.entries(obj).map(([name, value]) => ({
		name,
		value,
	}));

type Payload = {
	label: string;
	properties: Flatten<Properties>;
	metrics: Flatten<Metrics>;
};

const generateJSONPayload = (
	label: string,
	properties: Properties,
	metrics: Metrics,
): string => {
	const payload: Payload = {
		label,
		properties: flatten(properties),
		metrics: flatten(metrics),
	};

	return JSON.stringify(payload);
};

/** Helper method to get default logging endpoints */
const getLoggingEndpoint = (
	isDev: boolean,
): `https://logs.${string}guardianapis.com/log` =>
	isDev
		? 'https://logs.code.dev-guardianapis.com/log'
		: 'https://logs.guardianapis.com/log';

type Data = {
	label: string;
	endpoint: string;
	metrics?: Metrics;
	properties?: Properties;
};

/**
 * Record log to our Data Lake.
 * ⚠️ Make sure we have consent for collecting this data.
 * If in doubt, reach out to [@guardian/transparency-consent](https://github.com/orgs/guardian/teams/transparency-consent)
 *
 * Send nominal and numerical data:
 * - Nominal datum is of type `string`
 * - Numerical datum is of type `number`
 *
 * @param {Data} options The data to send
 * @param {string} options.label Used to identify the data (in BigQuery)
 * @param {string} options.endpoint The endpoint to send the data to.
 * @param {Properties} [options.properties] Nominal data. Defaults to an empty object.
 * @param {Metrics} [options.metrics] Numerical data. Defaults to an empty object.
 * @returns {boolean} Whether sending the data has been successfully queued.
 */
export const recordLog = ({
	label,
	endpoint,
	properties = {},
	metrics = {},
}: Data): boolean => {
	if (typeof label !== 'string' || label.trim() === '') return false;
	if (!endpoint) return false;

	const body = generateJSONPayload(label, properties, metrics);

	if ('sendBeacon' in navigator) {
		return navigator.sendBeacon(
			endpoint,
			generateJSONPayload(label, properties, metrics),
		);
	}

	try {
		void fetch(endpoint, {
			body,
		});
		return true;
	} catch (e) {
		return false;
	}
};

export { getLoggingEndpoint };
