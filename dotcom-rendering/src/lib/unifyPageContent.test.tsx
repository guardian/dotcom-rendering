import { unifyPageContent } from './unifyPageContent';

describe('unifyPageContent', () => {
	const elementHtml = `<div>I am the best HTML string out there</div>`;
	const elementCss = `div {
      color: blue;
    }`;
	const elementJs = `console.log('hello world!')`;

	it('should each content', () => {
		const outputHTMLWeb = unifyPageContent({
			elementHtml,
			elementCss,
			elementJs,
			renderingTarget: 'Web',
		});
		const outputHTMLApps = unifyPageContent({
			elementHtml,
			elementCss,
			elementJs,
			renderingTarget: 'Apps',
		});
		expect(outputHTMLWeb).toContain(elementHtml);
		expect(outputHTMLWeb).toContain(elementCss);
		expect(outputHTMLWeb).toContain(elementJs);
		expect(outputHTMLApps).toContain(elementHtml);
		expect(outputHTMLApps).toContain(elementCss);
		expect(outputHTMLApps).toContain(elementJs);
	});

	it('should not render style tag', () => {
		const outputHTMLWeb = unifyPageContent({
			elementHtml,
			elementJs,
			renderingTarget: 'Web',
		});
		const outputHTMLApps = unifyPageContent({
			elementHtml,
			elementJs,
			renderingTarget: 'Apps',
		});
		expect(outputHTMLWeb).not.toContain(`<style`);
		expect(outputHTMLApps).not.toContain(`<style`);
	});

	it('should not render div tag', () => {
		const outputHTMLWeb = unifyPageContent({
			elementCss,
			elementJs,
			renderingTarget: 'Web',
		});
		const outputHTMLApps = unifyPageContent({
			elementCss,
			elementJs,
			renderingTarget: 'Apps',
		});
		expect(outputHTMLWeb).not.toContain(`<div`);
		expect(outputHTMLApps).not.toContain(`<div`);
	});

	it('should render successfully when no elementJs', () => {
		const outputHTMLWeb = unifyPageContent({
			elementCss,
			elementHtml,
			renderingTarget: 'Web',
		});
		const outputHTMLApps = unifyPageContent({
			elementCss,
			elementHtml,
			renderingTarget: 'Apps',
		});
		expect(outputHTMLWeb).not.toContain(elementJs);
		expect(outputHTMLApps).not.toContain(elementJs);
	});
});
