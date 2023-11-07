import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { from, neutral } from '@guardian/source-foundations';
import type { KeyEventCard as KeyEventCardType } from '../../fixtures/manual/key-events';
import { events } from '../../fixtures/manual/key-events';
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

const SummaryCard = ({ theme }: { theme: ArticleTheme }) => (
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

const StandardCard = ({
	theme,
	count,
}: {
	theme: ArticleTheme;
	count: number;
}) => (
	<ul css={wrapperStyles}>
		{events.slice(0, count).map((event: KeyEventCardType) => (
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

const Summary = () => (
	<>
		<SummaryCard theme={Pillar.News} />
		<SummaryCard theme={Pillar.Culture} />
		<SummaryCard theme={Pillar.Lifestyle} />
		<SummaryCard theme={Pillar.Sport} />
		<SummaryCard theme={Pillar.Opinion} />
		<SummaryCard theme={ArticleSpecial.SpecialReport} />
	</>
);

const KeyEvent = () => (
	<>
		<StandardCard theme={Pillar.News} count={1} />
		<StandardCard theme={Pillar.Culture} count={1} />
		<StandardCard theme={Pillar.Lifestyle} count={1} />
		<StandardCard theme={Pillar.Sport} count={1} />
		<StandardCard theme={Pillar.Opinion} count={1} />
		<StandardCard theme={ArticleSpecial.SpecialReport} count={1} />
	</>
);

const Multiple = () => (
	<>
		<StandardCard theme={Pillar.News} count={7} />
		<StandardCard theme={Pillar.Culture} count={7} />
		<StandardCard theme={Pillar.Lifestyle} count={7} />
		<StandardCard theme={Pillar.Sport} count={7} />
		<StandardCard theme={Pillar.Culture} count={7} />
		<StandardCard theme={Pillar.Opinion} count={7} />
		<StandardCard theme={ArticleSpecial.SpecialReport} count={7} />
	</>
);

export default {
	component: KeyEventCard,
	title: 'Components/KeyEventCard',
};

export { Summary, KeyEvent, Multiple };
