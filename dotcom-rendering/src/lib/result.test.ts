import { literal, safeParse } from 'valibot';
import { error, fromValibot, ok, type Result } from './result';

describe('ok', () => {
	it('creates an instance of Ok', () => {
		const result = ok(3);
		const value = result.getOrThrow('Expected an Ok');

		expect(result.ok).toBe(true);
		expect(value).toBe(3);
	});
});

describe('error', () => {
	it('creates an instance of Err', () => {
		const result = error('An error');
		const err = result.getErrorOrThrow('Expected an Err');

		expect(result.ok).toBe(false);
		expect(err).toBe('An error');
	});
});

describe('flatMap', () => {
	const f = (a: number): Result<unknown, number> => ok(a + 1);
	const h = (): Result<string, number> => error('h error');

	it('runs the function and unwraps the result when both Results are Ok', () => {
		const result = ok(3).flatMap(f);
		const value = result.getOrThrow('Expected an Ok');

		expect(result.ok).toBe(true);
		expect(value).toBe(4);
	});

	it('passes through the Err when the first Result is Err', () => {
		const result = error<string, number>('error message').flatMap(f);
		const err = result.getErrorOrThrow('Expected an Err');

		expect(result.ok).toBe(false);
		expect(err).toBe('error message');
	});

	it('passes through the Err when the second Result is Err', () => {
		const result = ok(3).flatMap(h);
		const err = result.getErrorOrThrow('Expected an Err');

		expect(result.ok).toBe(false);
		expect(err).toBe('h error');
	});

	it('passes through the first Err when both are Err', () => {
		const result = error<string, number>('error message').flatMap(h);
		const err = result.getErrorOrThrow('Expected an Err');

		expect(result.ok).toBe(false);
		expect(err).toBe('error message');
	});

	it('obeys left identity law', () => {
		const value = 3;

		expect(ok(value).flatMap(f)).toEqual(f(value));
	});

	it('obeys right identity law', () => {
		const result = ok(3);

		expect(result.flatMap(ok)).toEqual(result);
	});

	it('obeys associativity law', () => {
		const result = ok(3);
		const g = (a: number): Result<unknown, number> => ok(a * 3);

		expect(result.flatMap(f).flatMap(g)).toEqual(
			result.flatMap((a) => f(a).flatMap(g)),
		);
	});
});

describe('map', () => {
	const f = (a: number): number => a + 1;

	it('runs the function when Result is Ok', () => {
		const result = ok(3).map(f);
		const value = result.getOrThrow('Expected an Ok');

		expect(result.ok).toBe(true);
		expect(value).toBe(4);
	});

	it('passes the error through when Result is Err', () => {
		const result = error<string, number>('error message').map(f);
		const err = result.getErrorOrThrow('Expected an Err');

		expect(result.ok).toBe(false);
		expect(err).toBe('error message');
	});

	it('obeys identity', () => {
		const identity = <A>(a: A): A => a;
		const value = 3;
		const result = ok(value);

		expect(result.map(identity)).toEqual(result);
	});

	it('obeys composition', () => {
		const g = (a: number): number => a * 3;
		const result = ok(3);

		expect(result.map(f).map(g)).toEqual(result.map((a) => g(f(a))));
	});
});

describe('mapError', () => {
	const f = (e: string): string => `An error: ${e}`;

	it('produces a new error if Err', () => {
		const err = error('error details');

		expect(err.mapError(f)).toEqual(error('An error: error details'));
	});

	it('does nothing if Ok', () => {
		const result = ok<string, number>(3);

		expect(result.mapError(f)).toEqual(result);
	});
});

describe('getOrThrow', () => {
	it('gets the value if Ok', () => {
		const value = ok(3).getOrThrow('Expected an Ok');

		expect(value).toBe(3);
	});

	it('throws if Err', () => {
		const result = error('An error');

		expect(() => result.getOrThrow('Expected an Ok')).toThrow(
			'Expected an Ok',
		);
	});
});

describe('getErrorOrThrow', () => {
	it('gets the value if Err', () => {
		const err = error('An error').getErrorOrThrow('Expected an Err');

		expect(err).toBe('An error');
	});

	it('throws if Ok', () => {
		const result = ok(3);

		expect(() => result.getErrorOrThrow('Expected an Err')).toThrow(
			'Expected an Err',
		);
	});
});

describe('fromValibot', () => {
	const schema = literal('string literal');

	it('creates an Ok from a successful parse result', () => {
		const valibotResult = safeParse(schema, 'string literal');

		const result = fromValibot(valibotResult);
		const value = result.getOrThrow('Expected an Ok');

		expect(value).toBe('string literal');
	});

	it('creates an Err from an unsuccessful parse result', () => {
		const valibotResult = safeParse(schema, 'invalid literal');

		const result = fromValibot(valibotResult);
		const error = result.getErrorOrThrow('Expected an Err');

		expect(error[0].reason).toBe('type');
		expect(error[0].context).toBe('literal');
	});
});
