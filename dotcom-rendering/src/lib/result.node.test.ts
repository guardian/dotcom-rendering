import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { literal, safeParse } from 'valibot';
import { error, fromValibot, ok, type Result } from './result';

void describe('ok', () => {
	void it('creates an instance of Ok', () => {
		const result = ok(3);
		const value = result.getOrThrow('Expected an Ok');

		assert.equal(result.ok, true);
		assert.equal(value, 3);
	});
});

void describe('error', () => {
	void it('creates an instance of Err', () => {
		const result = error('An error');
		const err = result.getErrorOrThrow('Expected an Err');

		assert.equal(result.ok, false);
		assert.equal(err, 'An error');
	});
});

void describe('flatMap', () => {
	const f = (a: number): Result<unknown, number> => ok(a + 1);
	const h = (): Result<string, number> => error('h error');

	void it('runs the function and unwraps the result when both Results are Ok', () => {
		const result = ok(3).flatMap(f);
		const value = result.getOrThrow('Expected an Ok');

		assert.equal(result.ok, true);
		assert.equal(value, 4);
	});

	void it('passes through the Err when the first Result is Err', () => {
		const result = error<string, number>('error message').flatMap(f);
		const err = result.getErrorOrThrow('Expected an Err');

		assert.equal(result.ok, false);
		assert.equal(err, 'error message');
	});

	void it('passes through the Err when the second Result is Err', () => {
		const result = ok(3).flatMap(h);
		const err = result.getErrorOrThrow('Expected an Err');

		assert.equal(result.ok, false);
		assert.equal(err, 'h error');
	});

	void it('passes through the first Err when both are Err', () => {
		const result = error<string, number>('error message').flatMap(h);
		const err = result.getErrorOrThrow('Expected an Err');

		assert.equal(result.ok, false);
		assert.equal(err, 'error message');
	});

	void it('obeys left identity law', () => {
		const value = 3;

		assert.deepEqual(ok(value).flatMap(f), f(value));
	});

	void it('obeys right identity law', () => {
		const result = ok(3);

		assert.deepEqual(result.flatMap(ok), result);
	});

	void it('obeys associativity law', () => {
		const result = ok(3);
		const g = (a: number): Result<unknown, number> => ok(a * 3);

		assert.deepEqual(
			result.flatMap(f).flatMap(g),
			result.flatMap((a) => f(a).flatMap(g)),
		);
	});
});

void describe('map', () => {
	const f = (a: number): number => a + 1;

	void it('runs the function when Result is Ok', () => {
		const result = ok(3).map(f);
		const value = result.getOrThrow('Expected an Ok');

		assert.equal(result.ok, true);
		assert.equal(value, 4);
	});

	void it('passes the error through when Result is Err', () => {
		const result = error<string, number>('error message').map(f);
		const err = result.getErrorOrThrow('Expected an Err');

		assert.equal(result.ok, false);
		assert.equal(err, 'error message');
	});

	void it('obeys identity', () => {
		const identity = <A>(a: A): A => a;
		const value = 3;
		const result = ok(value);

		assert.deepEqual(result.map(identity), result);
	});

	void it('obeys composition', () => {
		const g = (a: number): number => a * 3;
		const result = ok(3);

		assert.deepEqual(
			result.map(f).map(g),
			result.map((a) => g(f(a))),
		);
	});
});

void describe('mapError', () => {
	const f = (err: string): string => `An error: ${err}`;

	void it('produces a new error if Err', () => {
		const err = error('error details');

		assert.deepEqual(err.mapError(f), error('An error: error details'));
	});

	void it('does nothing if Ok', () => {
		const result = ok<string, number>(3);

		assert.deepEqual(result.mapError(f), result);
	});
});

void describe('getOrThrow', () => {
	void it('gets the value if Ok', () => {
		const value = ok(3).getOrThrow('Expected an Ok');

		assert.equal(value, 3);
	});

	void it('throws if Err', () => {
		const result = error('An error');

		assert.throws(
			() => result.getOrThrow('Expected an Ok'),
			/Expected an Ok/,
		);
	});
});

void describe('getErrorOrThrow', () => {
	void it('gets the value if Err', () => {
		const err = error('An error').getErrorOrThrow('Expected an Err');

		assert.equal(err, 'An error');
	});

	void it('throws if Ok', () => {
		const result = ok(3);

		assert.throws(
			() => result.getErrorOrThrow('Expected an Err'),
			/Expected an Err/,
		);
	});
});

void describe('fromValibot', () => {
	const schema = literal('string literal');

	void it('creates an Ok from a successful parse result', () => {
		const valibotResult = safeParse(schema, 'string literal');

		const result = fromValibot(valibotResult);
		const value = result.getOrThrow('Expected an Ok');

		assert.equal(value, 'string literal');
	});

	void it('creates an Err from an unsuccessful parse result', () => {
		const valibotResult = safeParse(schema, 'invalid literal');

		const result = fromValibot(valibotResult);
		const err = result.getErrorOrThrow('Expected an Err');

		assert.equal(err[0].expected, '"string literal"');
	});
});
