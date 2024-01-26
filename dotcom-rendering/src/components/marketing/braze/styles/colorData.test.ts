import { ReminderButtonColorStyles, getColors } from './colorData';

describe('getColors', () => {
	describe('when extras has some valid colours', () => {
		it('combines them with the defaults provided', () => {
			const defaults: ReminderButtonColorStyles = {
				styleReminderButton: '#FF0000',
				styleReminderButtonBackground: '#00FF00',
				styleReminderButtonHover: '#0000FF',
				styleReminderAnimation: '#FFFF00',
			};
			const extras = {
				title: 'Hello',
				styleReminderButtonHover: '#F4F4F4',
			};

			const colors = getColors(extras, defaults);

			expect(colors).toEqual({
				styleReminderButton: '#FF0000',
				styleReminderButtonBackground: '#00FF00',
				styleReminderButtonHover: '#F4F4F4',
				styleReminderAnimation: '#FFFF00',
			});
		});
	});

	describe('when extras has all valid colours', () => {
		it('combines them with the defaults provided', () => {
			const defaults: ReminderButtonColorStyles = {
				styleReminderButton: '#FF0000',
				styleReminderButtonBackground: '#00FF00',
				styleReminderButtonHover: '#0000FF',
				styleReminderAnimation: '#FFFF00',
			};
			const extras = {
				title: 'Hello',
				styleReminderButton: '#A1A1A1',
				styleReminderButtonBackground: '#B5B5B5',
				styleReminderButtonHover: '#000000',
				styleReminderAnimation: '#FFFFFF',
			};

			const colors = getColors(extras, defaults);

			expect(colors).toEqual({
				styleReminderButton: '#A1A1A1',
				styleReminderButtonBackground: '#B5B5B5',
				styleReminderButtonHover: '#000000',
				styleReminderAnimation: '#FFFFFF',
			});
		});
	});

	describe('when extras has invalid colours', () => {
		it('uses all colours from the defaults provided', () => {
			const defaults: ReminderButtonColorStyles = {
				styleReminderButton: '#FF0000',
				styleReminderButtonBackground: '#00FF00',
				styleReminderButtonHover: '#0000FF',
				styleReminderAnimation: '#FFFF00',
			};
			const extras = {
				title: 'Hello',
				styleReminderButtonHover: 'BLAHBLAH',
				styleReminderAnimation: '',
			};

			const colors = getColors(extras, defaults);

			expect(colors).toEqual({
				styleReminderButton: '#FF0000',
				styleReminderButtonBackground: '#00FF00',
				styleReminderButtonHover: '#0000FF',
				styleReminderAnimation: '#FFFF00',
			});
		});
	});

	describe('when extras has no colours', () => {
		it('uses all colours from the defaults provided', () => {
			const defaults: ReminderButtonColorStyles = {
				styleReminderButton: '#FF0000',
				styleReminderButtonBackground: '#00FF00',
				styleReminderButtonHover: '#0000FF',
				styleReminderAnimation: '#FFFF00',
			};
			const extras = {
				title: 'Hello',
			};

			const colors = getColors(extras, defaults);

			expect(colors).toEqual({
				styleReminderButton: '#FF0000',
				styleReminderButtonBackground: '#00FF00',
				styleReminderButtonHover: '#0000FF',
				styleReminderAnimation: '#FFFF00',
			});
		});
	});
});
