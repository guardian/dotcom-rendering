// ----- Imports ----- //

import {
	identity,
	isElement,
	toArray,
	memoise,
	errorToString,
	isObject,
} from './lib';

// ----- Tests ----- //

describe('identity', () => {
	it('returns the same value that it was given', () => {
		expect(identity(2)).toBe(2);
		expect(identity('hello world')).toBe('hello world');
		expect(identity({ foo: 'bar' })).toEqual({ foo: 'bar' });
	});
});

describe('isElement', () => {
	it('returns true for element nodes', () => {
		['div', 'p', 'img'].forEach((descriptor) => {
			const el = document.createElement(descriptor);
			expect(isElement(el)).toBe(true);
		});
	});

	it('returns false for text nodes', () => {
		const textNode = document.createTextNode('Some text');
		expect(isElement(textNode)).toBe(false);
	});

	it('returns false for document fragments', () => {
		const frag = document.createDocumentFragment();
		expect(isElement(frag)).toBe(false);
	});

	it('returns false for attribute nodes', () => {
		const attributeNode = document.createAttribute('test-attrib');
		expect(isElement(attributeNode)).toBe(false);
	});
});

describe('toArray', () => {
	it('turns a value into an array of that value', () => {
		expect(toArray(1)).toStrictEqual([1]);
		expect(toArray('some string')).toStrictEqual(['some string']);
		expect(toArray([1])).toStrictEqual([[1]]);
		expect(toArray(null)).toStrictEqual([null]);
		expect(toArray(undefined)).toStrictEqual([undefined]);
	});
});

describe('memoise', () => {
	it('always returns the same value', () => {
		const mockValue = 'a value';
		const mockFn = jest.fn(() => mockValue);

		const fn = memoise(mockFn);
		const firstCall = fn();
		const secondCall = fn();

		expect(firstCall).toEqual(mockValue);
		expect(secondCall).toEqual(mockValue);
	});

	it('only calls the memoised function once', () => {
		const mockValue = 'a value';
		const mockFn = jest.fn(() => mockValue);

		const fn = memoise(mockFn);
		fn();
		fn();
		fn();
		expect(mockFn).toBeCalledTimes(1);
	});
});

describe('errorToString', () => {
	const message = 'An error message';
	const fallback = 'A fallback message';

	it('returns the Error message string', () => {
		const err = new Error(message);
		expect(errorToString(err, fallback)).toBe(`Error: ${message}`);
	});

	it(`returns the object's toString`, () => {
		const o1 = new Object();
		const o2 = { toString: () => message };
		expect(errorToString(o1, fallback)).toBe('[object Object]');
		expect(errorToString(o2, fallback)).toBe(message);
	});

	it('returns a fallback when no error or object provided', () => {
		expect(errorToString('1', fallback)).toBe(fallback);
		expect(errorToString(1, fallback)).toBe(fallback);
		expect(errorToString(null, fallback)).toBe(fallback);
		expect(errorToString(undefined, fallback)).toBe(fallback);
		expect(errorToString([], fallback)).toBe(fallback);
	});
});

describe('isObject', () => {
	const nonObjects = [
		null,
		undefined,
		false,
		0,
		NaN,
		'',
		true,
		1,
		'a',
		Symbol('a'),
	];

	test.each(nonObjects)('returns false for %p', (...[nonObject]) =>
		expect(isObject(nonObject)).toBe(false),
	);

	const objects = [
		[1, 2, 3],
		Object(false),
		new Date(),
		new Error(),
		{ a: 1 },
		Object(0),
		/x/,
		Object('a'),
		document.body,
	];

	test.each(objects)(`returns true for '%p'}`, (...[obj]) =>
		expect(isObject(obj)).toBe(true),
	);
});
