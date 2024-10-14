// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticleDesign, type ArticleFormat, Pillar } from '../../articleFormat';
import { breakpoints, from } from '@guardian/source/foundations';
import {
	DottedLines,
	StraightLines,
} from '@guardian/source-development-kitchen/react-components';
import Body from 'components/ArticleBody';
import Epic from 'components/Epic';
import FootballScores from 'components/FootballScores';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import Logo from 'components/Logo';
import MainMedia from 'components/MainMedia';
import Metadata from 'components/Metadata';
import RelatedContent from 'components/RelatedContent';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import TableOfContents from 'components/TableOfContents';
import Tags from 'components/Tags';
import { WithAgeWarning } from 'components/WithAgeWarning';
import type { MatchScores } from 'football';
import { getFormat } from 'item';
import type {
	Correction,
	Explainer,
	Feature,
	Interactive,
	Interview,
	Item,
	MatchReport,
	Obituary,
	PhotoEssay,
	PrintShop,
	Profile,
	Quiz,
	Recipe,
	Review,
	Standard,
	Timeline,
} from 'item';
import { maybeRender } from 'lib';
import { Optional } from 'optional';
import { background } from 'palette';
import {
	articleWidthStyles,
	darkModeCss,
	lineStyles,
	onwardStyles,
} from 'styles';

// ----- Styles ----- //
const backgroundStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.articleContent(format)};

	${darkModeCss`
        background-color: ${background.articleContentDark(format)}
    `}
`;

const BorderStyles = css`
	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: 0 auto;
	}
`;

const decideLines = (
	item: Item,
	cssOverrides?: SerializedStyles | SerializedStyles[],
): JSX.Element => {
	const count = item.design === ArticleDesign.Comment ? 8 : 4;

	if (item.theme === Pillar.Sport) {
		return <DottedLines cssOverrides={cssOverrides} count={count} />;
	}

	return <StraightLines cssOverrides={cssOverrides} count={count} />;
};

interface Props {
	item:
		| Feature
		| Explainer
		| Review
		| Standard
		| Interactive
		| Quiz
		| MatchReport
		| Obituary
		| Correction
		| Interview
		| Recipe
		| PrintShop
		| PhotoEssay
		| Timeline
		| Profile;
}

const StandardLayout = ({ item }: Props) => {
	const format = getFormat(item);
	// client side code won't render an Epic if there's an element with this id
	const epicContainer = item.shouldHideReaderRevenue ? null : (
		<div css={articleWidthStyles}>
			<Epic />
		</div>
	);

	const matchScores: Optional<MatchScores> =
		'football' in item ? item.football : Optional.none();
	return (
		<main css={backgroundStyles(format)}>
			<article className="js-article" css={BorderStyles}>
				{maybeRender(matchScores.toOption(), (scores) => (
					<div id="js-football-scores">
						<FootballScores
							league={scores.league}
							stadium={scores.stadium}
							homeTeam={scores.homeTeam}
							awayTeam={scores.awayTeam}
							status={scores.status}
						/>
					</div>
				))}
				<header>
					<MainMedia
						format={getFormat(item)}
						mainMedia={item.mainMedia}
					/>
					<WithAgeWarning
						tags={item.tags}
						series={item.series}
						publishDate={item.publishDate}
						format={format}
					/>
					<Series item={item} />

					<Headline item={item} />
					<div css={articleWidthStyles}>
						<Standfirst item={item} />
					</div>
					{decideLines(item, lineStyles(format))}
					<section css={articleWidthStyles}>
						<Metadata item={item} />
						<Logo item={item} />
					</section>

					{item.outline.length >= 3 && (
						<section css={articleWidthStyles}>
							<TableOfContents
								format={getFormat(item)}
								outline={item.outline}
							/>
						</section>
					)}
				</header>
				<Body
					className={[articleWidthStyles]}
					format={item}
					body={item.body}
					shouldHideAdverts={item.shouldHideAdverts}
				/>
				{epicContainer}
				<section className="js-tags" css={articleWidthStyles}>
					<Tags item={item} />
				</section>
			</article>
			<section css={onwardStyles}>
				<RelatedContent item={item} />
			</section>
			<Footer isCcpa={false} format={item} />
		</main>
	);
};

// ----- Exports ----- //

export default StandardLayout;
