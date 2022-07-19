import { buildIdentityLinks } from './Links.importable';

describe('buildIdentityLinks', () => {
	it('contains a unique ID for every item', () => {
		const mmaUrl = 'https://manage.theguardian.com';
		const idUrl = 'https://profile.theguardian.com';
		const userId = '12345';

		const links = buildIdentityLinks(mmaUrl, idUrl, userId);

		const linksCount = links.length;
		const uniqueIdCount = new Set(links.map((link) => link.id)).size;
		expect(uniqueIdCount).toEqual(linksCount);
	});
});
