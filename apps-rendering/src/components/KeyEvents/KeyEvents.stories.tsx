// ----- Imports ----- //

import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
	type ArticleTheme,
	Pillar,
} from '../../articleFormat';
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

const KeyEventComp = (format: ArticleFormat, title: string): ReactElement => (
	<div
		css={css`
			flex-grow: 1;
		`}
	>
		<div>{title}</div>
		<KeyEvents keyEvents={events} format={format} />
	</div>
);

const getFormat = (theme: ArticleTheme): ArticleFormat => {
	return {
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
		theme: theme,
	};
};

const Default = (): ReactElement => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;
		`}
	>
		{KeyEventComp(getFormat(Pillar.News), 'News')}
		{KeyEventComp(getFormat(Pillar.Culture), 'Culture')}
		{KeyEventComp(getFormat(Pillar.Lifestyle), 'Lifestyle')}
		{KeyEventComp(getFormat(Pillar.Opinion), 'Opinion')}
		{KeyEventComp(getFormat(Pillar.Sport), 'Sport')}
		{KeyEventComp(getFormat(ArticleSpecial.Labs), 'Labs')}
		{KeyEventComp(getFormat(ArticleSpecial.SpecialReport), 'SpecialReport')}
	</div>
);

// ----- Exports ----- //

export default {
	component: KeyEvents,
	title: 'AR/KeyEvents',
};

export { Default };
