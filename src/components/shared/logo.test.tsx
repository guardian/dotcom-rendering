import { cleanImageUrl } from 'components/shared/logo';

describe('Logo component', () => {
	it('Reformats logo url correctly for css content', () => {
		const url =
			'https://s.theguardian.com/sponsor/26/Sep/2019/id (stacked) (white version).png';
		const expectedCleanedUrl =
			'https://s.theguardian.com/sponsor/26/Sep/2019/id%20%28stacked%29%20%28white%20version%29.png';
		const cleanedUrl = cleanImageUrl(url);
		expect(cleanedUrl).toBe(expectedCleanedUrl);
	});
});
