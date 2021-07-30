import { getIdFromUrl } from './get-video-id';

describe('getIdFromUrl', () => {
	it('Returns matching ID for YouTube formats', () => {
		const youtubeRegEx = '^[a-zA-Z0-9_-]{11}$';

		const formats = [
			{
				url: 'http://www.youtube.com/ytscreeningroom?v=NRHEIGHTx8I',
				id: 'NRHEIGHTx8I',
			},
			{
				url: 'http://www.youtube.com/ytscreeningroom?v=NRH_IGHTx8I',
				id: 'NRH_IGHTx8I',
			},
			{
				url: 'http://www.youtube.com/ytscreeningroom?v=NRH-IGHTx8I',
				id: 'NRH-IGHTx8I',
			},
		];

		formats.forEach((_) => {
			expect(getIdFromUrl(_.url, youtubeRegEx, false, 'v')).toBe(_.id);
		});
	});

	it('Returns matching ID for Vimeo formats', () => {
		const vimeoRegEx = '(\\d+)($|\\/)';

		const formats = [
			{
				url: 'https://vimeo.com/channels/staffpicks/332085955',
				id: '332085955',
			},
			{
				url: 'https://vimeo.com/channels/another/staffpicks/332085955',
				id: '332085955',
			},
			{
				url: 'https://vimeo.com/channels/staffpicks/123456',
				id: '123456',
			},
		];

		formats.forEach((_) => {
			expect(getIdFromUrl(_.url, vimeoRegEx, true)).toBe(_.id);
		});
	});

	it('Throws an error if it cannot find an ID', () => {
		expect(() => {
			getIdFromUrl('https://theguardian.com', '', false, 'v');
		}).toThrow();

		expect(() => {
			getIdFromUrl('https://theguardian.com?p=test', '', false, 'v');
		}).toThrow();

		expect(() => {
			getIdFromUrl('https://theguardian.com/test', '', false, 'p');
		}).toThrow();
	});

	it('Throws an error if it ID is in incorrect format', () => {
		expect(() => {
			getIdFromUrl('https://theguardian.com/test', 'nottest', true);
		}).toThrow();

		expect(() => {
			getIdFromUrl(
				'https://theguardian.com?p=test',
				'nottest',
				false,
				'p',
			);
		}).toThrow();
	});
});
