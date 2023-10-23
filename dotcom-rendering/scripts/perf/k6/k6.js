/* eslint-disable -- k6 script */
import { check } from 'k6';
import { SharedArray } from 'k6/data';
import http from 'k6/http';

const jsonPayload = new SharedArray('jsonPayload', function () {
	const f = JSON.parse(open('./article-nier-automata.json'));
	return [f];
});

export const options = {
	vus: 10,
	duration: '60s',
};

export default function () {
	const response = http.post(
		`http://localhost:3031/Article`,
		JSON.stringify(jsonPayload[0]),
		{ headers: { 'Content-type': 'application/json' } },
	);
	check(response, {
		'is status 200': (r) => r.status === 200,
	});
}
