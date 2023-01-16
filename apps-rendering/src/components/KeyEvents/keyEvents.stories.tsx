// ----- Imports ----- //

import { css } from '@emotion/react';
import type { ArticleFormat, ArticleTheme } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import type { ReactElement } from 'react';
import type { KeyEvent } from '.';
import KeyEvents from '.';

// ----- Stories ----- //

const events: KeyEvent[] = [
	{
		date: new Date(1 * 60 * 1000),
		text: 'Gold for Uganda',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: new Date(2 * 60 * 1000),
		text: 'Ben Maher goes into the gold medal sport in the equestrian jumps',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: new Date(3 * 60 * 1000),
		text: 'Gold for Uganda',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: new Date(5 * 60 * 1000),
		text: 'Gold for Uganda',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: new Date(9 * 60 * 1000),
		text: 'Jodie Williams qualifies for the 400m final',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: new Date(15 * 60 * 1000),
		text: 'Gold for Uganda',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: new Date(20 * 60 * 1000),
		text: 'Gold for Uganda',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: new Date(35 * 60 * 1000),
		text: 'Gold for Uganda',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
];

const KeyEventComp = (
	dark: boolean,
	format: ArticleFormat,
	title: string,
): ReactElement => (
	<div
		css={css`
			flex-grow: 1;
		`}
	>
		<div>{title}</div>
		<KeyEvents keyEvents={events} format={format} supportsDarkMode={dark} />
	</div>
);

const getFormat = (theme: ArticleTheme): ArticleFormat => {
	return {
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
		theme: theme,
	};
};

const keyEventWithTheme = (dark: boolean): (() => ReactElement) => {
	const KeyEvent = (): ReactElement => (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				flex-wrap: wrap;
			`}
		>
			{KeyEventComp(dark, getFormat(ArticlePillar.News), 'News')}
			{KeyEventComp(dark, getFormat(ArticlePillar.Culture), 'Culture')}
			{KeyEventComp(
				dark,
				getFormat(ArticlePillar.Lifestyle),
				'Lifestyle',
			)}
			{KeyEventComp(dark, getFormat(ArticlePillar.Opinion), 'Opinion')}
			{KeyEventComp(dark, getFormat(ArticlePillar.Sport), 'Sport')}
			{KeyEventComp(dark, getFormat(ArticleSpecial.Labs), 'Labs')}
			{KeyEventComp(
				dark,
				getFormat(ArticleSpecial.SpecialReport),
				'SpecialReport',
			)}
		</div>
	);

	return KeyEvent;
};

const Default = keyEventWithTheme(false);
const Dark = keyEventWithTheme(true);

// ----- Exports ----- //

export default {
	component: KeyEvents,
	title: 'AR/KeyEvents',
};

export { Default, Dark };
