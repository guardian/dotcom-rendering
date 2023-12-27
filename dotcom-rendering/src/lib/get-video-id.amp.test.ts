import { getIdFromUrl } from './get-video-id.amp';
import { ampYoutubeIdRegex } from '../components/VideoYoutubeBlockComponent.amp';

describe('getIdFromUrl', () => {
	it('Returns matching ID for YouTube formats', () => {
		const youtubeRegEx = ampYoutubeIdRegex;

		const formats = [
			{
				url: 'http://www.youtube.com/ytscreeningroom?v=NRHEIGHTx8I',
				id: 'NRHEIGHTx8I',
			},
			{
				url: 'http://www.youtube.com/ytscreeningroom?v=NRHEIGHTx8Ixyz',
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
			expect(getIdFromUrl(_.url, youtubeRegEx, true, 'v')).toBe(_.id);
		}
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

		for (const _ of formats) {
			expect(getIdFromUrl(_.url, vimeoRegEx, true)).toBe(_.id);
		}
	});

	it('Finds ID if both options are allowed', () => {
		const formats = [
			'https://theguardian.com/test',
			'https://theguardian.com?a=test',
			'https://theguardian.com/test?a=test',
		];

		for (const _ of formats) {
			expect(getIdFromUrl(_, 'test', true, 'a')).toBe('test');
		}
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

		expect(() => {
			getIdFromUrl(
				'https://theguardian.com/test?p=test',
				'nottest',
				true,
				'p',
			);
		}).toThrow();
	});
});
