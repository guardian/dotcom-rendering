/**
 * @jest-environment jsdom
 */

// ----- Imports ----- //

import { none, some } from '../vendor/@guardian/types/index';
import {
	compose,
	errorToString,
	handleErrors,
	identity,
	index,
	isElement,
	isObject,
	maybeRender,
	memoise,
	pipe,
	toArray,
} from './lib';
import 'whatwg-fetch';

// ----- Tests ----- //

describe('compose', () => {
	it('composes two functions correctly', () => {
		type A = string;
		type B = number;
		type C = boolean;

		const a: A = 'a';
		const b: B = 1;
		const c: C = true;

		const g = jest.fn<B, [A]>((a: A): B => b);
		const f = jest.fn<C, [B]>((b: B): C => c);

		const composed = compose(f, g);
		const result = composed(a);
		expect(g).toHaveBeenCalledWith(a);
		expect(f).toHaveBeenCalledWith(b);
		expect(result).toBe(c);
	});
});

describe('pipe', () => {
	type A = number;
	type B = string;

	const a: A = 1;
	const b: B = '1';

	const fn = jest.fn<B, [A]>((a: A): B => b);

	const result = pipe<A, B>(a, fn);

	expect(fn).toHaveBeenCalledWith(a);
	expect(result).toBe(b);
});

describe('pipe', () => {
	type A = number;
	type B = string;
	type C = boolean;

	const a: A = 1;
	const b: B = '1';
	const c = true;

	const f = jest.fn<B, [A]>((a: A): B => b);
	const g = jest.fn<C, [B]>((b: B): C => c);

	const result = pipe<A, B, C>(a, f, g);

	expect(f).toHaveBeenCalledWith(a);
	expect(g).toHaveBeenCalledWith(b);
	expect(result).toBe(c);
});

describe('pipe', () => {
	type A = number;
	type B = string;
	type C = boolean;
	type D = [number, string];

	const a: A = 1;
	const b: B = '1';
	const c: C = true;
	const d: D = [a, b];

	const f = jest.fn<B, [A]>((a: A): B => b);
	const g = jest.fn<C, [B]>((b: B): C => c);
	const h = jest.fn<D, [C]>((c: C): D => d);

	const result = pipe<A, B, C, D>(a, f, g, h);

	expect(f).toHaveBeenCalledWith(a);
	expect(g).toHaveBeenCalledWith(b);
	expect(h).toHaveBeenCalledWith(c);
	expect(result).toBe(d);
});

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
		const o2 = { toString: (): string => message };
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

describe('maybeRender', () => {
	it('renders a react element given `some` value', () => {
		expect(maybeRender(some('a string'), (value) => <>{value}</>))
			.toMatchInlineSnapshot(`
		<React.Fragment>
		  a string
		</React.Fragment>
	`);
	});

	it('returns a react element given `some` value even if it is falsey', () => {
		expect(
			maybeRender(some(null), (value) => <>{value}</>),
		).toMatchInlineSnapshot(`<React.Fragment />`);

		expect(
			maybeRender(some(false), (value) => <>{value}</>),
		).toMatchInlineSnapshot(`<React.Fragment />`);

		expect(
			maybeRender(some(undefined), (value) => <>{value}</>),
		).toMatchInlineSnapshot(`<React.Fragment />`);
		expect(maybeRender(some(''), (value) => <>{value}</>))
			.toMatchInlineSnapshot(`
		<React.Fragment>
		  
		</React.Fragment>
	`);
	});

	it('returns null given a none', () => {
		expect(
			maybeRender(none, (value) => <>{value}</>),
		).toMatchInlineSnapshot(`null`);
	});
});

describe('handleErrors', () => {
	it('returns the response if the status is ok', () => {
		const res = new Response();
		expect(handleErrors(res)).toBe(res);
	});

	it('throws an error if the response is not ok', () => {
		// mock a not ok response
		const res = new Response('', {
			status: 400,
			statusText: 'response error message',
		});
		expect(() => handleErrors(res)).toThrowErrorMatchingInlineSnapshot(
			`"response error message"`,
		);
	});
});

describe('index', () => {
	const value = 'value';
	const arr = [value];

	it('returns a some given an index within the bounds of the array', () => {
		expect(index(0)(arr)).toEqual(some(value));
	});

	it('returns a none given an out of bounds index', () => {
		expect(index(1)(arr)).toEqual(none);
	});
});
