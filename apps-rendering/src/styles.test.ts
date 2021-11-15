import { darkModeCss } from './styles';
import { getThemeStyles } from 'themeStyles';
import { ArticlePillar } from '@guardian/libs';

describe('helper functions return correct styles', () => {
	test('Returns correct pillar styles for pillar', () => {
		const pillarStyles = getThemeStyles(ArticlePillar.News);
		const expectedNewsPillarStyles = {
			cameraIcon: '#FFF4F2',
			cameraIconBackground: '#C70000',
			kicker: '#C70000',
			inverted: '#FF5943',
			liveblogBackground: "#8B0000",
			liveblogDarkBackground: "#660505",
			liveblogKicker: "#FFBAC8",
			link: '#AB0613',
		};
		expect(pillarStyles).toEqual(expectedNewsPillarStyles);
	});

	test('Returns correct dark mode styles', () => {
		const css = darkModeCss`a { text-decoration: none; color: ${`aliceblue`}; }`;
		const expectedCss = `@media(prefers-color-scheme:dark){a{text-decoration:none;color:aliceblue;}}`;
		expect(css.styles.trim().replace(/\s/g, '')).toEqual(expectedCss);
	});
});
