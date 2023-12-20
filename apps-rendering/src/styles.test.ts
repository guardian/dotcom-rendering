import { darkModeCss } from './styles';

describe('helper functions return correct styles', () => {
	test('Returns correct dark mode styles', () => {
		const css = darkModeCss`a { text-decoration: none; color: ${`aliceblue`}; }`;
		const expectedCss = `@media(prefers-color-scheme:dark){a{text-decoration:none;color:aliceblue;}}`;
		expect(css.styles.trim().replace(/\s/g, '')).toEqual(expectedCss);
	});
});
