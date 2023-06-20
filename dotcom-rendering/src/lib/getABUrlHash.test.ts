import { getForcedParticipationsFromUrl } from './getAbUrlHash';

describe('getForcedParticipationsFromUrl', () => {
	it('Returns a single forced ab test variant', () => {
		expect(
			getForcedParticipationsFromUrl('#ab-inTest=variantId'),
		).toStrictEqual({
			inTest: { variant: 'variantId' },
		});
	});

	it('Returns multiple forced ab test variants', () => {
		expect(
			getForcedParticipationsFromUrl(
				'#ab-inTest=variantId,inTest2=variantId2',
			),
		).toStrictEqual({
			inTest2: { variant: 'variantId2' },
			inTest: { variant: 'variantId' },
		});

		expect(
			getForcedParticipationsFromUrl(
				'#ab-inTest=variantId,inTest2=variantId2,anotherLongTestName=control',
			),
		).toStrictEqual({
			inTest2: { variant: 'variantId2' },
			inTest: { variant: 'variantId' },
			anotherLongTestName: { variant: 'control' },
		});
	});

	it('Returns empty if empty string', () => {
		expect(getForcedParticipationsFromUrl('')).toEqual({});
	});

	it('Returns empty if another hash', () => {
		expect(getForcedParticipationsFromUrl('#discussion-123')).toEqual({});
	});
});
