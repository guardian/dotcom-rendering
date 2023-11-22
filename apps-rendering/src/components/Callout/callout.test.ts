import { formatContactType, formatContactNumbers } from './calloutContact';
import type { Contact } from '@guardian/apps-rendering-api-models/contact';

describe('formatContactType', () => {
	it('treats whatsapp as a special case', () => {
		expect(formatContactType('whatsapp')).toEqual('WhatsApp');
	});
	it('capitalises the first letter of a string', () => {
		expect(formatContactType('test')).toEqual('Test');
	});
});

describe('formatContactNumbers', () => {
	it('formats contact names into a readable string', () => {
		const mockContacts: Contact[] = [
			{
				name: 'test',
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

		const expected =
			'Contact us on Test at 1 or Signal at 2 or Telegram at 3';
		expect(formatContactNumbers(mockContacts)).toEqual(expected);
	});

	it('groups contact methods if they have the same value', () => {
		const mockContacts: Contact[] = [
			{
				name: 'test',
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

		const expected = 'Contact us on Test or Signal at 1 or Telegram at 3';
		expect(formatContactNumbers(mockContacts)).toEqual(expected);
	});

	it('treats capitalising whatsapp as a special case', () => {
		const mockContacts: Contact[] = [
			{
				name: 'whatsapp',
				value: '1',
				urlPrefix: 'mock1',
			},
		];

		const expected = 'Contact us on WhatsApp at 1';
		expect(formatContactNumbers(mockContacts)).toEqual(expected);
	});
});
