// ----- Imports ----- //

import { identity, isElement, toArray, memoise } from './lib';

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
