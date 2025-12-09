import { css } from '@emotion/react';
import { FlexibleGeneral } from './FlexibleGeneral';
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
import { parseTPSGContentToStorylines } from '../model/enhanceAITagPageContent';
import { palette } from '../palette';
import { useState } from 'react';
import type { TreatType } from '../types/front';
import type { TagPage } from '../types/tagPage';
import type { TPSGContent } from '../types/tagPageAIContent';
import { ScrollableCarousel } from './ScrollableCarousel';
import { StorylineSection } from './StorylineSection';

type StorylinesSectionProps = {
	url?: string;
	index: number;
	containerId?: string;
	tagPage: TagPage;
	TPSGContent?: TPSGContent;
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
	} /* bit hacky, but looks a touch better on wide. Maybe there's a better way though */
	align-items: stretch; /* Makes all tabs the same height */
	margin-bottom: ${space[6]}px;
	margin-left: -${space[2]}px; /* on mobile at least */
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

// ${textSans17};
// 	font-weight: 700;
const selectedTitleStyles = css`
	${textSansBold34}
	color: ${sourcePalette.news[400]};
	margin-bottom: ${space[4]}px;
	margin-top: ${space[2]}px;
`;

const numberStyles = () => css`
	${headlineLight50}
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
	// If your API returns strings
	const earliest = earliestArticleTime ? new Date(earliestArticleTime) : null;
	const latest = latestArticleTime ? new Date(latestArticleTime) : null;
	const format = (d?: Date | null) => d?.toLocaleDateString('en-GB') ?? '';

	// if (earliest && latest) {
	// 	return `between ${format(earliest)} and ${format(latest)}`;
	// } else
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
	containerId,
	tagPage,
	TPSGContent,
}: StorylinesSectionProps) => {
	console.log('TPSGContent', TPSGContent);
	// const [storylines, SetStorylines] = useState<TPSGContent>();
	const storylines = TPSGContent;

	// useEffect(() => {
	// 	fetch(
	// 		`http://localhost:9000/api/tag-page-rendering/${tagPage.pageId}`,
	// 		{
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			credentials: 'include',
	// 		},
	// 	)
	// 		.then((response) => {
	// 			console.log('response', response);
	// 			return response.json();
	// 		})
	// 		.then((data) => SetStorylines(data))
	// 		.catch((error) => {
	// 			console.error('Error fetching storylines data:', error);
	// 		});
	// }, []);

	const parsedStorylines =
		storylines && parseTPSGContentToStorylines(storylines);

	const [activeStorylineId, setActiveStorylineId] = useState<string>(
		parsedStorylines?.[0]?.id ?? '',
	);

	if (!parsedStorylines || parsedStorylines.length === 0) {
		return null;
	}

	const activeStoryline = parsedStorylines.find(
		(s) => s.id === activeStorylineId,
	);
	const AITreat: TreatType = {
		altText:
			'This content has been generated with the assistance of AI technology.',
		links: [
			{
				text: 'This section was curated with AI.',
				linkTo: 'https://www.theguardian.com/help/insideguardian/2023/jun/16/the-guardians-approach-to-generative-ai',
			},
		],
	};

	/** frontsection with background, title, AI warning on the left,
	 *
	 * section - mostly a copy of frontsection - done?
	 * tabs - tweak style
	 * tab content
	 *  -> container wrapper (category title or not)
	 *  ---> decide container
	 */
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
				toggleable={false} //maybe set to true if this still works?
				pageId={tagPage.pageId}
				editionId={tagPage.editionId}
				treats={[AITreat]}
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
									<span
										css={[
											numberStyles,
											css`
												color: ${sourcePalette
													.news[400]};
											`,
										]}
									>
										{i + 1}
									</span>
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
				{/* Selected title */}
				{activeStoryline && (
					<div css={selectedTitleStyles}>{activeStoryline.title}</div>
				)}
				{/* Tabs content */}
				<div css={contentStyles}>
					{activeStoryline &&
						activeStoryline.categories.map((category, idx) => (
							<div key={idx} css={contentCss}>
								{category.title !== 'Key Stories' && (
									<h2 css={categoryTitleCss}>
										{category.title}
									</h2>
								)}
								<FlexibleGeneral
									groupedTrails={category.groupedTrails}
									imageLoading={'eager'}
									aspectRatio={'5:4'}
									collectionId={0}
									containerLevel="Secondary"
									SCStyle={true}
								/>
							</div>
						))}
				</div>
				<div css={articleCountAndDateRangeStyle}>
					{`These storylines were curated from articles published ${formatDateRangeText(
						storylines.earliestArticleTime,
						storylines.latestArticleTime,
					)}. Some articles may be older to provide further context.`}
				</div>{' '}
			</StorylineSection>
		</>
	);
};
