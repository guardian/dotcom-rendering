import { replacePlaceholders } from './enhance-placeholders';

describe('Enhance Placeholders', () => {
	it('replaces supported placeholder', () => {
		const el: InteractiveAtomBlockElement = {
			_type:
				'model.dotcomrendering.pageElements.InteractiveAtomBlockElement',
			id: 'foo',
			url: 'example.com/foo',
			elementId: 'foo1',
			html: '<div>Written by: {{ byline }}</div>',
		};

		const variables = new Map();
		variables.set('byline', 'Joda');
		const got = replacePlaceholders(el, variables).html;
		const want = '<div>Written by: Joda</div>';

		expect(got).toEqual(want);
	});

	it('replaces supported placeholder ignoring surrounding whitespace', () => {
		const el: InteractiveAtomBlockElement = {
			_type:
				'model.dotcomrendering.pageElements.InteractiveAtomBlockElement',
			id: 'foo',
			url: 'example.com/foo',
			elementId: 'foo1',
			html: '<div>Written by: {{byline    }}</div>',
		};

		const variables = new Map();
		variables.set('byline', 'Joda');
		const got = replacePlaceholders(el, variables).html;
		const want = '<div>Written by: Joda</div>';

		expect(got).toEqual(want);
	});

	it('preserves unsupported placeholder', () => {
		const el: InteractiveAtomBlockElement = {
			_type:
				'model.dotcomrendering.pageElements.InteractiveAtomBlockElement',
			id: 'foo',
			url: 'example.com/foo',
			elementId: 'foo1',
			html: '<div>Written by: {{ unsupported }}</div>',
		};

		const variables = new Map();
		variables.set('byline', 'Joda');
		const got = replacePlaceholders(el, variables).html;
		const want = el.html;

		expect(got).toEqual(want);
	});
});
