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
import { Hide } from '@guardian/source/react-components';
import { useState } from 'react';
import type { EditionId } from '../lib/edition';
import { parseStorylinesContentToStorylines } from '../model/enhanceTagPageStorylinesContent';
import { palette } from '../palette';
import type { StorylinesContent } from '../types/storylinesContent';
import { FlexibleGeneral } from './FlexibleGeneral';
import { ScrollableCarousel } from './ScrollableCarousel';
import { StorylinesSection } from './StorylinesSection';

type StorylinesSectionProps = {
	url?: string;
	index: number;
	containerId?: string;
	editionId: EditionId;
	storylinesContent?: StorylinesContent;
	pillar?: string;
};

const setSelectedStorylineColour = (pillar?: string) => {
	switch (pillar?.toLowerCase()) {
		case 'news':
			return sourcePalette.news[400];
		case 'opinion':
			return sourcePalette.opinion[400];
		case 'sport':
			return sourcePalette.sport[400];
		case 'culture':
			return sourcePalette.culture[400];
		case 'lifestyle':
			return sourcePalette.lifestyle[400];
		default:
			return sourcePalette.news[400];
	}
};

const selectedTitleStyles = (selectedStorylineColour: string) => css`
	${textSansBold34}
	color: ${selectedStorylineColour};
	margin-bottom: ${space[4]}px;
	margin-top: ${space[2]}px;
	padding-left: 10px; /* aligns with the headlines of the stories below */
`;

const setCategoryColour = (pillar?: string) => {
	switch (pillar?.toLowerCase()) {
		case 'news':
			return sourcePalette.news[300];
		case 'opinion':
			return sourcePalette.opinion[400];
		case 'sport':
			return sourcePalette.sport[300];
		case 'culture':
			return sourcePalette.culture[300];
		case 'lifestyle':
			return sourcePalette.lifestyle[300];
		default:
			return sourcePalette.news[300];
	}
};

const categoryTitleCss = (pillarColour: string) => css`
	${textSans20};
	font-weight: 700;
	color: ${pillarColour};
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
		? `${sourcePalette.neutral[60]}`
		: `${sourcePalette.neutral[38]}`};
	flex: 1;
	min-width: 0;
	display: flex;
	align-items: flex-start; /* Aligns text to the top of each tab */
`;

const contentStyles = css`
	padding-top: ${space[0]}px 0;
`;

const numberStyles = css`
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
		return `articles published since ${format(earliest)}`;
	} else if (latest) {
		return `articles published up to ${format(latest)}`;
	} else {
		return 'recent articles in our archives';
	}
}

/**
 * Used to display the content of the storylines section on specific tag pages.
 *
 * ## Why does this need to be an Island?
 *
 * Selecting a storyline via the tabs (a carousel on mobile) requires javascript.
 */
export const StorylinesSectionContent = ({
	url,
	index,
	containerId,
	storylinesContent,
	editionId,
	pillar,
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

	const selectedStorylineColour = setSelectedStorylineColour(pillar);

	const categoryColour = setCategoryColour(pillar);

	return (
		<>
			<StorylinesSection
				title="Storylines"
				containerPalette="LongRunningAltPalette"
				url={url}
				isTagPage={true}
				showTopBorder={true}
				ophanComponentLink={`container | ${containerId}`}
				ophanComponentName={containerId}
				editionId={editionId}
			>
				{/* Storylines tab selector. This is a carousel on mobile. */}
				<div css={tabsContainerStyles}>
					<ScrollableCarousel
						carouselLength={Math.ceil(parsedStorylines.length)}
						visibleCarouselSlidesOnMobile={2}
						visibleCarouselSlidesOnTablet={4}
						sectionId={'storylines-tabs-carousel'}
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
										<span css={[numberStyles]}>
											{i + 1}
										</span>
										<span>{storyline.title}</span>
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
				{/* Active storyline title */}
				{activeStoryline && (
					<div css={selectedTitleStyles(selectedStorylineColour)}>
						{activeStoryline.title}
					</div>
				)}
				{/* Content by categories */}
				<div css={contentStyles}>
					{activeStoryline?.categories.map((category, idx) => (
						<div key={idx} css={contentCss}>
							{category.title !== 'Key Stories' && (
								<h2 css={categoryTitleCss(categoryColour)}>
									{category.title}
								</h2>
							)}
							<FlexibleGeneral
								groupedTrails={category.groupedTrails}
								imageLoading={'eager'}
								aspectRatio={'5:4'}
								collectionId={index}
								containerLevel="Secondary"
								storylinesStyle={true}
							/>
						</div>
					))}
				</div>
				{/* Context on article date range and mobile AI disclaimer */}
				<div css={articleCountAndDateRangeStyle}>
					<Hide from="leftCol">
						<span>
							This product uses GenAI. Learn more about how it
							works{' '}
							<a href="https://www.theguardian.com/help/insideguardian/2023/jun/16/the-guardians-approach-to-generative-ai">
								here
							</a>
							.{' '}
						</span>
					</Hide>
					{`These storylines were curated from ${formatDateRangeText(
						storylinesContent.earliestArticleTime,
						storylinesContent.latestArticleTime,
					)}. Some articles may be older to provide further context.`}
				</div>
			</StorylinesSection>
		</>
	);
};
