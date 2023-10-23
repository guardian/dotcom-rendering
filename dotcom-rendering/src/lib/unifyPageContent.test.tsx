import { unifyPageContent } from './unifyPageContent';

describe('unifyPageContent', () => {
	const elementHtml = `<div>I am the best HTML string out there</div>`;
	const elementCss = `div {
      color: blue;
    }`;
	const elementJs = `console.log('hello world!')`;

	it('should each content', () => {
		const outputHTML = unifyPageContent({
			elementHtml,
			elementCss,
			elementJs,
		});
		expect(outputHTML).toContain(elementHtml);
		expect(outputHTML).toContain(elementCss);
		expect(outputHTML).toContain(elementJs);
	});

	it('should not render style tag', () => {
		const outputHTML = unifyPageContent({
			elementHtml,
			elementJs,
		});
		expect(outputHTML).not.toContain(`<style`);
	});

	it('should not render div tag', () => {
		const outputHTML = unifyPageContent({
			elementCss,
			elementJs,
		});
		expect(outputHTML).not.toContain(`<div`);
	});

	it('should render successfully when no elementJs', () => {
		const outputHTML = unifyPageContent({
			elementCss,
			elementHtml,
		});
		expect(outputHTML).not.toContain(elementJs);
	});
});
