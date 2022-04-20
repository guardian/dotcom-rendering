import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleTheme,
} from '@guardian/libs';
import type { KeyEvent } from './keyEvents';
import KeyEvents from './keyEventsCards';
import KeyEventsCard from './keyEventsCards';

const getDate = (milliSeconds = 1, seconds = 1, minutes = 1, hours = 1) =>
	new Date(Date.now() - milliSeconds * seconds * minutes * hours);

const events: KeyEvent[] = [
	{
		date: getDate(),
		text: 'Biden heads to Europe to announce new sanctions on Russian Duma',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: getDate(1000, 30),
		text: `Pope 'embarrassed' by West's increased military spending`,
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: getDate(1000, 60, 30),
		text: 'Kremlin: sending peacekeepers to Ukraine would be ‘reckless and extremely dangerous’',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: getDate(1000, 60, 30, 3),
		text: 'Pentagon condemns Kremlin refusal to rule out use of nuclear weapons',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: getDate(1000, 60, 60, 10),
		text: 'Biden heads to Europe to announce new sanctions on Russian Duma',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: getDate(1000, 60, 60, 24),
		text: `Mariupol under 'constant bombing', Russia seizes humanitarian convoy, Zelenskiy says`,
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
	{
		date: getDate(1000, 60, 60, 48),
		text: 'Summary and welcome',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
	},
];

const getFormat = (theme: ArticleTheme) => {
	return {
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
		theme: theme,
	};
};

const wrapperStyles = css`
	ul {
		overflow-x: scroll;
		margin: 20px 0;

		&::-webkit-scrollbar {
			display: none;
		}
	}
`;

const keyEventWithTheme = (dark: boolean, events: KeyEvent[]) => () =>
	(
		<div css={wrapperStyles}>
			<KeyEvents
				supportsDarkMode={dark}
				keyEvents={events}
				format={getFormat(ArticlePillar.News)}
			/>
			<KeyEvents
				supportsDarkMode={dark}
				keyEvents={events}
				format={getFormat(ArticlePillar.Sport)}
			/>
			<KeyEvents
				supportsDarkMode={dark}
				keyEvents={events}
				format={getFormat(ArticlePillar.Culture)}
			/>
			<KeyEvents
				supportsDarkMode={dark}
				keyEvents={events}
				format={getFormat(ArticlePillar.Lifestyle)}
			/>
		</div>
	);

const SingleCard = keyEventWithTheme(false, events.slice(0, 1));
const MultipleCards = keyEventWithTheme(false, events.slice(0, 2));

export default {
	component: KeyEventsCard,
	title: 'Common/Components/KeyEventsCard',
};

export { SingleCard, MultipleCards };
