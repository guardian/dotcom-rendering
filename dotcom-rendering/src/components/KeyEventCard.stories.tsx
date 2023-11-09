import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import type { KeyEventCard as KeyEventCardType } from '../../fixtures/manual/key-events';
import { events } from '../../fixtures/manual/key-events';
import { palette } from '../palette';
import { KeyEventCard } from './KeyEventCard';

export default {
	component: KeyEventCard,
	title: 'Components/KeyEventCard',
};
const standardFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.LiveBlog,
	theme: Pillar.News,
};
const liveBlogFormats: [ArticleFormat, ...ArticleFormat[]] = [
	{ ...standardFormat, theme: Pillar.News },
	{ ...standardFormat, theme: Pillar.Sport },
	{ ...standardFormat, theme: Pillar.Opinion },
	{ ...standardFormat, theme: Pillar.Culture },
	{ ...standardFormat, theme: Pillar.Lifestyle },
	{ ...standardFormat, theme: ArticleSpecial.Labs },
];

const wrapperStyles = css`
	padding-left: 20px;
	display: inline-flex;
	background-color: ${palette('--key-event-background')};
	margin: 10px 0;

	${from.desktop} {
		background-color: ${palette('--key-event-background-desktop')};
	}

	ul {
		overflow-x: scroll;
		margin: 20px 0;

		&::-webkit-scrollbar {
			display: none;
		}
	}
`;

export const SummaryCard = () => (
	<ul css={wrapperStyles}>
		<KeyEventCard
			id={events[0].id}
			blockFirstPublished={events[0].blockFirstPublished}
			title={events[0].title}
			filterKeyEvents={false}
			isSummary={true}
		/>
	</ul>
);
SummaryCard.storyName = 'Summary Card';
SummaryCard.decorators = [splitTheme(liveBlogFormats)];

export const StandardCard = () => (
	<ul css={wrapperStyles}>
		<KeyEventCard
			key={events[0].id}
			id={events[0].id}
			blockFirstPublished={events[0].blockFirstPublished}
			title={events[0].title}
			isSummary={events[0].isSummary}
			filterKeyEvents={false}
		/>
	</ul>
);
StandardCard.storyName = 'Standard Card';
StandardCard.decorators = [splitTheme(liveBlogFormats)];

export const MultipleCards = () => (
	<ul css={wrapperStyles}>
		{events.slice(0, 7).map((event: KeyEventCardType) => (
			<KeyEventCard
				key={event.id}
				id={event.id}
				blockFirstPublished={event.blockFirstPublished}
				title={event.title}
				isSummary={event.isSummary}
				filterKeyEvents={false}
			/>
		))}
	</ul>
);
MultipleCards.storyName = 'Multiple Standard Cards';
MultipleCards.decorators = [splitTheme(liveBlogFormats)];
