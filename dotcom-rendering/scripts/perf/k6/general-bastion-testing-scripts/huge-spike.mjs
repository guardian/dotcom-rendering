import { check } from 'k6';
import http from 'k6/http';

const URL = __ENV.URL;
const PAYLOAD_FILE = __ENV.PAYLOAD;
const payload = open(PAYLOAD_FILE);

// eslint-disable-next-line import/no-default-export -- k6 requires a default export
export default function () {
	const response = http.post(URL, payload, {
		headers: {
			'Content-type': 'application/json',
			'X-Gu-Target-Group': 'ecs', //valid options are ecs and ec2
		},
	});
	check(response, {
		'is status 200': (r) => r.status === 200,
	});
}

/** @type {import('k6/options').Options} */
export const options = {
	scenarios: {
		baseline_traffic: {
			executor: 'constant-arrival-rate',
			rate: 1300,
			timeUnit: '1m',
			duration: '11m',
			preAllocatedVUs: 30,
			maxVUs: 100,
		},
		spike: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '3s', target: 5000 },
				{ duration: '3s', target: 0 },
			],
			timeUnit: '1s',
			startTime: '1m',
			preAllocatedVUs: 50,
			maxVUs: 100,
		},
	},
	thresholds: {
		'http_req_duration{expected_response:true}': ['p(99)<500'],
		'http_req_duration{expected_response:true,scenario:baseline_traffic}': [
			'p(99)<500',
		],
		'http_req_duration{expected_response:true,scenario:spike}': [
			'p(99)<1000',
		],
		http_req_failed: ['rate==0'],
		'http_req_failed{scenario:baseline_traffic}': ['rate==0'],
		'http_req_failed{scenario:spike}': ['rate==0'],
	},
	insecureSkipTLSVerify: true,
};
