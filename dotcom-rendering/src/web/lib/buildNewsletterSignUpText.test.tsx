import { buildDetailText } from './buildNewsletterSignUpText';

describe('buildDetailText', () => {
	it('will return the fallback text if the input is not recognised', () => {
		const output = buildDetailText('This is an arbitrary piece of text');
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
});
