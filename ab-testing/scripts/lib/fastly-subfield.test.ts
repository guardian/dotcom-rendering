import {
	assertEquals,
	assertThrows,
} from 'https://deno.land/std@0.208.0/assert/mod.ts';
import {
	stringifyFastlySubfield,
	parseFastlySubfield,
	parseMVTValue,
	stringifyMVTValue,
} from './fastly-subfield.ts';
import { AUDIENCE_SPACES } from './constants.ts';
import { FastlyTestParams } from './types.ts';

Deno.test('stringifyFastlySubfield', async (t) => {
	await t.step('should stringify object with string values', () => {
		const obj = { key1: 'value1', key2: 'value2' };
		const result = stringifyFastlySubfield(obj);
		assertEquals(result, 'key1=value1,key2=value2');
	});

	await t.step('should stringify object with number values', () => {
		const obj = { count: 42, percentage: 75 };
		const result = stringifyFastlySubfield(obj);
		assertEquals(result, 'count=42,percentage=75');
	});

	await t.step(
		'should stringify object with mixed string and number values',
		() => {
			const obj = { name: 'test', value: 123 };
			const result = stringifyFastlySubfield(obj);
			assertEquals(result, 'name=test,value=123');
		},
	);

	await t.step('should handle empty object', () => {
		const obj = {};
		const result = stringifyFastlySubfield(obj);
		assertEquals(result, '');
	});

	await t.step('should handle single key-value pair', () => {
		const obj = { single: 'value' };
		const result = stringifyFastlySubfield(obj);
		assertEquals(result, 'single=value');
	});

	await t.step('should throw error for values containing commas', () => {
		const obj = { invalid: 'a,b,c' };
		assertThrows(
			() => stringifyFastlySubfield(obj),
			Error,
			'Value "a,b,c" contains invalid character: comma (,)',
		);
	});

	await t.step(
		'should throw error for values containing more than one colon',
		() => {
			const obj = { invalid: 'http://example.com:control' };
			assertThrows(
				() => stringifyFastlySubfield(obj),
				Error,
				'Value "http://example.com:control" contains invalid character: colon (:)',
			);
		},
	);
});

Deno.test('parseFastlySubfield', async (t) => {
	await t.step('should parse string with string values', () => {
		const str = 'key1=value1,key2=value2';
		const result = parseFastlySubfield(str);
		assertEquals(result, { key1: 'value1', key2: 'value2' });
	});

	await t.step('should parse string with number values', () => {
		const str = 'count=42,percentage=75';
		const result = parseFastlySubfield(str);
		assertEquals(result, { count: 42, percentage: 75 });
	});

	await t.step(
		'should parse string with mixed string and number values',
		() => {
			const str = 'name=test,value=123';
			const result = parseFastlySubfield(str);
			assertEquals(result, { name: 'test', value: 123 });
		},
	);

	await t.step('should handle empty string', () => {
		const str = '';
		const result = parseFastlySubfield(str);
		assertEquals(result, {});
	});

	await t.step('should handle single key-value pair', () => {
		const str = 'single=value';
		const result = parseFastlySubfield(str);
		assertEquals(result, { single: 'value' });
	});

	await t.step('should handle malformed pairs gracefully', () => {
		const str = 'key1=value1,malformed,key2=value2';
		const result = parseFastlySubfield(str);
		assertEquals(result, { key1: 'value1', key2: 'value2' });
	});

	await t.step('should handle pairs without value', () => {
		const str = 'key1=,key2=value2';
		const result = parseFastlySubfield(str);
		assertEquals(result, { key2: 'value2' });
	});

	await t.step('should handle pairs without key', () => {
		const str = '=value1,key2=value2';
		const result = parseFastlySubfield(str);
		assertEquals(result, { key2: 'value2' });
	});

	await t.step('should parse decimal numbers as numbers', () => {
		const str = 'float=3.14,integer=42';
		const result = parseFastlySubfield(str);
		assertEquals(result, { float: 3.14, integer: 42 });
	});

	await t.step('should keep non-numeric strings as strings', () => {
		const str = 'alphanumeric=abc123,pure=test';
		const result = parseFastlySubfield(str);
		assertEquals(result, { alphanumeric: 'abc123', pure: 'test' });
	});
});

Deno.test('parseMVTValue', async (t) => {
	await t.step('should parse MVT value string correctly', () => {
		const subfield =
			'group:0=test1,group:0:type=control,group:0:exp=50,group:1=test2,group:1:type=variant,group:1:exp=25,group:2=test3,group:2:type=variant,group:2:exp=75';
		const result = parseMVTValue(subfield);

		assertEquals(result.length, AUDIENCE_SPACES.length);
		assertEquals(result[0], { name: 'test1', type: 'control', exp: 50 });
		assertEquals(result[1], { name: 'test2', type: 'variant', exp: 25 });
		assertEquals(result[2], { name: 'test3', type: 'variant', exp: 75 });
	});

	await t.step(
		'should handle missing values by converting to string/number',
		() => {
			const subfield = 'group:0=test1,group:1:type=variant';
			const result = parseMVTValue(subfield);

			assertEquals(result.length, AUDIENCE_SPACES.length);
			assertEquals(result[0], {
				name: 'test1',
				type: 'undefined',
				exp: NaN,
			});
			assertEquals(result[1], {
				name: 'undefined',
				type: 'variant',
				exp: NaN,
			});
			assertEquals(result[2], {
				name: 'undefined',
				type: 'undefined',
				exp: NaN,
			});
		},
	);

	await t.step('should handle empty subfield', () => {
		const subfield = '';
		const result = parseMVTValue(subfield);

		assertEquals(result.length, AUDIENCE_SPACES.length);
		result.forEach((item) => {
			assertEquals(item, {
				name: 'undefined',
				type: 'undefined',
				exp: NaN,
			});
		});
	});

	await t.step('should handle numeric group names and experiments', () => {
		const subfield = 'group:0=123,group:0:type=control,group:0:exp=456';
		const result = parseMVTValue(subfield);

		assertEquals(result[0], { name: '123', type: 'control', exp: 456 });
	});
});

Deno.test('stringifyMVTValue', async (t) => {
	await t.step('should stringify MVT value array correctly', () => {
		const array: FastlyTestParams[] = [
			{ name: 'test1', type: 'control', exp: 50 },
			{ name: 'test2', type: 'variant', exp: 25 },
			{ name: 'test3', type: 'variant', exp: 75 },
		];
		const result = stringifyMVTValue(array);

		const expected =
			'group:0=test1,group:0:type=control,group:0:exp=50,group:1=test2,group:1:type=variant,group:1:exp=25,group:2=test3,group:2:type=variant,group:2:exp=75';
		assertEquals(result, expected);
	});

	await t.step('should handle empty array', () => {
		const array: FastlyTestParams[] = [];
		const result = stringifyMVTValue(array);
		assertEquals(result, '');
	});

	await t.step('should handle single item array', () => {
		const array: FastlyTestParams[] = [
			{ name: 'solo', type: 'control', exp: 100 },
		];
		const result = stringifyMVTValue(array);
		assertEquals(
			result,
			'group:0=solo,group:0:type=control,group:0:exp=100',
		);
	});

	await t.step('should convert number experiments to strings', () => {
		const array: FastlyTestParams[] = [
			{ name: 'test', type: 'variant', exp: 42 },
		];
		const result = stringifyMVTValue(array);
		assertEquals(
			result,
			'group:0=test,group:0:type=variant,group:0:exp=42',
		);
	});

	await t.step('should handle special characters in names and types', () => {
		const array: FastlyTestParams[] = [
			{ name: 'test-name_123', type: 'control-variant', exp: 0 },
		];
		const result = stringifyMVTValue(array);
		assertEquals(
			result,
			'group:0=test-name_123,group:0:type=control-variant,group:0:exp=0',
		);
	});

	await t.step('should throw error for test names containing commas', () => {
		const array: FastlyTestParams[] = [
			{ name: 'test,name', type: 'control', exp: 50 },
		];
		assertThrows(
			() => stringifyMVTValue(array),
			Error,
			'Value "test,name" contains invalid character: comma (,)',
		);
	});

	await t.step('should throw error for test types containing colons', () => {
		const array: FastlyTestParams[] = [
			{ name: 'test', type: 'control:variant', exp: 50 },
		];
		assertThrows(
			() => stringifyMVTValue(array),
			Error,
			'Value "control:variant" contains invalid character: colon (:)',
		);
	});
});

Deno.test('round-trip compatibility', async (t) => {
	await t.step(
		'parseFastlySubfield and stringifyFastlySubfield should be inverse operations',
		() => {
			const original = { test: 'value', number: 42, decimal: 3.14 };
			const stringified = stringifyFastlySubfield(original);
			const parsed = parseFastlySubfield(stringified);
			assertEquals(parsed, original);
		},
	);

	await t.step(
		'parseMVTValue and stringifyMVTValue should be inverse operations',
		() => {
			const original: FastlyTestParams[] = [
				{ name: 'control', type: 'control', exp: 50 },
				{ name: 'variant1', type: 'variant', exp: 25 },
				{ name: 'variant2', type: 'variant', exp: 25 },
			];
			const stringified = stringifyMVTValue(original);
			const parsed = parseMVTValue(stringified);
			assertEquals(parsed, original);
		},
	);

	await t.step('should handle edge case with zero values', () => {
		const original: FastlyTestParams[] = [
			{ name: 'test', type: 'control', exp: 0 },
		];
		const stringified = stringifyMVTValue(original);
		const parsed = parseMVTValue(stringified);
		assertEquals(parsed[0], original[0]);
	});

	await t.step('should handle edge case with large numbers', () => {
		const original = { largeNumber: 999999999 };
		const stringified = stringifyFastlySubfield(original);
		const parsed = parseFastlySubfield(stringified);
		assertEquals(parsed, original);
	});
});

Deno.test('edge cases and error conditions', async (t) => {
	await t.step('should handle strings with equals signs in values', () => {
		// This is a limitation of the current implementation
		const str = 'url=http://example.com=test,normal=value';
		const result = parseFastlySubfield(str);
		// The current implementation will only take the first part before =
		assertEquals(result, { url: 'http://example.com', normal: 'value' });
	});

	await t.step('should handle very long strings', () => {
		const longValue = 'a'.repeat(1000);
		const obj = { long: longValue };
		const stringified = stringifyFastlySubfield(obj);
		const parsed = parseFastlySubfield(stringified);
		assertEquals(parsed.long, longValue);
	});

	await t.step('should handle numeric strings that look like numbers', () => {
		const str = 'version=1.0.0,count=007';
		const result = parseFastlySubfield(str);
		assertEquals(result, { version: '1.0.0', count: 7 }); // 007 becomes 7
	});
});
