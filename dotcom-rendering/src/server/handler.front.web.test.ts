import { tagPage } from 'fixtures/manual/tag-page';
import { getBadgeUrl } from './handler.front.web';

describe('getBadgeUrl', () => {
	it('should return undefined if the first tag is not present', () => {
		expect(getBadgeUrl(tagPage)).toBeUndefined();
	});

	it('should return undefined if the references property is not present', () => {
		tagPage.tags.tags = [
			{
				properties: {
					id: '',
					tagType: '',
					webTitle: '',
				},
			},
		];
		expect(getBadgeUrl(tagPage)).toBeUndefined();
	});

	it('should return undefined if there is no pa-football-team reference', () => {
		tagPage.tags.tags = [
			{
				properties: {
					id: '',
					tagType: '',
					webTitle: '',
					references: [{ type: 'some-other-type', id: 'some-id' }],
				},
			},
		];
		expect(getBadgeUrl(tagPage)).toBeUndefined();
	});

	it('should return the correct badge URL if the pa-football-team reference is present', () => {
		tagPage.tags.tags = [
			{
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
			},
		];

		const expectedUrl =
			'https://sport.guim.co.uk/football/crests/120/12345.png';
		expect(getBadgeUrl(tagPage)).toBe(expectedUrl);
	});

	it('should handle multiple references and return the correct badge URL', () => {
		tagPage.tags.tags = [
			{
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
			},
		];

		const expectedUrl =
			'https://sport.guim.co.uk/football/crests/120/67890.png';
		expect(getBadgeUrl(tagPage)).toBe(expectedUrl);
	});

	it('should handle a complex id and return the correct badge URL', () => {
		tagPage.tags.tags = [
			{
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
			},
		];
		const expectedUrl =
			'https://sport.guim.co.uk/football/crests/120/team/abcdef.png';
		expect(getBadgeUrl(tagPage)).toBe(expectedUrl);
	});
});
