import { css } from '@emotion/react';
import { timeAgo } from '@guardian/libs';
import {
	from,
	headlineLight50,
	palette as sourcePalette,
	space,
	textSans14,
	textSans17,
	textSansBold34,
} from '@guardian/source/foundations';
import { useState } from 'react';
import type { DCRFrontCard, DCRGroupedTrails, TreatType } from '../types/front';
import type { TagPage } from '../types/tagPage';
import type {
	ArticleData,
	CategoryContent,
	Storyline,
	TPSGContent,
} from '../types/tagPageAIContent';
import { ScrollableCarousel } from './ScrollableCarousel';
import { StorylineSection } from './StorylineSection';
import { StorylineTabContent } from './StorylineTabContent';

type StorylinesSectionProps = {
	url?: string;
	index: number;
	containerId?: string;
	tagPage: TagPage;
	TPSGContent?: TPSGContent;
};

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

	function decideFormatForArticle(
		category: CategoryContent,
		article: ArticleData,
	): {
		design: number;
		display: number;
		theme: number;
	} {
		switch (category.category) {
			case 'Contrasting opinions':
				return { design: 8, display: 0, theme: 1 };
			case 'Deep Reads':
				return { design: 10, display: 0, theme: 0 };
			case 'Explainers':
				return { design: 0, display: 0, theme: 2 };
			case 'Find multimedia':
				const mediaType = article.image?.mediaData?.type;
				if (
					mediaType === 'YoutubeVideo' ||
					mediaType === 'SelfHostedVideo'
				) {
					return { design: 4, display: 0, theme: 7 };
				} else if (mediaType === 'Audio') {
					return { design: 3, display: 0, theme: 7 };
				} else if (mediaType === 'Gallery') {
					return { design: 2, display: 0, theme: 7 };
				} else {
					return { design: 0, display: 0, theme: 7 };
				}
			case 'Profiles and Interviews':
				return { design: 18, display: 1, theme: 0 };
			default:
				return { design: 0, display: 0, theme: 0 };
		}
	}

	function parseArticleDataToFrontCard(
		category: CategoryContent,
		article: ArticleData,
	): DCRFrontCard {
		const format = decideFormatForArticle(category, article);
		return {
			format,
			dataLinkName: '',
			url: article.url,
			headline: article.headline,
			trailText: undefined,
			webPublicationDate: article.publicationTime,
			supportingContent: [],
			discussionApiUrl:
				'https://discussion.theguardian.com/discussion-api',
			byline: article.byline ?? '',
			showByline:
				category.category === 'Contrasting opinions' ? true : false, // could be true if opinion?
			boostLevel:
				category.category === 'Profiles and Interviews' ||
				category.category === 'Deep Reads'
					? 'megaboost'
					: 'default',
			isImmersive:
				category.category === 'Profiles and Interviews' ||
				category.category === 'Deep Reads'
					? true
					: false, //would be true for profiles/deep reads?
			showQuotedHeadline: false,
			showLivePlayable: false,
			avatarUrl:
				category.category === 'Contrasting opinions' &&
				article.image?.isAvatar
					? article.image?.src
					: undefined, // will need to be set for opinion pieces
			// mainMedia: undefined, // ought to be set for multimedia pieces, but missing the extra info like count?
			mainMedia:
				category.category === 'Find multimedia' &&
				article.image?.mediaData
					? article.image?.mediaData
					: undefined,
			isExternalLink: false,
			image: article.image
				? {
						src: article.image.src,
						altText: article.image.altText || '',
				  }
				: undefined,
		};
	}

	function parseKeyStoriesToFrontCard(
		category: CategoryContent,
	): DCRFrontCard {
		const supportingContent = category.articles
			.slice(1, 5)
			.map((article) => {
				const articleAge =
					article.publicationTime &&
					timeAgo(
						new Date(article.publicationTime).getTime(),
					).toString();
				return {
					headline: article.headline,
					url: article.url,
					kickerText: articleAge,
					format: { design: 0, display: 0, theme: 0 },
				};
			});

		return {
			format: { design: 0, display: 0, theme: 0 },
			dataLinkName: '',
			url: category.articles[0]?.url ?? '',
			headline: '',
			trailText: '',
			webPublicationDate: '',
			supportingContent,
			discussionApiUrl:
				'https://discussion.theguardian.com/discussion-api',
			byline: category.articles[0]?.byline ?? '',
			showByline: false,
			boostLevel: 'boost',
			isImmersive: false,
			showQuotedHeadline: false,
			showLivePlayable: false,
			avatarUrl: undefined,
			mainMedia: undefined,
			isExternalLink: false,
			image: category.articles[0]?.image
				? {
						src: category.articles[0]?.image.src,
						altText: category.articles[0]?.image.altText || '',
				  }
				: undefined,
		};
	}

	function decideGroupedTrails(category: CategoryContent): DCRGroupedTrails {
		if (category.category === 'Key Stories') {
			return {
				splash: [parseKeyStoriesToFrontCard(category)],
				huge: [],
				veryBig: [],
				big: [],
				snap: [],
				standard: [],
			};
		} else if (
			category.category === 'Profiles and Interviews' ||
			category.category === 'Deep Reads'
		) {
			const frontCards = category.articles
				.slice(0, 1)
				.map((article) =>
					parseArticleDataToFrontCard(category, article),
				);
			return {
				splash: [],
				huge: [],
				veryBig: [],
				big: [],
				snap: [],
				standard: frontCards,
			};
		} else {
			const frontCards = category.articles
				.slice(0, 2)
				.map((article) =>
					parseArticleDataToFrontCard(category, article),
				);
			return {
				splash: [],
				huge: [],
				veryBig: [],
				big: [],
				snap: [],
				standard: frontCards,
			};
		}
	}

	function parseTPSGContentToStorylines(data: TPSGContent): Storyline[] {
		function decideCategoryTitle(category: CategoryContent): string {
			switch (category.category) {
				case 'Key Stories':
					return '';
				case 'Contrasting opinions':
					return 'Opinions';
				case 'Find multimedia':
					return 'Multimedia';
				default:
					return category.category;
			}
		}
		return data.storylines.map((storyline, i) => ({
			id: `storyline-${i + 1}`,
			title: storyline.title,
			categories: storyline.content.map((category) => ({
				title: decideCategoryTitle(category),
				containerType: 'flexible/general',
				groupedTrails: decideGroupedTrails(category),
			})),
		}));
	}

	const parsedStorylines =
		storylines && parseTPSGContentToStorylines(storylines);
	// parseTPSGContentToStorylines(mockData);

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
					{activeStoryline && (
						<StorylineTabContent
							content={activeStoryline.categories}
						/>
					)}
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
