import { css } from '@emotion/react';
import {
	from,
	headlineLight50,
	palette as sourcePalette,
	space,
	textSans14,
	textSans17,
	textSans20,
	textSansBold34,
} from '@guardian/source/foundations';
import { useState } from 'react';
import type { EditionId } from '../lib/edition';
import { parseStorylinesContentToStorylines } from '../model/enhanceTagPageStorylinesContent';
import { palette } from '../palette';
import type { StorylinesContent } from '../types/storylinesContent';
import { FlexibleGeneral } from './FlexibleGeneral';
import { ScrollableCarousel } from './ScrollableCarousel';
import { StorylineSection } from './StorylineSection';

type StorylinesSectionProps = {
	url?: string;
	index: number;
	containerId?: string;
	editionId: EditionId;
	storylinesContent?: StorylinesContent;
};

const categoryTitleCss = css`
	${textSans20};
	font-weight: 700;
	color: ${sourcePalette.news[300]};
	margin: ${space[2]}px 0;
	padding: ${space[2]}px 0;
	${from.tablet} {
		margin: 10px;
	}

	border-top: 1px solid ${palette('--section-border-secondary')};
`;

const contentCss = css`
	margin-bottom: ${space[4]}px;
	${from.leftCol} {
		border-left: 1px solid ${sourcePalette.neutral[86]};
	}
`;

const tabsContainerStyles = css`
	display: flex;
	width: 100%;
	${from.wide} {
		width: 110%;
	} /* bit hacky, but looks a touch better on wide. */
	align-items: stretch; /* Makes all tabs the same height */
	margin-bottom: ${space[6]}px;
	margin-left: -${space[2]}px;
`;

const tabStyles = (isActive: boolean, isFirst: boolean) => css`
	${textSans17};
	font-weight: 700;
	text-align: start;
	padding: ${space[0]}px ${space[0]}px ${space[0]}px ${space[2]}px;
	cursor: pointer;
	border: none;
	${!isFirst && `border-left: 1px ${sourcePalette.neutral[86]} solid;`}
	color: ${isActive
		? `${sourcePalette.news[400]}`
		: `${sourcePalette.neutral[38]}`};
	flex: 1;
	min-width: 0;
	display: flex;
	align-items: flex-start; /* Aligns text to the top of each tab */
`;

const contentStyles = css`
	padding-top: ${space[0]}px 0;
`;

const selectedTitleStyles = css`
	${textSansBold34}
	color: ${sourcePalette.news[400]};
	margin-bottom: ${space[4]}px;
	margin-top: ${space[2]}px;
	padding-left: 10px; /* aligns with the headlines of the stories below */
`;

const numberStyles = () => css`
	${headlineLight50}
	line-height: 2rem; /* to align the number with the top of the text */
	margin-left: -${space[1]}px;
	margin-right: ${space[2]}px;
`;

const articleCountAndDateRangeStyle = css`
	${textSans14}
	margin-bottom: ${space[4]}px;
	margin-top: ${space[2]}px;
	margin-left: ${space[2]}px;
`;

function formatDateRangeText(
	earliestArticleTime?: string | null,
	latestArticleTime?: string | null,
): string {
	const earliest = earliestArticleTime ? new Date(earliestArticleTime) : null;
	const latest = latestArticleTime ? new Date(latestArticleTime) : null;
	const format = (d?: Date | null) => {
		if (!d) return '';
		const day = d.getDate();
		const suffix = (dayNum: number) => {
			if (dayNum > 3 && dayNum < 21) return 'th';
			switch (dayNum % 10) {
				case 1:
					return 'st';
				case 2:
					return 'nd';
				case 3:
					return 'rd';
				default:
					return 'th';
			}
		};
		return `${day}${suffix(day)} ${d.toLocaleDateString('en-GB', {
			month: 'long',
			year: 'numeric',
		})}`;
	};

	if (earliest) {
		return `since ${format(earliest)}`;
	} else if (latest) {
		return `up to ${format(latest)}`;
	} else {
		return '';
	}
}

// importable because we need js to handle the tabs
export const StorylinesSection = ({
	url,
	index,
	containerId, //need to check
	storylinesContent,
	editionId,
}: StorylinesSectionProps) => {
	const parsedStorylines =
		storylinesContent &&
		parseStorylinesContentToStorylines(storylinesContent);

	const [activeStorylineId, setActiveStorylineId] = useState<string>(
		parsedStorylines?.[0]?.id ?? '',
	);

	if (!parsedStorylines || parsedStorylines.length === 0) {
		return null;
	}

	const activeStoryline = parsedStorylines.find(
		(s) => s.id === activeStorylineId,
	);

	return (
		<>
			<StorylineSection
				title="Storylines"
				containerPalette="LongRunningAltPalette"
				url={url}
				isTagPage={true}
				showTopBorder={true}
				ophanComponentLink={`container-${index} | ${containerId}`}
				ophanComponentName={containerId}
				sectionId={containerId}
				editionId={editionId}
			>
				{/* Tab selector */}
				<div css={tabsContainerStyles}>
					<ScrollableCarousel
						carouselLength={Math.ceil(parsedStorylines.length)}
						visibleCarouselSlidesOnMobile={2}
						visibleCarouselSlidesOnTablet={4}
						sectionId={'sectionId'}
						shouldStackCards={{ desktop: false, mobile: false }}
						gapSizes={{ column: 'large', row: 'medium' }}
					>
						{parsedStorylines.map((storyline, i) => (
							<button
								key={storyline.id}
								css={tabStyles(
									activeStorylineId === storyline.id,
									i === 0,
								)}
								onClick={() =>
									setActiveStorylineId(storyline.id)
								}
								type="button"
							>
								{activeStorylineId === storyline.id ? (
									<>
										<span
											css={[
												numberStyles,
												css`
													color: ${sourcePalette
														.neutral[60]};
												`,
											]}
										>
											{i + 1}
										</span>
										<span
											css={css`
												color: ${sourcePalette
													.neutral[60]};
											`}
										>
											{storyline.title}
										</span>
									</>
								) : (
									<>
										<span css={numberStyles}>{i + 1}</span>
										<span>{storyline.title}</span>
									</>
								)}
							</button>
						))}
					</ScrollableCarousel>
				</div>
				{/* Storyline title */}
				{activeStoryline && (
					<div css={selectedTitleStyles}>{activeStoryline.title}</div>
				)}
				{/* Content by categories */}
				<div css={contentStyles}>
					{activeStoryline?.categories.map((category, idx) => (
						<div key={idx} css={contentCss}>
							{category.title !== 'Key Stories' && (
								<h2 css={categoryTitleCss}>{category.title}</h2>
							)}
							<FlexibleGeneral
								groupedTrails={category.groupedTrails}
								imageLoading={'eager'}
								aspectRatio={'5:4'}
								collectionId={0}
								containerLevel="Secondary"
								storylinesStyle={true}
							/>
						</div>
					))}
				</div>
				{/* Context on article date range */}
				<div css={articleCountAndDateRangeStyle}>
					{`These storylines were curated from articles published ${formatDateRangeText(
						storylinesContent.earliestArticleTime,
						storylinesContent.latestArticleTime,
					)}. Some articles may be older to provide further context.`}
				</div>
			</StorylineSection>
		</>
	);
};
