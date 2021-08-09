import { escapeData, unescapeData } from './escapeData';

describe('Escaping html', () => {
	it('should escape script tags', () => {
		const before =
			'<script async src="//www.instagram.com/embed.js"></script>';
		const after =
			'<\\script async src="//www.instagram.com/embed.js"><\\/script>';

		expect(escapeData(before)).toEqual(after);
		expect(unescapeData(after)).toEqual(before);
	});

	it('should escape comments', () => {
		const before = '<!-- Some comment -->';
		const after = '<\\!-- Some comment -->';

		expect(escapeData(before)).toEqual(after);
		expect(unescapeData(after)).toEqual(before);
	});
});
