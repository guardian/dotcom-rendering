import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { getAllThemes, getThemeNameAsString } from '../lib/format';
import { KeyEvents } from './KeyEvents';
import type { KeyEvent } from './KeyEvents';

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

export default {
	component: KeyEvents,
	title: 'Components/KeyEvents',
};

export const Default = () => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;
		`}
	>
		{getAllThemes({
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		}).map((format) => (
			<div
				key={JSON.stringify(format)}
				css={css`
					flex-grow: 1;
				`}
			>
				<div>{getThemeNameAsString(format)}</div>
				<KeyEvents keyEvents={events} format={format} />
			</div>
		))}
	</div>
);
