import { TagPage } from 'src/types/tagPage';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { DCRFrontCard, DCRGroupedTrails, TreatType } from 'src/types/front';
import { StorylineTabContent } from './StorylineTabContent';
import { StorylineSection } from './StorylineSection';
import {
	space,
	palette as sourcePalette,
	textSans17,
} from '@guardian/source/foundations';
import { ScrollableCarousel } from './ScrollableCarousel';
import { timeAgo } from '@guardian/libs';

type Storyline = {
	id: string;
	title: string;
	categories: Category[];
};

// probably want to add a generic category type mapping to those in supercharger (e.g. opinions) and map this to a container type and title (e.g. "Contrasting Opinions" + "flexible/general")
export type Category = {
	title: string;
	containerType: string;
	groupedTrails: DCRGroupedTrails;
};

type StorylinesSectionProps = {
	url?: string;
	index: number;
	containerId?: string;
	tagPage: TagPage;
};

type ArticleData = {
	url: string;
	headline: string;
	byline?: string;
	publicationTime: string;
	image?: string;
};

type CategoryContent = {
	category: string;
	articles: ArticleData[];
};

type StorylineContent = {
	title: string;
	description: string;
	content: CategoryContent[];
};

type TPSGContent = {
	created: string;
	tag: string;
	storylines: StorylineContent[];
};

const tabsContainerStyles = css`
	display: flex;
	width: 100%;
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

// importable because we need js to handle the tabs and fetch request
export const StorylinesSection = ({
	url,
	index,
	containerId,
	tagPage,
}: StorylinesSectionProps) => {
	const [storylines, SetStorylines] = useState<TPSGContent>();

	useEffect(() => {
		fetch(
			`http://localhost:9000/api/tag-page-rendering/${tagPage.pageId}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			},
		)
			.then((response) => {
				console.log('response', response);
				return response.json();
			})
			.then((data) => SetStorylines(data))
			.catch((error) => {
				console.error('Error fetching storylines data:', error);
			});
	}, []);

	function decideFormatForArticle(category: CategoryContent): {
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
				return { design: 2, display: 0, theme: 7 };
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
		const format = decideFormatForArticle(category);
		return {
			format: format,
			dataLinkName: '',
			url: article.url,
			headline: article.headline,
			trailText: undefined,
			webPublicationDate: article.publicationTime,
			supportingContent: [],
			discussionApiUrl:
				'https://discussion.theguardian.com/discussion-api',
			byline: article.byline,
			showByline:
				category.category === 'Contrasting Opinions' ? true : false, // could be true if opinion?
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
			avatarUrl: undefined, // will need to be set for opinion pieces
			mainMedia: undefined, // ought to be set for multimedia pieces, but missing the extra info like count?
			isExternalLink: false,
			image: article.image
				? {
						src: article.image,
						altText: article.headline,
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
			url: category.articles[0]?.url || '',
			headline: '',
			trailText: category.articles[0]?.headline,
			webPublicationDate: category.articles[0]?.publicationTime || '',
			supportingContent: supportingContent,
			discussionApiUrl:
				'https://discussion.theguardian.com/discussion-api',
			byline: category.articles[0]?.byline || '',
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
						src: category.articles[0]?.image,
						altText: category.articles[0]?.headline || '',
				  }
				: undefined,
		};
	}

	function decideGroupedTrails(category: CategoryContent): DCRGroupedTrails {
		if (category.category === 'Key Stories') {
			return {
				splash:
					category.articles && category.articles.length > 0
						? [parseKeyStoriesToFrontCard(category)]
						: [],
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
				? category.articles
						.slice(0, 1)
						.map((article) =>
							parseArticleDataToFrontCard(category, article),
						)
				: [];
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
				? category.articles
						.slice(0, 2)
						.map((article) =>
							parseArticleDataToFrontCard(category, article),
						)
				: [];
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
				case 'Find multimedia':
					return 'Multimedia';
				default:
					return category.category;
			}
		}
		return data.storylines.map((storyline, index) => ({
			id: `storyline-${index + 1}`,
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

	if (!parsedStorylines) {
		return null;
	}

	const [activeStorylineId, setActiveStorylineId] = useState<string>(
		parsedStorylines[0]!.id,
	);

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
				pagination={
					index === tagPage.groupedTrails.length - 1
						? tagPage.pagination
						: undefined
				}
				discussionApiUrl={tagPage.config.discussionApiUrl}
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
						{parsedStorylines.map((storyline, index) => (
							<button
								key={storyline.id}
								css={tabStyles(
									activeStorylineId === storyline.id,
									index === 0,
								)}
								onClick={() =>
									setActiveStorylineId(storyline.id)
								}
								type="button"
							>
								{storyline.title}
							</button>
						))}
					</ScrollableCarousel>
				</div>

				{/* Tabs content */}
				<div css={contentStyles}>
					{activeStoryline && (
						<StorylineTabContent
							content={activeStoryline.categories}
						/>
					)}
				</div>
			</StorylineSection>
		</>
	);
};
