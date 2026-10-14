import { check } from 'k6';
import http from 'k6/http';

const URL = `https://tag-page-rendering.code.dev-guardianapis.com/TagPage`;
const payload = open('minutebyminute.json'); // curl -s "https://www.theguardian.com/tone/minutebyminute.json?dcr=true" -o minutebyminute.json

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
			duration: '5m',
			preAllocatedVUs: 30,
			maxVUs: 100,
		},
		spike_1: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '5s', target: 5000 },
				{ duration: '5s', target: 5000 },
				{ duration: '10s', target: 0 },
			],
			timeUnit: '1m',
			startTime: '1m',
			preAllocatedVUs: 100,
			maxVUs: 300,
		},
		spike_2: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '5s', target: 5000 },
				{ duration: '5s', target: 5000 },
				{ duration: '10s', target: 0 },
			],
			timeUnit: '1m',
			startTime: '2m',
			preAllocatedVUs: 100,
			maxVUs: 300,
		},
		spike_3: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '5s', target: 5000 },
				{ duration: '5s', target: 5000 },
				{ duration: '10s', target: 0 },
			],
			timeUnit: '1m',
			startTime: '3m',
			preAllocatedVUs: 100,
			maxVUs: 300,
		},
		spike_4: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '5s', target: 5000 },
				{ duration: '5s', target: 5000 },
				{ duration: '10s', target: 0 },
			],
			timeUnit: '1m',
			startTime: '4m',
			preAllocatedVUs: 100,
			maxVUs: 300,
		},
		spike_5: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '5s', target: 5000 },
				{ duration: '5s', target: 5000 },
				{ duration: '10s', target: 0 },
			],
			timeUnit: '1m',
			startTime: '5m',
			preAllocatedVUs: 100,
			maxVUs: 300,
		},
	},
	thresholds: {
		'http_req_duration{expected_response:true}': ['p(99)<500'],
		'http_req_duration{expected_response:true,scenario:baseline_traffic}': [
			'p(99)<500',
		],
		'http_req_duration{expected_response:true,scenario:spike_1}': [
			'p(99)<1000',
		],
		'http_req_duration{expected_response:true,scenario:spike_2}': [
			'p(99)<1000',
		],
		'http_req_duration{expected_response:true,scenario:spike_3}': [
			'p(99)<1000',
		],
		'http_req_duration{expected_response:true,scenario:spike_4}': [
			'p(99)<1000',
		],
		'http_req_duration{expected_response:true,scenario:spike_5}': [
			'p(99)<1000',
		],
		http_req_failed: ['rate==0'],
		'http_req_failed{scenario:baseline_traffic}': ['rate==0'],
		'http_req_failed{scenario:spike_1}': ['rate==0'],
		'http_req_failed{scenario:spike_2}': ['rate==0'],
		'http_req_failed{scenario:spike_3}': ['rate==0'],
		'http_req_failed{scenario:spike_4}': ['rate==0'],
		'http_req_failed{scenario:spike_5}': ['rate==0'],
	},
	insecureSkipTLSVerify: true,
};
