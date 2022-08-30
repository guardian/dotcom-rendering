import { storage } from '@guardian/libs';
import { Participations } from '@guardian/ab-core';
import { setOrUseParticipations } from './ab-exclusions';

describe('canRun using participations', () => {
	beforeEach(() => {
		localStorage.clear();
	});
	const getParticipationsFromLocalStorage = () =>
		storage.local.get('gu.ab.participations') as Participations | undefined;

	const abTestId = 'test-id';
	const variantId = 'variant-id';
	const otherParticipation: Participations = {
		'other-id': { variant: 'other-id' },
	};
	const currentTestParticipation: Participations = {
		'test-id': { variant: 'variant-id' },
	};

	test('canRun using participations sets participation key and returns true if setParticipationsFlag is true', async () => {
		expect(setOrUseParticipations(true, abTestId, variantId)).toBe(true);

		expect(getParticipationsFromLocalStorage()).toStrictEqual(
			currentTestParticipation,
		);
	});

	test('canRun using participations sets participation key and returns true if setParticipationsFlag is true, even if other participatio is present', async () => {
		storage.local.set('gu.ab.participations', otherParticipation);

		expect(setOrUseParticipations(true, abTestId, variantId)).toBe(true);
		expect(getParticipationsFromLocalStorage()).toStrictEqual({
			...otherParticipation,
			...currentTestParticipation,
		});
	});

	test('canRun using participations returns correctly if setParticipationsFlag is false and no localstorage participation is set,', async () => {
		expect(setOrUseParticipations(false, abTestId, variantId)).toBe(false);
		expect(getParticipationsFromLocalStorage()).toBeNull();
	});

	test('canRun using participations returns correctly if setParticipationsFlag is false and correct localstorgae participation is present,', async () => {
		storage.local.set('gu.ab.participations', currentTestParticipation);

		expect(setOrUseParticipations(false, abTestId, variantId)).toBe(true);
		expect(getParticipationsFromLocalStorage()).toStrictEqual(
			currentTestParticipation,
		);
	});

	test('canRun using participations returns correctly if setParticipationsFlag is false and multiple localstorgae participations present,', async () => {
		storage.local.set('gu.ab.participations', {
			...otherParticipation,
			...currentTestParticipation,
		});

		expect(setOrUseParticipations(false, abTestId, variantId)).toBe(true);
		expect(getParticipationsFromLocalStorage()).toStrictEqual({
			...otherParticipation,
			...currentTestParticipation,
		});
	});
});
