import { ElementKind, flattenTextElement } from 'bodyElement';
import { JSDOM } from 'jsdom';

describe('flattenTextElement', () => {
	test('it returns HeadingTwo body element with text content', () => {
		const node = JSDOM.fragment('<h2>some text</h2>');
		const result = flattenTextElement(node);

		expect(result.length).toEqual(1);
		expect(result[0].kind).toEqual(ElementKind.HeadingTwo);
		result[0].kind === ElementKind.HeadingTwo &&
			expect(result[0].doc.textContent).toEqual('some text');
	});

	test('it returns Text body element and HeadingTwo body element with correct id', () => {
		const nestedHtml = ['<p>paragraph 1</p>', '<h2>first heading 2</h2>'];
		const node = JSDOM.fragment(nestedHtml.join(''));

		const result = flattenTextElement(node);

		expect(result.length).toEqual(2);
		expect(result[0].kind).toEqual(ElementKind.Text);
		expect(result[1].kind).toEqual(ElementKind.HeadingTwo);
		expect(
			result[1].kind === ElementKind.HeadingTwo && result[1].id.isSome(),
		).toEqual(true);

		result[1].kind === ElementKind.HeadingTwo &&
			result[1].id.isSome() &&
			expect(result[1].id.value).toEqual('first-heading-2');
	});
});
