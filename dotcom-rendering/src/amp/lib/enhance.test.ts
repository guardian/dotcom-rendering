import { enhance } from './enhance';

const getData = (): InteractiveAtomBlockElement => ({
	_type: 'model.dotcomrendering.pageElements.InteractiveAtomBlockElement',
	elementId: 'socrates',
	url: 'example.com/boom',
	id: 'socrates-abc',
	js: '',
	html: '',
});

describe('Enhance interactive atoms for AMP', () => {
	it('cleans dirty HTML', () => {
		const data = getData();
		data.html = '<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>';
		const got = enhance([data])[0] as InteractiveAtomBlockElement;

		expect(got.html).toBe('<p>abc</p>');
	});

	it('preserves comments', () => {
		const data = getData();
		data.html = `<!-- MobileHeight: 1200 --><div class="gv-gb-golden-boot-wrapper" id="v1"></div>`;
		const got = enhance([data])[0] as InteractiveAtomBlockElement;

		expect(got.html).toBe(
			`<!-- MobileHeight: 1200 --><div id=\"v1\" class=\"gv-gb-golden-boot-wrapper\"></div>`,
		);
	});

	it('anotates bullet characters with spans', () => {
		const data = getData();
		data.html = '<p>•</p>';
		const got = enhance([data])[0] as InteractiveAtomBlockElement;

		expect(got.html).toBe('<p><span class="bullet">&bull;</span></p>');
	});
});
