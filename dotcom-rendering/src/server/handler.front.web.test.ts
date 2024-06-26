import { getBadgeUrl } from './handler.front.web';

describe('getBadgeUrl', () => {
	it('should return undefined if the references property is not present', () => {
		const tag = {
			properties: {
				id: 'profile/morwennaferrier',
				tagType: 'Contributor',
				webTitle: 'Morwenna Ferrier',
				twitterHandle: 'exampleTwitterHandle',
				bylineImageUrl:
					'https://static.guim.co.uk/sys-images/Guardian/Pix/contributor/2014/10/15/1413394164362/Morwenna-Ferrier.jpg',
				contributorLargeImagePath:
					'https://uploads.guim.co.uk/2017/10/09/Morwenna-Ferrier,-L.png',
			},
		};
		expect(getBadgeUrl(tag)).toBeUndefined();
	});

	it('should return undefined if there is no pa-football-team reference', () => {
		const tag = {
			properties: {
				id: '',
				tagType: '',
				webTitle: '',
				references: [{ type: 'some-other-type', id: 'some-id' }],
			},
		};

		expect(getBadgeUrl(tag)).toBeUndefined();
	});

	it('should return the correct badge URL if the pa-football-team reference is present', () => {
		const tag = {
			properties: {
				id: '',
				tagType: '',
				webTitle: '',
				references: [
					{
						type: 'pa-football-team',
						id: 'football/12345',
					},
				],
			},
		};

		const expectedUrl =
			'https://sport.guim.co.uk/football/crests/120/12345.png';
		expect(getBadgeUrl(tag)).toBe(expectedUrl);
	});

	it('should handle multiple references and return the correct badge URL', () => {
		const tag = {
			properties: {
				id: '',
				tagType: '',
				webTitle: '',
				references: [
					{ type: 'some-other-type', id: 'some-id' },
					{
						type: 'pa-football-team',
						id: 'football/67890',
					},
				],
			},
		};

		const expectedUrl =
			'https://sport.guim.co.uk/football/crests/120/67890.png';
		expect(getBadgeUrl(tag)).toBe(expectedUrl);
	});

	it('should handle a complex id and return the correct badge URL', () => {
		const tag = {
			properties: {
				id: '',
				tagType: '',
				webTitle: '',
				references: [
					{
						type: 'pa-football-team',
						id: 'football/team/abcdef',
					},
				],
			},
		};
		const expectedUrl =
			'https://sport.guim.co.uk/football/crests/120/team/abcdef.png';
		expect(getBadgeUrl(tag)).toBe(expectedUrl);
	});
});
