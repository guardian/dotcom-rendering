import { css } from '@emotion/react';
import {
	ArticleSpecial,
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
} from '@guardian/libs';
import { neutral } from '@guardian/source-foundations';
import type { KeyEvent } from './KeyEventCard';
import { KeyEventCard } from './KeyEventCard';

const getDate = (milliSeconds = 1, seconds = 1, minutes = 1, hours = 1) =>
	new Date(Date.now() - milliSeconds * seconds * minutes * hours);

const getFormat = (theme: ArticleTheme) => {
	return {
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
		theme,
	};
};

const format = getFormat(ArticlePillar.News);

const events: KeyEvent[] = [
	{
		date: getDate(),
		text: 'Biden heads to Europe to announce new sanctions on Russian Duma',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
		format,
	},
	{
		date: getDate(1000, 30),
		text: `Pope 'embarrassed' by West's increased military spending`,
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
		format,
	},
	{
		date: getDate(1000, 60, 30),
		text: 'Kremlin: sending peacekeepers to Ukraine would be ‘reckless and extremely dangerous’',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
		format,
	},
	{
		date: getDate(1000, 60, 30, 3),
		text: 'Pentagon condemns Kremlin refusal to rule out use of nuclear weapons',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
		format,
	},
	{
		date: getDate(1000, 60, 60, 10),
		text: 'Biden heads to Europe to announce new sanctions on Russian Duma',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
		format,
	},
	{
		date: getDate(1000, 60, 60, 24),
		text: `Mariupol under 'constant bombing', Russia seizes humanitarian convoy, Zelenskiy says`,
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
		format,
	},
	{
		date: getDate(1000, 60, 60, 48),
		text: 'Summary and welcome',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
		format,
	},
];

const wrapperStyles = css`
	padding-left: 20px;
	display: flex;
	background-color: ${neutral[93]};
	margin: 10px 0;

	ul {
		overflow-x: scroll;
		margin: 20px 0;

		&::-webkit-scrollbar {
			display: none;
		}
	}
`;

const Cards = ({ theme, count }: { theme: ArticleTheme; count: number }) => (
	<ul css={wrapperStyles}>
		{events.slice(0, count).map((event) => (
			<KeyEventCard
				text={event.text}
				url={event.url}
				date={event.date}
				format={getFormat(theme)}
			/>
		))}
	</ul>
);

const SingleCard = () => (
	<>
		<Cards theme={ArticlePillar.News} count={1} />
		<Cards theme={ArticlePillar.Culture} count={1} />
		<Cards theme={ArticlePillar.Lifestyle} count={1} />
		<Cards theme={ArticlePillar.Sport} count={1} />
		<Cards theme={ArticlePillar.Opinion} count={1} />
		<Cards theme={ArticleSpecial.SpecialReport} count={1} />
	</>
);

const MultipleCards = () => (
	<>
		<Cards theme={ArticlePillar.News} count={7} />
		<Cards theme={ArticlePillar.Culture} count={7} />
		<Cards theme={ArticlePillar.Lifestyle} count={7} />
		<Cards theme={ArticlePillar.Sport} count={7} />
		<Cards theme={ArticlePillar.Culture} count={7} />
		<Cards theme={ArticlePillar.Opinion} count={1} />
		<Cards theme={ArticleSpecial.SpecialReport} count={7} />
	</>
);

export default {
	component: KeyEventCard,
	title: 'Components/KeyEventCard',
};

export { SingleCard, MultipleCards };
