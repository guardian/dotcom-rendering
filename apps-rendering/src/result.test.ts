// ----- Imports ----- //

import { withDefault } from './option';
import { andThen, either, err, map, mapError, ok, toOption } from './result';
import type { Result } from './result';

// ----- Setup ----- //

const identity = <A>(a: A): A => a;
const pipe2 = <A, B, C>(a: A, f: (_a: A) => B, g: (_b: B) => C): C => g(f(a));

const mockOk: Result<string, number> = ok(4);
const mockErr: Result<string, number> = err('message');

const onOk = (a: number): number => a + 2;
const onError = (e: string): string => `Output: ${e}`;

// ----- Tests ----- //

describe('either', () => {
	it('runs the correct function when Result is Ok', () => {
		expect(
			either<string, number, number | string>(onError, onOk)(mockOk),
		).toBe(6);
	});

	it('runs the correct function when Result is Err', () => {
		expect(
			either<string, number, number | string>(onError, onOk)(mockErr),
		).toBe('Output: message');
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
				map((a: number) => `Output: ${a}`),
				either(identity, identity),
			),
		).toBe('message');
	});
});

describe('andThen', () => {
	it('runs the function and unwraps the result when both Results are Ok', () => {
		const f = (a: number): Result<string, number> => ok(a + 2);

		expect(
			pipe2(
				mockOk,
				andThen(f),
				either<string, number, string | number>(identity, identity),
			),
		).toBe(6);
	});

	it('passes through the Err when the first Result is Err', () => {
		const f = (a: number): Result<string, number> => ok(a + 2);

		expect(
			pipe2(
				mockErr,
				andThen(f),
				either<string, number, string | number>(identity, identity),
			),
		).toBe('message');
	});

	it('passes through the Err when the second Result is Err', () => {
		const f = (): Result<string, number> => err('message');

		expect(
			pipe2(
				mockOk,
				andThen(f),
				either<string, number, string | number>(identity, identity),
			),
		).toBe('message');
	});

	it('passes through the first Err when the first Result is Err', () => {
		const f = (): Result<string, number> => err('secondMessage');

		expect(
			pipe2(
				mockErr,
				andThen(f),
				either<string, number, string | number>(identity, identity),
			),
		).toBe('message');
	});
});

describe('mapError', () => {
	it('passes through the result when Result is Ok', () => {
		expect(
			pipe2(
				mockOk,
				mapError(onError),
				either<string, number, string | number>(identity, identity),
			),
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
