import { check } from 'k6';
import { SharedArray } from 'k6/data';
import http from 'k6/http';

const PORT = 9000;

/** @type {import('k6/data').SharedArray} */
const jsonPayload = new SharedArray('jsonPayload', function () {
	const article = open('./article-nier-automata.json');
	return [article];
});

/** @type {import('k6/options').Options} */
export const options = {
	vus: 50,
	duration: '60s',
	discardResponseBodies: true,
};

// eslint-disable-next-line import/no-default-export -- k6 requires a default export
export default function () {
	const response = http.post(
		`http://localhost:${PORT}/Article`,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- k6 api
		jsonPayload[0],
		{ headers: { 'Content-type': 'application/json' } },
	);
	check(response, {
		'is status 200': (r) => r.status === 200,
	});
}
