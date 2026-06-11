import { ABTests } from './ab-tests';

// Mock @guardian/libs
jest.mock('@guardian/libs', () => ({
	isUndefined: jest.fn((value) => value === undefined),
}));

// Mock window.guardian
const mockGetParticipations = jest.fn();

jest.mock('../../client/abTesting', () => ({
	getABTestParticipations: () => mockGetParticipations(),
}));

describe('ABTests', () => {
	let abTests: ABTests;
	let mockOphanRecord: jest.Mock;
	let mockErrorReporter: jest.Mock;

	beforeEach(() => {
		jest.clearAllMocks();
		mockOphanRecord = jest.fn();
		mockErrorReporter = jest.fn();
	});

	describe('client-side behavior', () => {
		describe('constructor', () => {
			it('should use window.guardian.modules.abTests.getParticipations() when on client', () => {
				const clientParticipations = {
					testC: 'variantC',
					testD: 'variantD',
				};

				mockGetParticipations.mockReturnValue(clientParticipations);

				abTests = new ABTests({
					isServer: false,
				});

				expect(mockGetParticipations).toHaveBeenCalled();
				expect(abTests.getParticipations()).toEqual(
					clientParticipations,
				);
			});
		});

		describe('getParticipations', () => {
			it('should return all tests', () => {
				const combinedParticipations = {
					clientTestA: 'clientVariantA',
					clientTestB: 'clientVariantB',
					serverTestA: 'serverVariantA',
					serverTestB: 'serverVariantB',
				};
				mockGetParticipations.mockReturnValue(combinedParticipations);
				abTests = new ABTests({
					isServer: false,
				});

				expect(abTests.getParticipations()).toEqual(
					combinedParticipations,
				);
			});
		});

		describe('isUserInTest', () => {
			it('should return true when user is in test', () => {
				const participations = {
					clientTestA: 'clientVariantA',
					clientTestB: 'clientVariantB',
					serverTestA: 'serverVariantA',
					serverTestB: 'serverVariantB',
				};
				mockGetParticipations.mockReturnValue(participations);
				abTests = new ABTests({
					isServer: false,
				});

				// Should work for both client and server tests
				expect(abTests.isUserInTest('clientTestA')).toBe(true);
				expect(abTests.isUserInTest('clientTestB')).toBe(true);
				expect(abTests.isUserInTest('serverTestA')).toBe(true);
				expect(abTests.isUserInTest('serverTestB')).toBe(true);
			});

			it('should return false when user is not in test (client-side)', () => {
				const participations = {
					testA: 'variantA',
					testB: 'variantB',
				};
				mockGetParticipations.mockReturnValue(participations);
				abTests = new ABTests({
					isServer: false,
				});

				expect(abTests.isUserInTest('testC')).toBe(false);
				expect(abTests.isUserInTest('nonExistentTest')).toBe(false);
			});

			it('should return false when testId is undefined in client participations', () => {
				const participations = {
					testA: 'variantA',
				};
				mockGetParticipations.mockReturnValue(participations);
				abTests = new ABTests({
					isServer: false,
				});

				expect(abTests.isUserInTest('testB')).toBe(false);
			});
		});

		describe('isUserInTestGroup', () => {
			it('should return true when user is in specified test group (client-side, including both client and server tests)', () => {
				const participations = {
					clientTestA: 'clientVariantA',
					clientTestB: 'clientVariantB',
					clientTestC: 'control',
					serverTestA: 'serverVariantA',
					serverTestB: 'control',
				};
				mockGetParticipations.mockReturnValue(participations);
				abTests = new ABTests({
					isServer: false,
				});

				// Should work for both client and server tests
				expect(
					abTests.isUserInTestGroup('clientTestA', 'clientVariantA'),
				).toBe(true);
				expect(
					abTests.isUserInTestGroup('clientTestB', 'clientVariantB'),
				).toBe(true);
				expect(
					abTests.isUserInTestGroup('clientTestC', 'control'),
				).toBe(true);
				expect(
					abTests.isUserInTestGroup('serverTestA', 'serverVariantA'),
				).toBe(true);
				expect(
					abTests.isUserInTestGroup('serverTestB', 'control'),
				).toBe(true);
			});

			it('should return false when user is not in specified test group (client-side)', () => {
				const participations = {
					testA: 'variantA',
					testB: 'variantB',
					testC: 'control',
				};
				mockGetParticipations.mockReturnValue(participations);
				abTests = new ABTests({
					isServer: false,
				});

				expect(abTests.isUserInTestGroup('testA', 'variantB')).toBe(
					false,
				);
				expect(abTests.isUserInTestGroup('testB', 'control')).toBe(
					false,
				);
				expect(abTests.isUserInTestGroup('testC', 'variantA')).toBe(
					false,
				);
			});

			it('should return false when user is not in test at all (client-side)', () => {
				const participations = {
					testA: 'variantA',
					testB: 'variantB',
				};
				mockGetParticipations.mockReturnValue(participations);
				abTests = new ABTests({
					isServer: false,
				});

				expect(
					abTests.isUserInTestGroup('nonExistentTest', 'variantA'),
				).toBe(false);
			});
		});
	});

	describe('server-side behavior', () => {
		describe('getParticipations', () => {
			it('should return server-side participations', () => {
				const serverSideABTests = {
					serverTestA: 'serverVariantA',
					serverTestB: 'serverVariantB',
				};

				const serverInstance = new ABTests({
					serverSideABTests,
					isServer: true,
				});

				expect(serverInstance.getParticipations()).toEqual(
					serverSideABTests,
				);
			});
		});

		describe('isUserInTest', () => {
			it('should return true when user is in server-side test', () => {
				const serverSideABTests = {
					serverTestA: 'serverVariantA',
					serverTestB: 'serverVariantB',
				};

				const serverInstance = new ABTests({
					serverSideABTests,
					isServer: true,
				});

				expect(serverInstance.isUserInTest('serverTestA')).toBe(true);
				expect(serverInstance.isUserInTest('serverTestB')).toBe(true);
			});

			it('should return false when user is not in server-side test', () => {
				const serverSideABTests = {
					serverTestA: 'serverVariantA',
				};

				const serverInstance = new ABTests({
					serverSideABTests,
					isServer: true,
				});
				expect(serverInstance.isUserInTest('nonExistentTest')).toBe(
					false,
				);
				expect(serverInstance.isUserInTest('serverTestB')).toBe(false);
			});
		});

		describe('isUserInTestGroup', () => {
			it('should return true when user is in specified server-side test group', () => {
				const serverSideABTests = {
					serverTestA: 'serverVariantA',
					serverTestB: 'control',
				};

				const serverInstance = new ABTests({
					serverSideABTests,
					isServer: true,
				});
				expect(
					serverInstance.isUserInTestGroup(
						'serverTestA',
						'serverVariantA',
					),
				).toBe(true);
				expect(
					serverInstance.isUserInTestGroup('serverTestB', 'control'),
				).toBe(true);
			});

			it('should return false when user is not in specified server-side test group', () => {
				const serverSideABTests = {
					serverTestA: 'serverVariantA',
					serverTestB: 'control',
				};

				const serverInstance = new ABTests({
					serverSideABTests,
					isServer: true,
				});

				expect(
					serverInstance.isUserInTestGroup('serverTestA', 'control'),
				).toBe(false);
				expect(
					serverInstance.isUserInTestGroup(
						'serverTestB',
						'serverVariantA',
					),
				).toBe(false);
			});

			it('should return false when user is not in server-side test at all', () => {
				const serverSideABTests = {
					serverTestA: 'serverVariantA',
				};

				const serverInstance = new ABTests({
					serverSideABTests,
					isServer: true,
				});
				expect(
					serverInstance.isUserInTestGroup(
						'nonExistentTest',
						'anyVariant',
					),
				).toBe(false);
			});
		});
	});

	describe('trackABTests', () => {
		beforeEach(() => {
			const participations = {
				testA: 'variantA',
				testB: 'variantB',
			};
			mockGetParticipations.mockReturnValue(participations);
			abTests = new ABTests({ isServer: false });
		});

		it('should call ophanRecord with correct payload', () => {
			abTests.trackABTests(mockOphanRecord, mockErrorReporter);

			expect(mockOphanRecord).toHaveBeenCalledWith({
				abTestRegister: {
					testA: {
						variantName: 'variantA',
						complete: false,
					},
					testB: {
						variantName: 'variantB',
						complete: false,
					},
				},
			});
			expect(mockErrorReporter).not.toHaveBeenCalled();
		});

		it('should handle empty participations', () => {
			mockGetParticipations.mockReturnValue({});
			abTests = new ABTests({ isServer: false });

			abTests.trackABTests(mockOphanRecord, mockErrorReporter);

			expect(mockOphanRecord).toHaveBeenCalledWith({
				abTestRegister: {},
			});
			expect(mockErrorReporter).not.toHaveBeenCalled();
		});
	});

	describe('buildOphanPayload', () => {
		beforeEach(() => {
			const participations = {
				testA: 'variantA',
				testB: 'variantB',
			};
			mockGetParticipations.mockReturnValue(participations);
			abTests = new ABTests({ isServer: false });
		});

		it('should handle errors and call errorReporter', () => {
			// Mock Object.entries to throw an error
			const originalEntries = Object.entries;
			Object.entries = jest.fn(() => {
				throw new Error('Test error');
			});

			abTests.trackABTests(mockOphanRecord, mockErrorReporter);

			expect(mockErrorReporter).toHaveBeenCalledWith(
				new Error('Test error'),
			);
			expect(mockOphanRecord).toHaveBeenCalledWith({
				abTestRegister: {},
			});

			// Restore Object.entries
			Object.entries = originalEntries;
		});

		it('should return empty object when error occurs', () => {
			// Mock participations to have a property that will cause Object.entries to fail
			const participationsWithError = {
				get testA() {
					throw new Error('Test error');
				},
			};
			mockGetParticipations.mockReturnValue(participationsWithError);
			abTests = new ABTests({ isServer: false });

			abTests.trackABTests(mockOphanRecord, mockErrorReporter);

			expect(mockErrorReporter).toHaveBeenCalledWith(
				new Error('Test error'),
			);
			expect(mockOphanRecord).toHaveBeenCalledWith({
				abTestRegister: {},
			});
		});
	});

	describe('integration tests', () => {
		it('should work end-to-end with typical usage (client-side with both client and server tests)', () => {
			const participations = {
				// Client-side tests
				'header-experiment': 'variant',
				'footer-test': 'control',
				'article-layout': 'new-design',
				// Server-side tests that are also available client-side
				'server-side-test': 'server-variant',
				'ssr-experiment': 'control',
			};
			mockGetParticipations.mockReturnValue(participations);
			abTests = new ABTests({
				isServer: false,
			});

			// Test all methods together
			expect(abTests.getParticipations()).toEqual(participations);

			// Test client-side tests
			expect(abTests.isUserInTest('header-experiment')).toBe(true);
			expect(abTests.isUserInTest('non-existent-test')).toBe(false);
			expect(
				abTests.isUserInTestGroup('header-experiment', 'variant'),
			).toBe(true);
			expect(
				abTests.isUserInTestGroup('header-experiment', 'control'),
			).toBe(false);

			// Test server-side tests that are available client-side
			expect(abTests.isUserInTest('server-side-test')).toBe(true);
			expect(
				abTests.isUserInTestGroup('server-side-test', 'server-variant'),
			).toBe(true);
			expect(abTests.isUserInTestGroup('ssr-experiment', 'control')).toBe(
				true,
			);

			abTests.trackABTests(mockOphanRecord, mockErrorReporter);

			expect(mockOphanRecord).toHaveBeenCalledWith({
				abTestRegister: {
					'header-experiment': {
						variantName: 'variant',
						complete: false,
					},
					'footer-test': {
						variantName: 'control',
						complete: false,
					},
					'article-layout': {
						variantName: 'new-design',
						complete: false,
					},
					'server-side-test': {
						variantName: 'server-variant',
						complete: false,
					},
					'ssr-experiment': {
						variantName: 'control',
						complete: false,
					},
				},
			});
			expect(mockErrorReporter).not.toHaveBeenCalled();
		});
	});
});
