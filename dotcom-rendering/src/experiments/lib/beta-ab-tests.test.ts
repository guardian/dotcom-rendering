import { BetaABTests } from './beta-ab-tests';

// Mock @guardian/libs
jest.mock('@guardian/libs', () => ({
	isUndefined: jest.fn((value) => value === undefined),
}));

// Mock window.guardian
const mockGetParticipations = jest.fn();
const mockWindow = {
	guardian: {
		modules: {
			abTests: {
				getParticipations: mockGetParticipations,
			},
		},
	},
};

// Set up window mock
Object.defineProperty(global, 'window', {
	value: mockWindow,
	writable: true,
});

describe('BetaABTests', () => {
	let betaABTests: BetaABTests;
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

				betaABTests = new BetaABTests({
					isServer: false,
				});

				expect(mockGetParticipations).toHaveBeenCalled();
				expect(betaABTests.getParticipations()).toEqual(
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
				betaABTests = new BetaABTests({
					isServer: false,
				});

				expect(betaABTests.getParticipations()).toEqual(
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
				betaABTests = new BetaABTests({
					isServer: false,
				});

				// Should work for both client and server tests
				expect(betaABTests.isUserInTest('clientTestA')).toBe(true);
				expect(betaABTests.isUserInTest('clientTestB')).toBe(true);
				expect(betaABTests.isUserInTest('serverTestA')).toBe(true);
				expect(betaABTests.isUserInTest('serverTestB')).toBe(true);
			});

			it('should return false when user is not in test (client-side)', () => {
				const participations = {
					testA: 'variantA',
					testB: 'variantB',
				};
				mockGetParticipations.mockReturnValue(participations);
				betaABTests = new BetaABTests({
					isServer: false,
				});

				expect(betaABTests.isUserInTest('testC')).toBe(false);
				expect(betaABTests.isUserInTest('nonExistentTest')).toBe(false);
			});

			it('should return false when testId is undefined in client participations', () => {
				const participations = {
					testA: 'variantA',
				};
				mockGetParticipations.mockReturnValue(participations);
				betaABTests = new BetaABTests({
					isServer: false,
				});

				expect(betaABTests.isUserInTest('testB')).toBe(false);
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
				betaABTests = new BetaABTests({
					isServer: false,
				});

				// Should work for both client and server tests
				expect(
					betaABTests.isUserInTestGroup(
						'clientTestA',
						'clientVariantA',
					),
				).toBe(true);
				expect(
					betaABTests.isUserInTestGroup(
						'clientTestB',
						'clientVariantB',
					),
				).toBe(true);
				expect(
					betaABTests.isUserInTestGroup('clientTestC', 'control'),
				).toBe(true);
				expect(
					betaABTests.isUserInTestGroup(
						'serverTestA',
						'serverVariantA',
					),
				).toBe(true);
				expect(
					betaABTests.isUserInTestGroup('serverTestB', 'control'),
				).toBe(true);
			});

			it('should return false when user is not in specified test group (client-side)', () => {
				const participations = {
					testA: 'variantA',
					testB: 'variantB',
					testC: 'control',
				};
				mockGetParticipations.mockReturnValue(participations);
				betaABTests = new BetaABTests({
					isServer: false,
				});

				expect(betaABTests.isUserInTestGroup('testA', 'variantB')).toBe(
					false,
				);
				expect(betaABTests.isUserInTestGroup('testB', 'control')).toBe(
					false,
				);
				expect(betaABTests.isUserInTestGroup('testC', 'variantA')).toBe(
					false,
				);
			});

			it('should return false when user is not in test at all (client-side)', () => {
				const participations = {
					testA: 'variantA',
					testB: 'variantB',
				};
				mockGetParticipations.mockReturnValue(participations);
				betaABTests = new BetaABTests({
					isServer: false,
				});

				expect(
					betaABTests.isUserInTestGroup(
						'nonExistentTest',
						'variantA',
					),
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

				const serverInstance = new BetaABTests({
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

				const serverInstance = new BetaABTests({
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

				const serverInstance = new BetaABTests({
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

				const serverInstance = new BetaABTests({
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

				const serverInstance = new BetaABTests({
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

				const serverInstance = new BetaABTests({
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
			betaABTests = new BetaABTests({ isServer: false });
		});

		it('should call ophanRecord with correct payload', () => {
			betaABTests.trackABTests(mockOphanRecord, mockErrorReporter);

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
			betaABTests = new BetaABTests({ isServer: false });

			betaABTests.trackABTests(mockOphanRecord, mockErrorReporter);

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
			betaABTests = new BetaABTests({ isServer: false });
		});

		it('should handle errors and call errorReporter', () => {
			// Mock Object.entries to throw an error
			const originalEntries = Object.entries;
			Object.entries = jest.fn(() => {
				throw new Error('Test error');
			});

			betaABTests.trackABTests(mockOphanRecord, mockErrorReporter);

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
			betaABTests = new BetaABTests({ isServer: false });

			betaABTests.trackABTests(mockOphanRecord, mockErrorReporter);

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
			betaABTests = new BetaABTests({
				isServer: false,
			});

			// Test all methods together
			expect(betaABTests.getParticipations()).toEqual(participations);

			// Test client-side tests
			expect(betaABTests.isUserInTest('header-experiment')).toBe(true);
			expect(betaABTests.isUserInTest('non-existent-test')).toBe(false);
			expect(
				betaABTests.isUserInTestGroup('header-experiment', 'variant'),
			).toBe(true);
			expect(
				betaABTests.isUserInTestGroup('header-experiment', 'control'),
			).toBe(false);

			// Test server-side tests that are available client-side
			expect(betaABTests.isUserInTest('server-side-test')).toBe(true);
			expect(
				betaABTests.isUserInTestGroup(
					'server-side-test',
					'server-variant',
				),
			).toBe(true);
			expect(
				betaABTests.isUserInTestGroup('ssr-experiment', 'control'),
			).toBe(true);

			betaABTests.trackABTests(mockOphanRecord, mockErrorReporter);

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
