// ----- Imports ----- //

import { identity } from 'lib';
import { Result } from 'result';

// ----- Setup ----- //

const mockOk: Result<string, number> = Result.ok(4);
const mockErr: Result<string, number> = Result.err('message');

const onOk = (a: number): number => a + 2;
const onError = (e: string): string => `Output: ${e}`;

// ----- Tests ----- //

describe('either', () => {
	it('runs the correct function when Result is Ok', () => {
		expect(mockOk.either<string | number>(onError, onOk)).toBe(6);
	});

	it('runs the correct function when Result is Err', () => {
		expect(mockErr.either<string | number>(onError, onOk)).toBe(
			'Output: message',
		);
	});
});

describe('map', () => {
	it('runs the function when Result is Ok', () => {
		expect(
			mockOk.map(onOk).either<string | number>(identity, identity),
		).toBe(6);
	});

	it('passes the error through when Result is Err', () => {
		expect(
			mockErr
				.map((a: number) => `Output: ${a}`)
				.either(identity, identity),
		).toBe('message');
	});
});

describe('flatMap', () => {
	it('runs the function and unwraps the result when both Results are Ok', () => {
		const f = (a: number): Result<string, number> => Result.ok(a + 2);

		expect(
			mockOk.flatMap(f).either<string | number>(identity, identity),
		).toBe(6);
	});

	it('passes through the Err when the first Result is Err', () => {
		const f = (a: number): Result<string, number> => Result.ok(a + 2);

		expect(
			mockErr.flatMap(f).either<string | number>(identity, identity),
		).toBe('message');
	});

	it('passes through the Err when the second Result is Err', () => {
		const f = (): Result<string, number> => Result.err('message');

		expect(
			mockOk.flatMap(f).either<string | number>(identity, identity),
		).toBe('message');
	});

	it('passes through the first Err when the first Result is Err', () => {
		const f = (): Result<string, number> => Result.err('secondMessage');

		expect(
			mockErr.flatMap(f).either<string | number>(identity, identity),
		).toBe('message');
	});
});

describe('mapError', () => {
	it('passes through the result when Result is Ok', () => {
		expect(
			mockOk
				.mapError(onError)
				.either<string | number>(identity, identity),
		).toBe(4);
	});

	it('runs the function when Result is Err', () => {
		expect(
			mockErr
				.mapError(onError)
				.either<string | number>(identity, identity),
		).toBe('Output: message');
	});
});

describe('toOptional', () => {
	it('produces Some when Result is Ok', () => {
		expect(mockOk.toOptional().withDefault(6)).toBe(4);
	});

	it('produces None when Result is Err', () => {
		expect(mockErr.toOptional().withDefault(6)).toBe(6);
	});
});
