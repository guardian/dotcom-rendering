import { check } from 'k6';
import { SharedArray } from 'k6/data';
import http from 'k6/http';

export const runk6 = (payloadFile, path) => {
	/** @type {import('k6/data').SharedArray} */
	const jsonPayload = new SharedArray('jsonPayload', function () {
		const f = JSON.parse(open(payloadFile));
		return [f];
	});

	const config = new SharedArray('configPayload', function () {
		const f = JSON.parse(open('./config.json'));
		return [f];
	});

	return {
		/** @type {import('k6/options').Options} */
		options: {
			vus: 10,
			duration: config[0].duration,
			insecureSkipTLSVerify: true,
		},
		run: () => {
			const response = http.post(
				`${config[0].domain}/${path}`,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- k6 api
				JSON.stringify(jsonPayload[0]),
				{ headers: { 'Content-type': 'application/json' } },
			);
			check(response, {
				'is status 200': (r) => r.status === 200,
			});
		},
	};
};
