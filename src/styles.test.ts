import { darkModeCss } from './styles';
import { getThemeStyles } from 'themeStyles';
import { Pillar } from '@guardian/types';

describe('helper functions return correct styles', () => {
	test('Returns correct pillar styles for pillar', () => {
		const pillarStyles = getThemeStyles(Pillar.News);
		const expectedNewsPillarStyles = {
			cameraIcon: '#FFF4F2',
			cameraIconBackground: '#C70000',
			kicker: '#C70000',
			inverted: '#FF5943',
			liveblogBackground: '#AB0613',
			liveblogDarkBackground: '#8B0000',
			link: '#AB0613',
		};
		expect(pillarStyles).toEqual(expectedNewsPillarStyles);
	});

	test('Returns correct dark mode styles', () => {
		const css = darkModeCss`a { text-decoration: none; color: ${`aliceblue`}; }`;
		const expectedCss = `@media(prefers-color-scheme:dark){a{text-decoration:none;color:aliceblue;};};label:darkModeCss;`;
		expect(css.styles.trim().replace(/\s/g, '')).toEqual(expectedCss);
	});
});
