import { interactiveLegacyFigureClasses } from './interactiveLegacyStyling';

describe('interactiveLegacyStyling', () => {
	it('should add correct legacy classes for immersive interactive block element', () => {
		const got = interactiveLegacyFigureClasses(
			'model.dotcomrendering.pageElements.InteractiveBlockElement',
			'immersive',
		);
		const want =
			'element element-interactive element--immersive element-immersive';

		expect(got).toBe(want);
	});

	it('should add correct legacy classes for showcase interactive atom element', () => {
		const got = interactiveLegacyFigureClasses(
			'model.dotcomrendering.pageElements.InteractiveAtomBlockElement',
			'showcase',
		);
		const want = 'element element-atom element--showcase element-showcase';

		expect(got).toBe(want);
	});

	it('should not add legacy role classes when role is undefined', () => {
		const got = interactiveLegacyFigureClasses(
			'model.dotcomrendering.pageElements.InteractiveAtomBlockElement',
			undefined,
		);
		const want = 'element element-atom';

		expect(got).toBe(want);
	});
});
