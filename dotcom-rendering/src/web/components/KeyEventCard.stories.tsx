import { css } from '@emotion/react';
import {
	ArticleSpecial,
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
} from '@guardian/libs';
import { from, neutral } from '@guardian/source-foundations';
import { events } from '../../../fixtures/manual/key-events';
import { KeyEventCard } from './KeyEventCard';

const getFormat = (theme: ArticleTheme) => {
	return {
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
		theme,
	};
};

const wrapperStyles = css`
	padding-left: 20px;
	display: inline-flex;
	background-color: ${neutral[97]};
	margin: 10px 0;

	${from.desktop} {
		background-color: ${neutral[93]};
	}

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
				isSummary={event.isSummary}
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
		<Cards theme={ArticlePillar.Opinion} count={7} />
		<Cards theme={ArticleSpecial.SpecialReport} count={7} />
	</>
);

export default {
	component: KeyEventCard,
	title: 'Components/KeyEventCard',
};

export { SingleCard, MultipleCards };
