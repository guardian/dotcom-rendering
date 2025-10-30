import {
	getGateDismissedCount,
	hasUserDismissedGate,
	hasUserDismissedGateMoreThanCount,
	incrementUserDismissedGateCount,
	setUserDismissedGate,
	unsetUserDismissedGate,
} from './dismissGate';

describe('SignInGate - dismissGate methods', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	describe('hasUserDismissedGate', () => {
		test('user has dismissed gate', () => {
			localStorage.setItem(
				'gu.prefs.sign-in-gate',
				JSON.stringify({
					value: {
						'SignInGateName-variant-name': new Date().toISOString(),
					},
				}),
			);

			const output = hasUserDismissedGate(
				'variant-name',
				'SignInGateName',
			);

			expect(output).toBe(true);
		});

		test('user has not dismissed gate', () => {
			const output = hasUserDismissedGate(
				'variant-name',
				'SignInGateName',
			);

			expect(output).toBe(false);
		});

		test('user has not dismissed gate for specific variant', () => {
			localStorage.setItem(
				'gu.prefs.sign-in-gate',
				JSON.stringify({
					value: {
						'SignInGateName-variant-other':
							new Date().toISOString(),
					},
				}),
			);

			const output = hasUserDismissedGate(
				'variant-current',
				'SignInGateName',
			);

			expect(output).toBe(false);
		});

		test('user has not dismissed gate for specific test name', () => {
			localStorage.setItem(
				'gu.prefs.sign-in-gate',
				JSON.stringify({
					value: {
						'SignInGateOther-variant-name':
							new Date().toISOString(),
					},
				}),
			);

			const output = hasUserDismissedGate(
				'variant-name',
				'SignInGateCurrent',
			);

			expect(output).toBe(false);
		});

		test('user has dismissed gate within time window', () => {
			const lessThanADayAgo = new Date();
			lessThanADayAgo.setHours(lessThanADayAgo.getHours() - 1);
			localStorage.setItem(
				'gu.prefs.sign-in-gate',
				JSON.stringify({
					value: {
						'SignInGateCurrent-variant-name':
							lessThanADayAgo.toISOString(),
					},
				}),
			);
			const output = hasUserDismissedGate(
				'variant-name',
				'SignInGateCurrent',
				24,
			);

			expect(output).toBe(true);
		});

		test('user has not dismissed gate within time window', () => {
			const moreThanADayAgo = new Date();
			moreThanADayAgo.setHours(moreThanADayAgo.getHours() - 48);
			localStorage.setItem(
				'gu.prefs.sign-in-gate',
				JSON.stringify({
					value: {
						'SignInGateCurrent-variant-name':
							moreThanADayAgo.toISOString(),
					},
				}),
			);

			const output = hasUserDismissedGate(
				'variant-name',
				'SignInGateCurrent',
				24,
			);

			expect(output).toBe(false);
		});

		test('returns false if window is checked but there is no dismissal time for the varian in local storage', () => {
			const output = hasUserDismissedGate(
				'variant-name',
				'SignInGateCurrent',
				24,
			);

			expect(output).toBe(false);
		});
	});

	describe('setUserDismissedGate', () => {
		test('set user dismissed a sign in gate', () => {
			setUserDismissedGate('variant-name', 'SignInGateTest');

			const output = hasUserDismissedGate(
				'variant-name',
				'SignInGateTest',
			);

			expect(output).toBe(true);
		});

		test('set multiple dismissed sign in gates', () => {
			setUserDismissedGate('variant-1', 'test-1');
			setUserDismissedGate('variant-2', 'test-2');

			const output1 = hasUserDismissedGate('variant-1', 'test-1');
			const output2 = hasUserDismissedGate('variant-2', 'test-2');

			expect(output1).toBe(true);
			expect(output2).toBe(true);
		});
	});

	describe('unsetUserDismissedGate', () => {
		test('unsets dismissed sign in gate for correct test and variant', () => {
			setUserDismissedGate('variant-1', 'test-1');
			setUserDismissedGate('variant-2', 'test-2');
			unsetUserDismissedGate('variant-2', 'test-2');

			const output1 = hasUserDismissedGate('variant-1', 'test-1');
			const output2 = hasUserDismissedGate('variant-2', 'test-2');

			expect(output1).toBe(true);
			expect(output2).toBe(false);
		});
	});

	describe('hasUserDismissedGateMoreThanCount and incrementUserDismissedGateCount', () => {
		test('hasUserDismissedGateMoreThanCount depends on the counter incremented by incrementUserDismissedGateCount', () => {
			expect(
				hasUserDismissedGateMoreThanCount('variant-1', 'test-1', 0),
			).toBe(false);

			incrementUserDismissedGateCount('variant-1', 'test-1');
			expect(
				hasUserDismissedGateMoreThanCount('variant-1', 'test-1', 0),
			).toBe(true);
			expect(
				hasUserDismissedGateMoreThanCount('variant-1', 'test-1', 1),
			).toBe(false);

			incrementUserDismissedGateCount('variant-1', 'test-1');
			expect(
				hasUserDismissedGateMoreThanCount('variant-1', 'test-1', 1),
			).toBe(true);
			expect(
				hasUserDismissedGateMoreThanCount('variant-1', 'test-1', 2),
			).toBe(false);

			expect(
				hasUserDismissedGateMoreThanCount('variant-2', 'test-1', 0),
			).toBe(false);
		});

		test('incrementing does not affect other variants or tests', () => {
			incrementUserDismissedGateCount('variant-1', 'test-1');
			expect(
				hasUserDismissedGateMoreThanCount('variant-2', 'test-1', 0),
			).toBe(false);
			expect(
				hasUserDismissedGateMoreThanCount('variant-1', 'test-2', 0),
			).toBe(false);
		});
	});

	describe('getGateDismissedCount', () => {
		test('returns 0 when no treatmentId has been saved yet (first visit)', () => {
			const count = getGateDismissedCount('AuxiaSignInGate');
			expect(count).toBe(0);
		});

		test('returns the count using the last saved treatmentId', () => {
			// Simulate incrementing with a specific treatmentId
			incrementUserDismissedGateCount('14414017', 'AuxiaSignInGate');
			incrementUserDismissedGateCount('14414017', 'AuxiaSignInGate');

			const count = getGateDismissedCount('AuxiaSignInGate');
			expect(count).toBe(2);
		});

		test('returns correct count when treatmentId changes between visits', () => {
			// First visit with treatmentId 'default-treatment-id'
			incrementUserDismissedGateCount(
				'default-treatment-id',
				'AuxiaSignInGate',
			);
			incrementUserDismissedGateCount(
				'default-treatment-id',
				'AuxiaSignInGate',
			);

			expect(getGateDismissedCount('AuxiaSignInGate')).toBe(2);

			// Later visit with treatmentId '14414017'
			incrementUserDismissedGateCount('14414017', 'AuxiaSignInGate');

			// Should now return count for '14414017' since it's the last one saved
			expect(getGateDismissedCount('AuxiaSignInGate')).toBe(1);
		});

		test('handles different gate names independently', () => {
			incrementUserDismissedGateCount('variant-1', 'GateA');
			incrementUserDismissedGateCount('variant-2', 'GateB');

			expect(getGateDismissedCount('GateA')).toBe(1);
			expect(getGateDismissedCount('GateB')).toBe(1);
			expect(getGateDismissedCount('GateC')).toBe(0);
		});
	});
});
