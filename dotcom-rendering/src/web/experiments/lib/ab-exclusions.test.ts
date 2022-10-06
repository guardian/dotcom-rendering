import { storage } from '@guardian/libs';
import { Participations } from '@guardian/ab-core';
import { setOrUseParticipations } from './ab-exclusions';

describe('canRun using participations', () => {
	beforeEach(() => {
		localStorage.clear();
	});
	const getParticipationsFromLocalStorage = () =>
		storage.local.get('gu.ab.participations');

	const abTestId = 'test-id';
	const variantId = 'variant-id';
	const otherParticipation: Participations = {
		'other-id': { variant: 'other-id' },
	};
	const currentTestParticipation: Participations = {
		'test-id': { variant: 'variant-id' },
	};

	test('canRun using participations sets participation key and returns true if setParticipationsFlag is true', () => {
		expect(setOrUseParticipations(true, abTestId, variantId)).toBe(true);
		expect(getParticipationsFromLocalStorage()).toStrictEqual(
			currentTestParticipation,
		);
	});

	test('canRun using participations returns true if setParticipationsFlag is true and participation already set', () => {
		storage.local.set('gu.ab.participations', currentTestParticipation);

		expect(setOrUseParticipations(true, abTestId, variantId)).toBe(true);
		expect(getParticipationsFromLocalStorage()).toStrictEqual(
			currentTestParticipation,
		);
	});

	test('canRun using participations sets participation key and returns true if setParticipationsFlag is true, even if other participation is present', () => {
		storage.local.set('gu.ab.participations', otherParticipation);

		expect(setOrUseParticipations(true, abTestId, variantId)).toBe(true);
		expect(getParticipationsFromLocalStorage()).toStrictEqual({
			...otherParticipation,
			...currentTestParticipation,
		});
	});

	test('canRun using participations returns correctly if setParticipationsFlag is false and no localstorage participation is set', () => {
		expect(setOrUseParticipations(false, abTestId, variantId)).toBe(false);
		expect(getParticipationsFromLocalStorage()).toBeNull();
	});

	test('canRun using participations returns correctly if setParticipationsFlag is false and correct localstorage participation is present', () => {
		storage.local.set('gu.ab.participations', currentTestParticipation);

		expect(setOrUseParticipations(false, abTestId, variantId)).toBe(true);
		expect(getParticipationsFromLocalStorage()).toStrictEqual(
			currentTestParticipation,
		);
	});

	test('canRun using participations returns correctly if setParticipationsFlag is false and multiple localstorage participations present', () => {
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
