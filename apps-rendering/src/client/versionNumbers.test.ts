// ----- Imports ----- //
import { isSameOrLaterVersion } from './versionNumbers';

// ----- Tests ----- //

describe('isSameOrLaterVersion', () => {
	test('returns undefined if either string is invalid', () => {
		expect(isSameOrLaterVersion('1.1.1.1', '1.1.1')).toBe(undefined);
		expect(isSameOrLaterVersion('foo', '1.1.1')).toBe(undefined);
		expect(isSameOrLaterVersion('1.1.1', '...')).toBe(undefined);
		expect(isSameOrLaterVersion('1.1.1', '42')).toBe(undefined);
	});

	test('returns true if the versions are both valid and the same', () => {
		expect(isSameOrLaterVersion('1.1.1', '1.1.1')).toBe(true);
		expect(isSameOrLaterVersion('1.1.2', '1.1.2')).toBe(true);
		expect(isSameOrLaterVersion('4.16.1', '4.16.1')).toBe(true);
		expect(isSameOrLaterVersion('1.1.9', '1.1.9')).toBe(true);
	});

	test('returns true if first version is later', () => {
		expect(isSameOrLaterVersion('5.0.0', '4.45.100')).toBe(true);
		expect(isSameOrLaterVersion('4.87.2', '4.45.100')).toBe(true);
		expect(isSameOrLaterVersion('4.45.101', '4.45.100')).toBe(true);
	});
	test('returns false if first version is earlier', () => {
		expect(isSameOrLaterVersion('3.87.101', '4.45.100')).toBe(false);
		expect(isSameOrLaterVersion('4.40.101', '4.45.100')).toBe(false);
		expect(isSameOrLaterVersion('4.45.99', '4.45.100')).toBe(false);
	});
});
