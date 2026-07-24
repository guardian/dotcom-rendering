import { check } from 'k6';
import http from 'k6/http';

const URL = `http://localhost:9000/TagPage`;
const payload = open('minutebyminute.json'); // curl -s "https://www.theguardian.com/tone/minutebyminute.json?dcr=true" -o minutebyminute.json

// eslint-disable-next-line import/no-default-export -- k6 requires a default export
export default function () {
	const response = http.post(URL, payload, {
		headers: {
			'Content-type': 'application/json',
			'X-Gu-Target-Group': 'ecs',
		},
	});
	check(response, {
		'is status 200': (r) => r.status === 200,
	});
}

/** @type {import('k6/options').Options} */
export const options = {
	scenarios: {
		warm_up: {
			executor: 'constant-arrival-rate',
			rate: 30,
			timeUnit: '1m',
			duration: '5m',
			preAllocatedVUs: 10,
			maxVUs: 30,
		},
		sustained_100: {
			executor: 'constant-arrival-rate',
			rate: 100,
			timeUnit: '1m',
			duration: '5m',
			startTime: '5m',
			preAllocatedVUs: 10,
			maxVUs: 30,
		},
		sustained_250: {
			executor: 'constant-arrival-rate',
			rate: 250,
			timeUnit: '1m',
			duration: '5m',
			startTime: '10m',
			preAllocatedVUs: 10,
			maxVUs: 30,
		},
		sustained_500: {
			executor: 'constant-arrival-rate',
			rate: 500,
			timeUnit: '1m',
			duration: '5m',
			startTime: '15m',
			preAllocatedVUs: 20,
			maxVUs: 50,
		},
		sustained_750: {
			executor: 'constant-arrival-rate',
			rate: 750,
			timeUnit: '1m',
			duration: '5m',
			startTime: '20m',
			preAllocatedVUs: 30,
			maxVUs: 75,
		},
		sustained_1000: {
			executor: 'constant-arrival-rate',
			rate: 1000,
			timeUnit: '1m',
			duration: '5m',
			startTime: '25m',
			preAllocatedVUs: 40,
			maxVUs: 100,
		},
		saturation: {
			executor: 'constant-vus',
			vus: 1,
			duration: '5m',
			startTime: '30m',
		},
	},
	thresholds: {
		'http_req_duration{expected_response:true}': ['p(99)<300'],
		'http_req_duration{expected_response:true,scenario:warm_up}': [
			'p(99)<300',
		],
		'http_req_duration{expected_response:true,scenario:sustained_100}': [
			'p(99)<300',
		],
		'http_req_duration{expected_response:true,scenario:sustained_250}': [
			'p(99)<300',
		],
		'http_req_duration{expected_response:true,scenario:sustained_500}': [
			'p(99)<300',
		],
		'http_req_duration{expected_response:true,scenario:sustained_750}': [
			'p(99)<300',
		],
		'http_req_duration{expected_response:true,scenario:sustained_1000}': [
			'p(99)<300',
		],
		'http_req_duration{expected_response:true,scenario:saturation}': [
			'p(99)<300',
		],
		http_req_failed: ['rate==0'],
		'http_req_failed{scenario:warm_up}': ['rate==0'],
		'http_req_failed{scenario:sustained_100}': ['rate==0'],
		'http_req_failed{scenario:sustained_250}': ['rate==0'],
		'http_req_failed{scenario:sustained_500}': ['rate==0'],
		'http_req_failed{scenario:sustained_750}': ['rate==0'],
		'http_req_failed{scenario:sustained_1000}': ['rate==0'],
		'http_req_failed{scenario:saturation}': ['rate==0'],
	},
	insecureSkipTLSVerify: true,
};
