import { buildDetailText } from './buildNewsletterSignUpText';

describe('buildDetailText', () => {
	it('will return the fallback text if the input is not recognised', () => {
		const output = buildDetailText(
			'When we have something to report which is usually like every other week or something',
		);
		expect(output).toBe('Free newsletter');
	});

	it('will include a valid frequency', () => {
		const outputDaily = buildDetailText('   DAILY ');
		const outputFortnightly = buildDetailText('Fortnightly ');
		const outputWeekly = buildDetailText('weekly');
		const outputMonthly = buildDetailText('Monthly ');

		expect(outputDaily).toBe('Free daily newsletter');
		expect(outputFortnightly).toBe('Free fortnightly newsletter');
		expect(outputWeekly).toBe('Free weekly newsletter');
		expect(outputMonthly).toBe('Free monthly newsletter');
	});

	it('will handle special cased values', () => {
		expect(buildDetailText('every weekday')).toBe('Free daily newsletter');
		expect(buildDetailText('Every Weekday ')).toBe('Free daily newsletter');
	});
});
