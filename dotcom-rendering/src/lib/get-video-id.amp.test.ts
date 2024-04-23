import { getIdFromUrl } from './get-video-id.amp';

describe('getIdFromUrl', () => {
	it('Returns IDs for YouTube', () => {
		const formats = [
			{
				url: 'http://www.youtube.com/ytscreeningroom?v=NRHEIGHTx8I',
				id: 'NRHEIGHTx8I',
			},
			{
				url: 'http://www.youtube.com/ytscreeningroom?v=NRHEIGHTx8Ixyz',
				id: 'NRHEIGHTx8Ixyz',
			},
			{
				url: 'http://www.youtube.com/ytscreeningroom?v=NRH_IGHTx8I',
				id: 'NRH_IGHTx8I',
			},
			{
				url: 'http://www.youtube.com/ytscreeningroom?v=NRH-IGHTx8I',
				id: 'NRH-IGHTx8I',
			},
			{
				url: 'https://youtu.be/NRHEIGHTx8I',
				id: 'NRHEIGHTx8I',
			},
			{
				url: 'https://youtu.be/NRH_IGHTx8I',
				id: 'NRH_IGHTx8I',
			},
			{
				url: 'https://youtu.be/NRH-IGHTx8I',
				id: 'NRH-IGHTx8I',
			},
		];

		for (const _ of formats) {
			// Search for both in path & query param
			expect(getIdFromUrl(_.url, true, 'v')).toBe(_.id);
		}
	});

	it('Returns IDs for Vimeo', () => {
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

		for (const _ of formats) {
			expect(getIdFromUrl(_.url, true)).toBe(_.id);
		}
	});

	it('Returns query param ID if multiple found', () => {
		const formats = [
			'https://theguardian.com/test2',
			'https://theguardian.com?a=test2',
			'https://theguardian.com/test1?a=test2',
		];

		for (const _ of formats) {
			expect(getIdFromUrl(_, true, 'a')).toBe('test2');
		}
	});

	it('Throws an error if it cannot find an ID', () => {
		expect(() => {
			getIdFromUrl('https://theguardian.com', false, 'v');
		}).toThrow();

		expect(() => {
			getIdFromUrl('https://theguardian.com?p=test', false, 'v');
		}).toThrow();

		expect(() => {
			getIdFromUrl('https://theguardian.com/test', false, 'p');
		}).toThrow();
	});
});
