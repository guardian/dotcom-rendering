import { check } from 'k6';
import http from 'k6/http';

const URL = __ENV.URL;
const PAYLOAD_FILE = __ENV.PAYLOAD;
const payload = open(PAYLOAD_FILE);

console.log(`URL is ${URL}`);
console.log(`PAYLOAD_FILE is ${PAYLOAD_FILE}`);
