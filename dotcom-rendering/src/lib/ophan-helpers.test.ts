import { nestedOphanComponents } from './ophan-helpers';

describe('Ophan helpers', () => {
	it('should handle nested values', () => {
		expect(nestedOphanComponents('logo')).toBe('logo');
		expect(nestedOphanComponents('nav', 'sub nav', 'final element')).toBe(
			'nav : sub nav : final element',
		);
	});
});
