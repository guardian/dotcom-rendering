// ----- Imports ----- //
import { withDefault } from './option';
import { andThen, either, err, map, mapError, ok, toOption } from './result';
// ----- Setup ----- //
const identity = (a) => a;
const pipe2 = (a, f, g) => g(f(a));
const mockOk = ok(4);
const mockErr = err('message');
const onOk = (a) => a + 2;
const onError = (e) => `Output: ${e}`;
// ----- Tests ----- //
describe('either', () => {
	it('runs the correct function when Result is Ok', () => {
		expect(either(onError, onOk)(mockOk)).toBe(6);
	});
	it('runs the correct function when Result is Err', () => {
		expect(either(onError, onOk)(mockErr)).toBe('Output: message');
	});
});
describe('map', () => {
	it('runs the function when Result is Ok', () => {
		expect(pipe2(mockOk, map(onOk), either(identity, identity))).toBe(6);
	});
	it('passes the error through when Result is Err', () => {
		expect(
			pipe2(
				mockErr,
				map((a) => `Output: ${a}`),
				either(identity, identity),
			),
		).toBe('message');
	});
});
describe('andThen', () => {
	it('runs the function and unwraps the result when both Results are Ok', () => {
		const f = (a) => ok(a + 2);
		expect(pipe2(mockOk, andThen(f), either(identity, identity))).toBe(6);
	});
	it('passes through the Err when the first Result is Err', () => {
		const f = (a) => ok(a + 2);
		expect(pipe2(mockErr, andThen(f), either(identity, identity))).toBe(
			'message',
		);
	});
	it('passes through the Err when the second Result is Err', () => {
		const f = () => err('message');
		expect(pipe2(mockOk, andThen(f), either(identity, identity))).toBe(
			'message',
		);
	});
	it('passes through the first Err when the first Result is Err', () => {
		const f = () => err('secondMessage');
		expect(pipe2(mockErr, andThen(f), either(identity, identity))).toBe(
			'message',
		);
	});
});
describe('mapError', () => {
	it('passes through the result when Result is Ok', () => {
		expect(
			pipe2(mockOk, mapError(onError), either(identity, identity)),
		).toBe(4);
	});
	it('runs the function when Result is Err', () => {
		expect(
			pipe2(mockErr, mapError(onError), either(identity, identity)),
		).toBe('Output: message');
	});
});
describe('toOption', () => {
	it('produces Some when Result is Ok', () => {
		expect(pipe2(mockOk, toOption, withDefault(6))).toBe(4);
	});
	it('produces None when Result is Err', () => {
		expect(pipe2(mockErr, toOption, withDefault(6))).toBe(6);
	});
});
