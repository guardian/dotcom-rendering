import { check } from 'k6';
import http from 'k6/http';

export default function () {
	const response = http.get(
		`http://localhost:9000/Article/https://theguardian.com/games/2018/aug/23/nier-automata-yoko-taro-interview`,
	);
	check(response, {
		'is status 200': (r) => r.status === 200,
	});
}

export const options = {
	vus: 5,
	duration: '10s',
};
