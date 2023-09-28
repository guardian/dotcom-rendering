import { jest } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';

const mockRequiredVersion = '2.1.1';

jest.unstable_mockModule('../../src/lib/bridgetApi', () => ({
	getEnvironmentClient: () => ({
		nativeThriftPackageVersion: async () => {
			return mockRequiredVersion;
		},
	}),
}));

const { useIsBridgetCompatible } = await import('./useIsBridgetCompatible');

describe('useIsBridgetCompatible', () => {
	test.each([
		['1.9.0', true],
		['2.0.0', true],
		['2.0.1', true],
		['2.1.0', true],
		['3.0.0', false],
	])(
		`For version %s, returns %s when required version is ${mockRequiredVersion}`,
		async (minVersion, expected) => {
			const { result } = renderHook(() =>
				useIsBridgetCompatible(minVersion),
			);
			await waitFor(() => {
				expect(result.current).toBe(expected);
			});
		},
	);
});
