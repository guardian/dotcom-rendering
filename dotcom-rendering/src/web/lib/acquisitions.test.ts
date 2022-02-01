import { addTrackingCodesToUrl } from '@root/src/web/lib/acquisitions';

describe('acquisitions', () => {
	it('should addTrackingCodesToUrl', () => {
		const result = addTrackingCodesToUrl({
			abTest: {
				name: 'testName',
				variant: 'variantName',
			},
			base: `https://support.theguardian.com/contribute`,
			campaignCode: 'header_support',
			componentId: 'header_support',
			componentType: 'ACQUISITIONS_HEADER',
			pageViewId: 'abcdefg',
			referrerUrl: 'https://theguardian.com/uk',
		});

		expect(result).toEqual(
			'https://support.theguardian.com/contribute?REFPVID=abcdefg&INTCMP=header_support&acquisitionData=%7B%22abTest%22%3A%7B%22name%22%3A%22testName%22%2C%22variant%22%3A%22variantName%22%7D%2C%22campaignCode%22%3A%22header_support%22%2C%22componentId%22%3A%22header_support%22%2C%22componentType%22%3A%22ACQUISITIONS_HEADER%22%2C%22referrerPageviewId%22%3A%22abcdefg%22%2C%22referrerUrl%22%3A%22https%3A%2F%2Ftheguardian.com%2Fuk%22%2C%22source%22%3A%22GUARDIAN_WEB%22%7D',
		);
	});
});
