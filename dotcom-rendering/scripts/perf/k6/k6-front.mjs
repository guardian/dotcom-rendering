import { check } from 'k6';
import { SharedArray } from 'k6/data';
import http from 'k6/http';

// assumes the prod server is running on localhost:9000
const PORT = 9000;

/** @type {import('k6/data').SharedArray} */
const jsonPayload = new SharedArray('jsonPayload', function () {
	// curl theguardian.com/uk.json?dcr to download the json file locally
	const f = JSON.parse(open('./uk.json'));
	return [f];
});

/** @type {import('k6/options').Options} */
export const options = {
	vus: 10,
	duration: '10s',
};

// eslint-disable-next-line import/no-default-export -- k6 requires a default export
export default function () {
	const response = http.post(
		`http://localhost:${PORT}/Front`,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- k6 api
		JSON.stringify(jsonPayload[0]),
		{ headers: { 'Content-type': 'application/json' } },
	);
	check(response, {
		'is status 200': (r) => r.status === 200,
	});
}
