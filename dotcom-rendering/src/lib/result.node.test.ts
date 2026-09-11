import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { literal, safeParse } from 'valibot';
import { error, fromValibot, ok, type Result } from './result';

void nodeDescribe('ok', () => {
	void nodeIt('creates an instance of Ok', () => {
		const result = ok(3);
		const value = result.getOrThrow('Expected an Ok');

		assert.equal(result.ok, true);
		assert.equal(value, 3);
	});
});

void nodeDescribe('error', () => {
	void nodeIt('creates an instance of Err', () => {
		const result = error('An error');
		const err = result.getErrorOrThrow('Expected an Err');

		assert.equal(result.ok, false);
		assert.equal(err, 'An error');
	});
});

void nodeDescribe('flatMap', () => {
	const f = (a: number): Result<unknown, number> => ok(a + 1);
	const h = (): Result<string, number> => error('h error');

	void nodeIt(
		'runs the function and unwraps the result when both Results are Ok',
		() => {
			const result = ok(3).flatMap(f);
			const value = result.getOrThrow('Expected an Ok');

			assert.equal(result.ok, true);
			assert.equal(value, 4);
		},
	);

	void nodeIt('passes through the Err when the first Result is Err', () => {
		const result = error<string, number>('error message').flatMap(f);
		const err = result.getErrorOrThrow('Expected an Err');

		assert.equal(result.ok, false);
		assert.equal(err, 'error message');
	});

	void nodeIt('passes through the Err when the second Result is Err', () => {
		const result = ok(3).flatMap(h);
		const err = result.getErrorOrThrow('Expected an Err');

		assert.equal(result.ok, false);
		assert.equal(err, 'h error');
	});

	void nodeIt('passes through the first Err when both are Err', () => {
		const result = error<string, number>('error message').flatMap(h);
		const err = result.getErrorOrThrow('Expected an Err');

		assert.equal(result.ok, false);
		assert.equal(err, 'error message');
	});

	void nodeIt('obeys left identity law', () => {
		const value = 3;

		assert.deepEqual(ok(value).flatMap(f), f(value));
	});

	void nodeIt('obeys right identity law', () => {
		const result = ok(3);

		assert.deepEqual(result.flatMap(ok), result);
	});

	void nodeIt('obeys associativity law', () => {
		const result = ok(3);
		const g = (a: number): Result<unknown, number> => ok(a * 3);

		assert.deepEqual(
			result.flatMap(f).flatMap(g),
			result.flatMap((a) => f(a).flatMap(g)),
		);
	});
});

void nodeDescribe('map', () => {
	const f = (a: number): number => a + 1;

	void nodeIt('runs the function when Result is Ok', () => {
		const result = ok(3).map(f);
		const value = result.getOrThrow('Expected an Ok');

		assert.equal(result.ok, true);
		assert.equal(value, 4);
	});

	void nodeIt('passes the error through when Result is Err', () => {
		const result = error<string, number>('error message').map(f);
		const err = result.getErrorOrThrow('Expected an Err');

		assert.equal(result.ok, false);
		assert.equal(err, 'error message');
	});

	void nodeIt('obeys identity', () => {
		const identity = <A>(a: A): A => a;
		const value = 3;
		const result = ok(value);

		assert.deepEqual(result.map(identity), result);
	});

	void nodeIt('obeys composition', () => {
		const g = (a: number): number => a * 3;
		const result = ok(3);

		assert.deepEqual(
			result.map(f).map(g),
			result.map((a) => g(f(a))),
		);
	});
});

void nodeDescribe('mapError', () => {
	const f = (err: string): string => `An error: ${err}`;

	void nodeIt('produces a new error if Err', () => {
		const err = error('error details');

		assert.deepEqual(err.mapError(f), error('An error: error details'));
	});

	void nodeIt('does nothing if Ok', () => {
		const result = ok<string, number>(3);

		assert.deepEqual(result.mapError(f), result);
	});
});

void nodeDescribe('getOrThrow', () => {
	void nodeIt('gets the value if Ok', () => {
		const value = ok(3).getOrThrow('Expected an Ok');

		assert.equal(value, 3);
	});

	void nodeIt('throws if Err', () => {
		const result = error('An error');

		assert.throws(
			() => result.getOrThrow('Expected an Ok'),
			/Expected an Ok/,
		);
	});
});

void nodeDescribe('getErrorOrThrow', () => {
	void nodeIt('gets the value if Err', () => {
		const err = error('An error').getErrorOrThrow('Expected an Err');

		assert.equal(err, 'An error');
	});

	void nodeIt('throws if Ok', () => {
		const result = ok(3);

		assert.throws(
			() => result.getErrorOrThrow('Expected an Err'),
			/Expected an Err/,
		);
	});
});

void nodeDescribe('fromValibot', () => {
	const schema = literal('string literal');

	void nodeIt('creates an Ok from a successful parse result', () => {
		const valibotResult = safeParse(schema, 'string literal');

		const result = fromValibot(valibotResult);
		const value = result.getOrThrow('Expected an Ok');

		assert.equal(value, 'string literal');
	});

	void nodeIt('creates an Err from an unsuccessful parse result', () => {
		const valibotResult = safeParse(schema, 'invalid literal');

		const result = fromValibot(valibotResult);
		const err = result.getErrorOrThrow('Expected an Err');

		assert.equal(err[0].expected, '"string literal"');
	});
});
