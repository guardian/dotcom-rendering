// ----- Imports ----- //

import { none } from '../vendor/@guardian/types/index';
import { Result } from 'result';
import {
	maybe,
	dateParser,
	fail as parseFail,
	fieldParser,
	indexParser,
	numberParser,
	stringParser,
	parse,
	succeed,
	locationParser,
} from './parser';

// ----- Tests ----- //

describe('parser', () => {
	describe('succeed', () => {
		it('ignores whatever the input is and instead provides a successful parsing result containing `a`', () => {
			const fooParser = succeed('foo');

			const result = parse(fooParser)(42);
			expect(result).toStrictEqual(Result.ok('foo'));
		});
	});

	describe('fail', () => {
		it('ignores whatever the input is and instead provides a failed parsing result containing the error string `e`', () => {
			const fooParser = parseFail('Uh oh!');
			const result = parse(fooParser)(42);

			expect(result).toStrictEqual(Result.err('Uh oh!'));
		});
	});

	describe('parse', () => {
		const json: unknown = JSON.parse('{ "foo": 42 }');

		it('runs the parser over a given input and provides a successful `ok` result', () => {
			const parser = fieldParser('foo', numberParser);
			const result = parse(parser)(json);

			expect(result).toStrictEqual(Result.ok(42));
		});

		it('runs the parser over a given input and provides a failed `err` result', () => {
			const parser = fieldParser('bar', numberParser);
			const result = parse(parser)(json);

			expect(result.isErr()).toBe(true);
		});
	});

	describe('stringParser', () => {
		it('produces a successful parsing result if the input is a string', () => {
			const input: unknown = 'foo';

			const result = parse(stringParser)(input);
			expect(result).toStrictEqual(Result.ok('foo'));
		});

		it('produces a failed parsing result if the input is not a string', () => {
			const inputOne: unknown = 42;
			const resultOne = parse(stringParser)(inputOne);
			expect(resultOne.isErr()).toBe(true);

			const inputTwo: unknown = ['foo', 'bar'];
			const resultTwo = parse(stringParser)(inputTwo);
			expect(resultTwo.isErr()).toBe(true);

			const inputThree: unknown = { foo: 'bar' };
			const resultThree = parse(stringParser)(inputThree);
			expect(resultThree.isErr()).toBe(true);
		});
	});

	describe('numberParser', () => {
		it('produces a successful parsing result if the input is a number', () => {
			const input: unknown = 42;

			const result = parse(numberParser)(input);
			expect(result).toStrictEqual(Result.ok(42));
		});

		it('produces a failed parsing result if the input is not a number', () => {
			const inputOne: unknown = 'foo';
			const resultOne = parse(numberParser)(inputOne);
			expect(resultOne.isErr()).toBe(true);

			const inputTwo: unknown = ['foo', 'bar'];
			const resultTwo = parse(numberParser)(inputTwo);
			expect(resultTwo.isErr()).toBe(true);

			const inputThree: unknown = { foo: 'bar' };
			const resultThree = parse(numberParser)(inputThree);
			expect(resultThree.isErr()).toBe(true);
		});
	});

	describe('dateParser', () => {
		it('produces a successful parsing result if the input can make a valid Date', () => {
			const inputOne: unknown = 42;
			const resultOne = parse(dateParser)(inputOne);
			expect(resultOne).toStrictEqual(Result.ok(new Date(42)));

			const inputTwo: unknown = '1970-01-01T00:00:00.042Z';
			const resultTwo = parse(dateParser)(inputTwo);
			expect(resultTwo).toStrictEqual(
				Result.ok(new Date('1970-01-01T00:00:00.042Z')),
			);

			const inputThree: unknown = new Date(42);
			const resultThree = parse(dateParser)(inputThree);
			expect(resultThree).toStrictEqual(Result.ok(new Date(42)));
		});

		it("produces a failed parsing result if the input can't make a valid Date", () => {
			const inputOne: unknown = 'foo';
			const resultOne = parse(dateParser)(inputOne);
			expect(resultOne.isErr()).toBe(true);

			const inputTwo: unknown = NaN;
			const resultTwo = parse(dateParser)(inputTwo);
			expect(resultTwo.isErr()).toBe(true);

			const inputThree: unknown = ['foo', 'bar'];
			const resultThree = parse(dateParser)(inputThree);
			expect(resultThree.isErr()).toBe(true);

			const inputFour: unknown = { foo: 'bar' };
			const resultFour = parse(dateParser)(inputFour);
			expect(resultFour.isErr()).toBe(true);

			const inputFive: unknown = new Date(NaN);
			const resultFive = parse(dateParser)(inputFive);
			expect(resultFive.isErr()).toBe(true);
		});
	});

	describe('maybe', () => {
		it('produces a successful parse result by making the value handled by a parser optional', () => {
			const json: unknown = JSON.parse('{ "foo": 42 }');

			const parser = maybe(fieldParser('bar', numberParser));
			const result = parse(parser)(json);

			expect(result).toStrictEqual(Result.ok(none));
		});

		it("produces a failed parse result when it doesn't wrap the parser that fails", () => {
			const json: unknown = JSON.parse('{ "foo": 42 }');

			const parser = fieldParser('bar', maybe(numberParser));
			const result = parse(parser)(json);

			expect(result.isErr()).toBe(true);
		});
	});

	describe('fieldParser', () => {
		const json: unknown = JSON.parse('{ "foo": 42 }');

		it('provides a successful parse result if the field exists and the value parses', () => {
			const parser = fieldParser('foo', numberParser);
			const result = parse(parser)(json);

			expect(result).toStrictEqual(Result.ok(42));
		});

		it("provides a failed parse result if the field doesn't exist", () => {
			const parser = fieldParser('bar', numberParser);
			const result = parse(parser)(json);

			expect(result.isErr()).toBe(true);
		});

		it("provides a failed parse result if the value doesn't parse", () => {
			const parser = fieldParser('foo', stringParser);
			const result = parse(parser)(json);

			expect(result.isErr()).toBe(true);
		});
	});

	describe('indexParser', () => {
		const json: unknown = JSON.parse('[41, 42, 43]');

		it('provides a successful parse result if the index exists and the value parses', () => {
			const parser = indexParser(1, numberParser);
			const result = parse(parser)(json);

			expect(result).toStrictEqual(Result.ok(42));
		});

		it("provides a failed parse result if the index doesn't exist", () => {
			const parser = indexParser(7, numberParser);
			const result = parse(parser)(json);

			expect(result.isErr()).toBe(true);
		});

		it("provides a failed parse result if the value doesn't parse", () => {
			const parser = indexParser(1, stringParser);
			const result = parse(parser)(json);

			expect(result.isErr()).toBe(true);
		});
	});

	describe('locationParser', () => {
		const json: unknown = JSON.parse('{ "foo": { "bar": 42 } }');

		it('provides a successful parse result if the location exists and the value parses', () => {
			const parser = locationParser(['foo', 'bar'], numberParser);
			const result = parse(parser)(json);

			expect(result).toStrictEqual(Result.ok(42));
		});

		it('provides a failed parse result if the location does not exist', () => {
			const parser = locationParser(['foo', 'baz'], numberParser);
			const result = parse(parser)(json);

			expect(result.isErr()).toBe(true);
		});

		it('provides a failed parse result if the location is empty and the value is nested', () => {
			const parser = locationParser([], numberParser);
			const result = parse(parser)(json);

			expect(result.isErr()).toBe(true);
		});

		it('provides a successful parse result if the location is empty and the value is not nested', () => {
			const jsonB = 42;
			const parser = locationParser([], numberParser);
			const result = parse(parser)(jsonB);

			expect(result).toStrictEqual(Result.ok(42));
		});
	});
});
