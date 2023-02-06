import { formatContactNumbers } from './calloutContact';
import type { Contact } from '@guardian/apps-rendering-api-models/contact';

describe('formatContactNumbers', () => {
	it('formats contact names into a readable string', () => {
		const mockContacts: Contact[] = [
			{
				name: 'whatsapp',
				value: '1',
				urlPrefix: 'mock1',
			},
			{
				name: 'signal',
				value: '2',
				urlPrefix: 'mock2',
			},
			{
				name: 'telegram',
				value: '3',
				urlPrefix: 'mock3',
			},
		];

		const expected = 'Contact us on Whatsapp at 1 or Signal at 2 or Telegram at 3';
		expect(formatContactNumbers(mockContacts)).toEqual(expected);
	});

	it('groups contact methods if they have the same value', () => {
		const mockContacts: Contact[] = [
			{
				name: 'whatsapp',
				value: '1',
				urlPrefix: 'mock1',
			},
			{
				name: 'signal',
				value: '1',
				urlPrefix: 'mock2',
			},
			{
				name: 'telegram',
				value: '3',
				urlPrefix: 'mock3',
			},
		];

		const expected = 'Contact us on Whatsapp or Signal at 1 or Telegram at 3';
		expect(formatContactNumbers(mockContacts)).toEqual(expected);
	});
});
