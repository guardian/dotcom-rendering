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
			duration: '11m',
			preAllocatedVUs: 30,
			maxVUs: 100,
		},
		spike_1: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '3s', target: 500 },
				{ duration: '3s', target: 0 },
			],
			timeUnit: '1s',
			startTime: '1m',
			preAllocatedVUs: 50,
			maxVUs: 100,
		},
		spike_2: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '3s', target: 500 },
				{ duration: '3s', target: 0 },
			],
			timeUnit: '1s',
			startTime: '2m',
			preAllocatedVUs: 50,
			maxVUs: 100,
		},
		spike_3: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '3s', target: 500 },
				{ duration: '3s', target: 0 },
			],
			timeUnit: '1s',
			startTime: '3m',
			preAllocatedVUs: 50,
			maxVUs: 100,
		},
		spike_4: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '3s', target: 500 },
				{ duration: '3s', target: 0 },
			],
			timeUnit: '1s',
			startTime: '4m',
			preAllocatedVUs: 50,
			maxVUs: 100,
		},
		spike_5: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '3s', target: 500 },
				{ duration: '3s', target: 0 },
			],
			timeUnit: '1s',
			startTime: '5m',
			preAllocatedVUs: 50,
			maxVUs: 100,
		},
		spike_6: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '3s', target: 500 },
				{ duration: '3s', target: 0 },
			],
			timeUnit: '1s',
			startTime: '6m',
			preAllocatedVUs: 50,
			maxVUs: 100,
		},
		spike_7: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '3s', target: 500 },
				{ duration: '3s', target: 0 },
			],
			timeUnit: '1s',
			startTime: '7m',
			preAllocatedVUs: 50,
			maxVUs: 100,
		},
		spike_8: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '3s', target: 500 },
				{ duration: '3s', target: 0 },
			],
			timeUnit: '1s',
			startTime: '8m',
			preAllocatedVUs: 50,
			maxVUs: 100,
		},
		spike_9: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '3s', target: 500 },
				{ duration: '3s', target: 0 },
			],
			timeUnit: '1s',
			startTime: '9m',
			preAllocatedVUs: 50,
			maxVUs: 100,
		},
		spike_10: {
			executor: 'ramping-arrival-rate',
			startRate: 0,
			stages: [
				{ duration: '3s', target: 500 },
				{ duration: '3s', target: 0 },
			],
			timeUnit: '1s',
			startTime: '10m',
			preAllocatedVUs: 50,
			maxVUs: 100,
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
		'http_req_duration{expected_response:true,scenario:spike_6}': [
			'p(99)<1000',
		],
		'http_req_duration{expected_response:true,scenario:spike_7}': [
			'p(99)<1000',
		],
		'http_req_duration{expected_response:true,scenario:spike_8}': [
			'p(99)<1000',
		],
		'http_req_duration{expected_response:true,scenario:spike_9}': [
			'p(99)<1000',
		],
		'http_req_duration{expected_response:true,scenario:spike_10}': [
			'p(99)<1000',
		],
		http_req_failed: ['rate==0'],
		'http_req_failed{scenario:baseline_traffic}': ['rate==0'],
		'http_req_failed{scenario:spike_1}': ['rate==0'],
		'http_req_failed{scenario:spike_2}': ['rate==0'],
		'http_req_failed{scenario:spike_3}': ['rate==0'],
		'http_req_failed{scenario:spike_4}': ['rate==0'],
		'http_req_failed{scenario:spike_5}': ['rate==0'],
		'http_req_failed{scenario:spike_6}': ['rate==0'],
		'http_req_failed{scenario:spike_7}': ['rate==0'],
		'http_req_failed{scenario:spike_8}': ['rate==0'],
		'http_req_failed{scenario:spike_9}': ['rate==0'],
		'http_req_failed{scenario:spike_10}': ['rate==0'],
	},
	insecureSkipTLSVerify: true,
};
