import { TagPage } from 'src/types/tagPage';
import { from } from '@guardian/source/foundations';
import { css } from '@emotion/react';
import { useState } from 'react';
import { DCRFrontCard, DCRGroupedTrails, TreatType } from 'src/types/front';
import { StorylineTabContent } from './StorylineTabContent';
import { StorylineSection } from './StorylineSection';
import {
	space,
	palette as sourcePalette,
	textSans17,
} from '@guardian/source/foundations';
import { ScrollableCarousel } from './ScrollableCarousel';

type Storyline = {
	id: string;
	title: string;
	categories: Category[];
};

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
	Storylines: any;
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
// &:hover {
// 		color: ${palette('--section-border-news')};
// 	}

const contentStyles = css`
	padding-top: ${space[0]}px 0;
`;

// importable because we need js to handle the tabs
// gotta plug in actual data through the storylines prop
export const StorylinesSection = ({
	url,
	index,
	containerId,
	tagPage,
	Storylines,
}: StorylinesSectionProps) => {
	// const imageLoading = index > 0 ? 'lazy' : 'eager';

	const keyStoriesTest: DCRGroupedTrails = {
		splash: [],
		huge: [],
		veryBig: [],
		big: [],
		snap: [],
		standard: [
			{
				format: { design: 0, display: 0, theme: 0 },
				dataLinkName: 'news | group-0 | card-@1',
				url: '',
				headline:
					'The former prince remains under scrutiny as Buckingham Palace finalises plans for his future as a commoner',
				trailText: undefined,
				starRating: undefined,
				webPublicationDate: '2025-10-31T19:24:41.000Z',
				kickerText: undefined,
				supportingContent: [],
				discussionApiUrl:
					'https://discussion.theguardian.com/discussion-api',
				discussionId: undefined,
				byline: 'Caroline Davies, Anna Isaac, Neha Gohil and Vikram Dodd',
				showByline: false,
				snapData: {},
				isBoosted: false,
				boostLevel: 'default',
				isImmersive: false,
				isCrossword: false,
				isNewsletter: false,
				showQuotedHeadline: false,
				showLivePlayable: false,
				avatarUrl: undefined,
				mainMedia: undefined,
				isExternalLink: false,
				embedUri: undefined,
				branding: undefined,
				slideshowImages: undefined,
				showVideo: false,
				image: {
					src: 'https://media.guim.co.uk/ac0a66808c4ec3c978ee1afc0e8e5ad50109ca57/130_0_2657_2126/master/2657.jpg',
					altText:
						'Andrew Mountbatten Windsor, formerly Prince Andrew',
				},
			},
			{
				format: { design: 0, display: 0, theme: 0 },
				dataLinkName: 'news | group-0 | card-@2',
				url: '/uk-news/2025/oct/31/ex-prince-andrew-should-answer-us-questions-on-epstein-if-asked-uk-minister-says',
				headline:
					'Ex-prince Andrew should answer US questions on Epstein if asked, UK minister says',
				trailText:
					'Chris Bryant says government welcomes king’s decision on his brother, who is now ‘ordinary member of the public’',
				starRating: undefined,
				webPublicationDate: '2025-10-31T12:07:02.000Z',
				kickerText: undefined,
				supportingContent: [],
				discussionApiUrl:
					'https://discussion.theguardian.com/discussion-api',
				discussionId: undefined,
				byline: 'Caroline Davies',
				showByline: false,
				snapData: {},
				isBoosted: false,
				boostLevel: 'default',
				isImmersive: false,
				isCrossword: false,
				isNewsletter: false,
				showQuotedHeadline: false,
				showLivePlayable: false,
				avatarUrl: undefined,
				mainMedia: undefined,
				isExternalLink: false,
				embedUri: undefined,
				branding: undefined,
				slideshowImages: undefined,
				showVideo: false,
			},
			{
				format: { design: 0, display: 0, theme: 0 },
				dataLinkName: 'news | group-0 | card-@3',
				url: '/uk-news/2025/oct/31/buckingham-palace-statement-andrew-virginia-giuffre-family',
				headline:
					'Palace’s statement on Andrew is ‘vindication’ for Virginia Giuffre, says her family',
				trailText:
					'Women’s rights groups say announcement sends important message to survivors of abuse',
				starRating: undefined,
				webPublicationDate: '2025-10-31T18:54:04.000Z',
				kickerText: undefined,
				supportingContent: [],
				discussionApiUrl:
					'https://discussion.theguardian.com/discussion-api',
				discussionId: undefined,
				byline: 'Neha Gohil',
				showByline: false,
				snapData: {},
				isBoosted: false,
				boostLevel: 'default',
				isImmersive: false,
				isCrossword: false,
				isNewsletter: false,
				showQuotedHeadline: false,
				showLivePlayable: false,
				avatarUrl: undefined,
				mainMedia: undefined,
				isExternalLink: false,
				embedUri: undefined,
				branding: undefined,
				slideshowImages: undefined,
				showVideo: false,
			},
			{
				format: { design: 6, display: 0, theme: 0 },
				dataLinkName: 'analysis | group-0 | card-@4',
				url: '/uk-news/2025/oct/31/andrew-royal-behaviour-analysis',
				headline:
					'Stupidity and royal self-entitlement sank Andrew, and it may not be over yet',
				trailText:
					'Indulged by his mother and ignored for too long by his siblings, it is behaviour like Andrew’s that could ultimately kill the monarchy',
				starRating: undefined,
				webPublicationDate: '2025-10-31T16:18:55.000Z',
				kickerText: undefined,
				supportingContent: [],
				discussionApiUrl:
					'https://discussion.theguardian.com/discussion-api',
				discussionId: undefined,
				byline: 'Stephen Bates',
				showByline: false,
				snapData: {},
				isBoosted: false,
				boostLevel: 'default',
				isImmersive: false,
				isCrossword: false,
				isNewsletter: false,
				showQuotedHeadline: false,
				showLivePlayable: false,
				avatarUrl: undefined,
				mainMedia: undefined,
				isExternalLink: false,
				embedUri: undefined,
				branding: undefined,
				slideshowImages: undefined,
				showVideo: false,
			},
			{
				format: { design: 10, display: 0, theme: 0 },
				dataLinkName: 'feature | group-0 | card-@5',
				url: '/uk-news/2025/oct/31/what-does-it-mean-to-be-plain-old-andrew-mountbatten-windsor',
				headline:
					'What does it mean to be plain old Andrew Mountbatten Windsor?',
				trailText:
					'The prince-turned-commoner may be ‘humiliated’ say experts, but he is still eighth in line to the British throne',
				starRating: undefined,
				webPublicationDate: '2025-10-31T14:20:25.000Z',
				kickerText: undefined,
				supportingContent: [],
				discussionApiUrl:
					'https://discussion.theguardian.com/discussion-api',
				discussionId: undefined,
				byline: 'Mark Brown',
				showByline: false,
				snapData: {},
				isBoosted: false,
				boostLevel: 'default',
				isImmersive: false,
				isCrossword: false,
				isNewsletter: false,
				showQuotedHeadline: false,
				showLivePlayable: false,
				avatarUrl: undefined,
				mainMedia: undefined,
				isExternalLink: false,
				embedUri: undefined,
				branding: undefined,
				slideshowImages: undefined,
				showVideo: false,
			},
		],
	};

	const profilesTest: DCRGroupedTrails = {
		snap: [],
		huge: [],
		veryBig: [],
		big: [],
		splash: [],
		standard: [
			{
				format: { design: 18, display: 1, theme: 0 },
				dataLinkName: 'news | group-2 | card-@1',
				url: '/global-development/ng-interactive/2025/oct/23/give-me-shelter-protecting-trafficked-children-in-the-us-documentary',
				headline: 'Protecting trafficked children in the US  ',
				trailText:
					'Tina Frundt is one of Washington DC’s most experienced specialists in protecting children from sex trafficking, where she fights to create an environment where some of America’s most vulnerable children can feel safe again<br>',
				starRating: undefined,
				webPublicationDate: '2025-10-23T11:26:32.000Z',
				kickerText: undefined,
				supportingContent: [],
				discussionApiUrl:
					'https://discussion.theguardian.com/discussion-api',
				discussionId: undefined,
				byline: 'Tom Silverstone,Laurence Topham, Mei-Ling McNamara, Alex Zepherin, Annie Kelly and Lindsay Poulton',
				showByline: false,
				snapData: {},
				isBoosted: false,
				boostLevel: 'megaboost',
				isImmersive: true,
				isCrossword: false,
				isNewsletter: false,
				showQuotedHeadline: false,
				showLivePlayable: false,
				avatarUrl: undefined,
				mainMedia: undefined,
				isExternalLink: false,
				embedUri: undefined,
				branding: {
					brandingType: { name: 'sponsored' },
					sponsorName: 'guardian.org',
					logo: {
						src: 'https://static.theguardian.com/commercial/sponsor/22/Feb/2024/8bbc828b-40bc-4192-bcf5-4276633928a0-Guardian.orglogos-for badge.png',
						dimensions: { width: 280, height: 180 },
						link: 'https://theguardian.org/',
						label: 'Supported by',
					},
					logoForDarkBackground: {
						src: 'https://static.theguardian.com/commercial/sponsor/22/Feb/2024/9e2b2b2a-c00d-4bba-9bd3-a1ef64333250-guardian.org new logo - white version (3).png',
						dimensions: { width: 280, height: 180 },
						link: 'https://theguardian.org/',
						label: 'Supported by',
					},
					aboutThisLink:
						'https://www.theguardian.com/global-development/2021/feb/21/about-the-rights-and-freedom-series',
				},
				slideshowImages: undefined,
				showVideo: false,
				image: {
					src: 'https://media.guim.co.uk/4a01714059e279b55b0524c5fc545f577c0096fb/348_115_6683_5349/master/6683.jpg',
					altText:
						'Since founding Courtney’s House in 2008, Tina Frundt, 49, believes that her organization has helped about 2000 survivors of sex trafficking. Her current case load of 72 survivors means non-stop phone calls and texts, helping to find placement for people, get counseling for others, and lending an ear to some who just need to be heard.',
				},
			},
		],
	};

	const opinionTest: DCRGroupedTrails = {
		snap: [],
		huge: [],
		veryBig: [],
		big: [],
		splash: [],
		standard: [
			{
				format: { design: 8, display: 0, theme: 1 },
				dataLinkName: 'comment | group-0 | card-@3',
				url: '/commentisfree/2025/oct/31/budget-lobbying-rachel-reeves-taxes-labour',
				headline:
					'The crescendo of pre-budget lobbying has rarely been so loud. Rachel Reeves must tune it out ',
				trailText:
					'There is no popular way to raise taxes, and with Labour tanking in the polls, my advice to the chancellor is this: do it anyway, says Guardian columnist Polly Toynbee',
				starRating: undefined,
				webPublicationDate: '2025-10-31T12:00:04.000Z',
				kickerText: undefined,
				supportingContent: [],
				discussionApiUrl:
					'https://discussion.theguardian.com/discussion-api',
				discussionId: '/p/x3hkpb',
				byline: 'Polly Toynbee',
				showByline: true,
				snapData: {},
				isBoosted: false,
				boostLevel: 'default',
				isImmersive: false,
				isCrossword: false,
				isNewsletter: false,
				showQuotedHeadline: true,
				showLivePlayable: false,
				avatarUrl:
					'https://uploads.guim.co.uk/2017/10/09/Polly_Toynbee,_L.png',
				mainMedia: undefined,
				isExternalLink: false,
				embedUri: undefined,
				branding: undefined,
				slideshowImages: undefined,
				showVideo: false,
				image: {
					src: 'https://media.guim.co.uk/7974a087c23b98d8545c54014436fedce0301162/105_0_6830_5464/master/6830.jpg',
					altText: 'a Betfred shop',
				},
			},
			{
				format: { design: 8, display: 0, theme: 1 },
				dataLinkName: 'comment | group-0 | card-@4',
				url: '/commentisfree/2025/oct/31/lily-allen-new-album-singer-lyrics-open-marriage-women',
				headline:
					'Lily Allen’s new album shows the pain behind the ‘cool girl’ myth – that’s why women are obsessed with it',
				trailText:
					'The singer’s lyrics about an open marriage gone sour resonate with many women her age. They’re sick of pretending to be fine with relationships that are not, says Guardian columnist Gaby Hinsliff',
				starRating: undefined,
				webPublicationDate: '2025-10-31T08:00:21.000Z',
				kickerText: undefined,
				supportingContent: [],
				discussionApiUrl:
					'https://discussion.theguardian.com/discussion-api',
				discussionId: undefined,
				byline: 'Gaby Hinsliff',
				showByline: true,
				snapData: {},
				isBoosted: false,
				boostLevel: 'default',
				isImmersive: false,
				isCrossword: false,
				isNewsletter: false,
				showQuotedHeadline: true,
				showLivePlayable: false,
				avatarUrl:
					'https://uploads.guim.co.uk/2017/10/06/Gaby-Hinsliff,-L.png',
				mainMedia: undefined,
				isExternalLink: false,
				embedUri: undefined,
				branding: undefined,
				slideshowImages: undefined,
				showVideo: false,
				image: {
					src: 'https://media.guim.co.uk/ab089722bdfe525d2356abc0ef1aa242d1a01795/651_148_3910_3128/master/3910.jpg',
					altText:
						'Lily Allen with former partner David Harbour at the 2022 Met Gala in New York, May 2022',
				},
			},
		],
	};

	const explainersTest: DCRGroupedTrails = {
		splash: [],
		snap: [],
		huge: [],
		veryBig: [],
		big: [],
		standard: [
			{
				format: { design: 0, display: 0, theme: 2 },
				dataLinkName: 'news | group-0 | card-@3',
				url: '/football/2025/oct/31/premier-league-manchester-united-v-newcastle-only-boxing-day-game',
				headline:
					'Premier League confirms Manchester United v Newcastle is only Boxing Day game',
				trailText:
					'The Premier League has confirmed there will be only one Premier League game on Boxing Day, with Manchester United to host Newcastle United at 8pm',
				starRating: undefined,
				webPublicationDate: '2025-10-31T16:42:12.000Z',
				kickerText: 'Football',
				supportingContent: undefined,
				discussionApiUrl:
					'https://discussion.theguardian.com/discussion-api',
				discussionId: undefined,
				byline: 'Jamie Jackson',
				showByline: false,
				snapData: {},
				isBoosted: false,
				boostLevel: 'default',
				isImmersive: false,
				isCrossword: false,
				isNewsletter: false,
				showQuotedHeadline: false,
				showLivePlayable: false,
				avatarUrl: undefined,
				mainMedia: undefined,
				isExternalLink: false,
				embedUri: undefined,
				branding: undefined,
				slideshowImages: undefined,
				showVideo: false,
				image: {
					src: 'https://media.guim.co.uk/13af9a8e72998c677740a763c0bd830fae9f6f58/294_167_2923_2339/master/2923.jpg',
					altText: 'A Newcastle fan dressed as Santa last December. ',
				},
			},
			{
				format: { design: 0, display: 0, theme: 2 },
				dataLinkName: 'news | group-0 | card-@4',
				url: '/sport/2025/oct/31/liam-lawson-cleared-of-blame-by-fia-for-marshals-scare-at-mexico-grand-prix',
				headline:
					'Lawson cleared of blame by FIA for marshals scare at Mexico GP',
				trailText:
					'The FIA have absolved Liam Lawson of all blame in an exceptionally dangerous incident when he came close to hitting two marshals running across the track at the Mexico Grand Prix',
				starRating: undefined,
				webPublicationDate: '2025-10-31T17:47:16.000Z',
				kickerText: 'Formula One',
				supportingContent: undefined,
				discussionApiUrl:
					'https://discussion.theguardian.com/discussion-api',
				discussionId: undefined,
				byline: 'Giles Richards',
				showByline: false,
				snapData: {},
				isBoosted: false,
				boostLevel: 'default',
				isImmersive: false,
				isCrossword: false,
				isNewsletter: false,
				showQuotedHeadline: false,
				showLivePlayable: false,
				avatarUrl: undefined,
				mainMedia: undefined,
				isExternalLink: false,
				embedUri: undefined,
				branding: undefined,
				slideshowImages: undefined,
				showVideo: false,
				image: {
					src: 'https://media.guim.co.uk/c59f817b6d1bc49ba73a62798482e9f38feaa053/75_152_2298_1838/master/2298.jpg',
					altText:
						'Liam Lawson of Racing Bulls came close to hitting two marshals running across the track in front of him at the Mexico Grand Prix',
				},
			},
		],
	};

	const multimediaTest: DCRFrontCard[] = [
		{
			format: { design: 2, display: 0, theme: 7 },
			dataLinkName: 'media | group-0 | card-@1',
			url: '/money/gallery/2025/oct/31/stylish-bungalows-for-sale-in-england-in-pictures',
			headline: 'Stylish bungalows for sale in England – in pictures',
			trailText:
				'From a home clad in flint built to be self-sufficient and off-grid, to a light-filled horseshoe shape with timber cladding and curved walls',
			starRating: undefined,
			webPublicationDate: '2025-10-31T07:00:19.000Z',
			kickerText: 'Fantasy house hunt',
			supportingContent: [],
			discussionApiUrl:
				'https://discussion.theguardian.com/discussion-api',
			discussionId: undefined,
			byline: 'Anna White',
			showByline: false,
			snapData: {},
			isBoosted: false,
			boostLevel: 'default',
			isImmersive: false,
			isCrossword: false,
			isNewsletter: false,
			showQuotedHeadline: false,
			showLivePlayable: false,
			avatarUrl: undefined,
			mainMedia: { type: 'Gallery', count: '5' },
			isExternalLink: false,
			embedUri: undefined,
			branding: undefined,
			slideshowImages: undefined,
			showVideo: false,
			image: {
				src: 'https://media.guim.co.uk/76744befd3a323240b5761120855954b38e50d58/471_14_3343_2675/master/3343.jpg',
				altText: 'FHH : Bungalows : Portesham, Dorset',
			},
		},
		{
			format: { design: 2, display: 0, theme: 7 },
			dataLinkName: 'media | group-2 | card-@1',
			url: '/artanddesign/gallery/2025/oct/31/the-week-around-the-world-in-20-pictures',
			headline: 'The week around the world in 20 pictures',
			trailText:
				'Hurricane Melissa, Russian strikes on Kyiv, displacement in Sudan and Trump’s meeting with Xi in Busan: the past seven days as captured by the world’s leading photojournalists',
			starRating: undefined,
			webPublicationDate: '2025-10-31T19:00:04.000Z',
			kickerText: undefined,
			supportingContent: [],
			discussionApiUrl:
				'https://discussion.theguardian.com/discussion-api',
			discussionId: undefined,
			byline: 'Jim Powell',
			showByline: false,
			snapData: {},
			isBoosted: false,
			boostLevel: 'default',
			isImmersive: false,
			isCrossword: false,
			isNewsletter: false,
			showQuotedHeadline: false,
			showLivePlayable: false,
			avatarUrl: undefined,
			mainMedia: { type: 'Gallery', count: '20' },
			isExternalLink: false,
			embedUri: undefined,
			branding: undefined,
			slideshowImages: undefined,
			showVideo: false,
			image: {
				src: 'https://media.guim.co.uk/420ab8b9f2645a08f35a08bd1807a8e6dc10b04d/161_0_4049_3240/master/4049.jpg',
				altText:
					'A woman holds a child at the site of a Russian strike on a residential area in Zaporizhzhia',
			},
		},
	];

	const multimediaTestGrouped: DCRGroupedTrails = {
		splash: [],
		huge: [],
		veryBig: [],
		big: [],
		snap: [],
		standard: multimediaTest,
	};

	const categories1Test: Category[] = [
		{
			title: 'Key Stories',
			containerType: 'flexible/special',
			groupedTrails: keyStoriesTest,
		},
		{
			title: 'Contrasting Opinions',
			containerType: 'flexible/general',
			groupedTrails: opinionTest,
		},
		{
			title: 'Explainers',
			containerType: 'flexible/general',
			groupedTrails: explainersTest,
		},
		{
			title: 'Deep Reads',
			containerType: 'flexible/general',
			groupedTrails: profilesTest,
		},
		{
			title: 'Multimedia',
			containerType: 'flexible/general',
			groupedTrails: multimediaTestGrouped,
		},
		{
			title: 'Profiles',
			containerType: 'flexible/general',
			groupedTrails: profilesTest,
		},
	];
	const categories2Test: Category[] = [
		{
			title: 'Key Stories',
			containerType: 'flexible/special',
			groupedTrails: keyStoriesTest,
		},
		{
			title: 'Test test',
			containerType: 'flexible/general',
			groupedTrails: profilesTest,
		},
		{
			title: 'Blah blah',
			containerType: 'flexible/general',
			groupedTrails: profilesTest,
		},
	];

	const testStorylines: Storyline[] = [
		{
			id: 'storyline-1',
			title: 'Russian drone incursions in NATO airspace',
			categories: categories1Test,
		},
		{
			id: 'storyline-2',
			title: 'Zaporizhzhia nuclear plant power crisis',
			categories: categories2Test,
		},
		{
			id: 'storyline-3',
			title: 'Ukrainian energy infrastructure under sustained Russian attack',
			categories: categories2Test,
		},
		{
			id: 'storyline-4',
			title: `Trump's evolving approach to ending the war`,
			categories: categories2Test,
		},
	];

	const [activeStorylineId, setActiveStorylineId] = useState<string>(
		testStorylines[0]!.id,
	);

	const activeStoryline = testStorylines.find(
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
						carouselLength={Math.ceil(testStorylines.length)}
						visibleCarouselSlidesOnMobile={2}
						visibleCarouselSlidesOnTablet={4}
						sectionId={'sectionId'}
						shouldStackCards={{ desktop: false, mobile: false }}
						gapSizes={{ column: 'large', row: 'medium' }}
					>
						{testStorylines.map((storyline, index) => (
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
