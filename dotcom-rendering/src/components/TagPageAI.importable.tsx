import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import {
	Accordion,
	AccordionRow,
	SvgAlertRound,
} from '@guardian/source/react-components';
import { ErrorSummary } from '@guardian/source-development-kitchen/react-components';
import { Footer } from './ExpandableAtom/Footer';
import { title } from 'process';
import { TagPageAICarousel } from './TagPageAICarousel';
import { ScrollableFeature } from './ScrollableFeature.importable';
import { FeatureCard } from './FeatureCard';

const card = {
	format: {
		design: 0,
		display: 0,
		theme: 2,
	},
	dataLinkName: 'news | group-0 | card-@1',
	url: '/sport/2025/jul/09/christian-horner-sacked-by-red-bull-after-20-years-as-principal-at-f1-team',
	headline:
		'Christian Horner sacked by Red Bull after 20 years as principal at F1 team',
	trailText:
		'The Red Bull team principal Christian Horner has been sacked by the Formula One team after 20 years at the helm',
	webPublicationDate: '2025-07-09T09:32:28.000Z',
	supportingContent: [],
	discussionApiUrl:
		'https://discussion.code.dev-theguardian.com/discussion-api',
	byline: 'Giles Richards',
	showByline: false,
	snapData: {},
	isBoosted: false,
	boostLevel: undefined,
	isImmersive: false,
	isCrossword: false,
	isNewsletter: false,
	showQuotedHeadline: false,
	showLivePlayable: false,
	isExternalLink: false,
	showVideo: false,
	image: {
		src: 'https://media.guim.co.uk/b90da4c7724b3532c5ae2fb639d745afa5d8a563/334_0_3215_2572/master/3215.jpg',
		altText: 'Christian Horner',
	},
};

const containerPalette = undefined;
const absoluteServerTimes = true;
const imageLoading = 'eager';
const aspectRatio = '4:5';
const collectionId = 1;
const isInHideTrailsAbTest = false;

export type VignetteType =
	| 'storySoFar'
	| 'timeline'
	| 'deeperDive'
	| 'views'
	| 'keyQuestion'
	| 'opinions';
export type Vignette = {
	vignetteType: VignetteType;
	title: string; //used in ssf or key question title
	keyQuestion?: string; //used in key question
	description?: string; //used in story so far or key question description
	article?: {
		//used as if you read one thing in ssf or pivotal article in dd
		url?: string;
		heading?: string;
		summary?: string;
	};
	timeline?: {
		timelineItems: {
			date?: string;
			title?: string;
			description?: string;
		}[];
	};
	keyQuote?: string;
	views?: {
		quote: string;
		quoteSource?: string;
		article: {
			url: string;
			heading: string;
		};
	}[];
};
export type StorylineSample = {
	storylineTitle: string;
	vignette: Vignette[];
};
const paddingStyles = css`
	padding-bottom: 20px;
	padding-top: 10px;
	margin-right: -320px;
`;
//adjust margin depending on the width of the screen

const genData = {
	earliestArticle: '2025-07-23T07:00:45Z',
	latestArticle: '2025-07-27T21:05:59Z',
	otherNotes:
		'The Belgian Grand Prix at Spa-Francorchamps was the main focus during this period, with significant coverage of both the race weekend events and broader organizational changes within Red Bull Racing.',
	results: [
		{
			title: 'Belgian Grand Prix',
			description:
				"The Belgian Grand Prix at Spa-Francorchamps dominated coverage, featuring Oscar Piastri's victory in challenging wet weather conditions, McLaren's front-row lockout in qualifying, and weather-related delays that sparked debate about race start procedures.",
			supportingArticleUrls: [
				'https://www.theguardian.com/sport/2025/jul/27/oscar-piastri-wins-belgian-f1-grand-prix-formula-one-lando-norris-charles-leclerc',
				'https://www.theguardian.com/sport/2025/jul/27/max-verstappen-decries-delayed-belgian-grand-prix-race-start-due-to-wet-weather-george-russell',
				'https://www.theguardian.com/sport/2025/jul/26/max-verstappen-formula-one-sprint-race-belgian-grand-prix',
			],
		},
		{
			title: 'Red Bull Leadership',
			description:
				"Major upheaval at Red Bull Racing with Christian Horner's departure after 20 years as team principal, replaced by Laurent Mekies. This significant change has implications for Max Verstappen's future with the team and marks the end of an era for one of F1's most successful partnerships.",
			supportingArticleUrls: [
				'https://www.theguardian.com/sport/2025/jul/25/red-bull-go-full-throttle-for-laurent-mekies-as-enthralling-new-era-begins-at-spa',
				'https://www.theguardian.com/sport/2025/jul/24/horner-exit-wont-influence-my-future-verstappen-on-whether-he-stays-at-red-bull',
				'https://www.theguardian.com/sport/2025/jul/10/no-guarantees-for-red-bull-that-horners-sacking-will-keep-verstappen',
				'https://www.theguardian.com/sport/2025/jul/10/christian-horner-red-bull-f1-sacking-farewell-speech',
				'https://www.theguardian.com/sport/2025/jul/09/christian-horner-red-bull-exit-end-of-era-formula-one',
				'https://www.theguardian.com/sport/2025/jul/09/christian-horner-sacked-by-red-bull-after-20-years-as-principal-at-f1-team',
			],
		},
		{
			title: 'Spa Circuit Future',
			description:
				"Concerns about Spa-Francorchamps' long-term place on the F1 calendar, with the historic Belgian circuit facing challenges to maintain its position despite being considered the 'heart and soul' of Formula One, highlighting the tension between traditional venues and F1's commercial expansion.",
			supportingArticleUrls: [
				'https://www.theguardian.com/sport/2025/jul/23/f1s-heart-and-soul-lies-in-spa-but-the-clamour-for-glamour-puts-it-at-risk',
			],
		},
	],
};

type Result = {
	name: string;
	whyImportant: string;
	quote: string;
	link: string;
	image: {
		url: string;
		altText: string;
		credit: string;
	};
};

// type NewsHighlightsProps = {
// 	earliestArticle?: string;
// 	latestArticle?: string;
// 	otherNotes?: string;
// 	results: Result[];
// };

const grid = css`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	gap: 2rem;
	padding: 2rem;
`;

const cardCss = css`
	background: #fff;
	border-radius: 16px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;

const content = css`
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

const link = css`
	margin-top: auto;
	font-weight: 500;
	color: #0077cc;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

const NewsHighlights = ({ data }: { data: any }) => {
	return (
		<>
			<div>{genData.otherNotes}</div>
			<div css={grid}>
				{genData.results.map((result: any, index: number) => (
					<div key={index} css={cardCss}>
						<div css={content}>
							{result.title}
							{result.description}
							{result.supportingArticleUrls.map(
								(url: string, idx: number) => (
									<a key={idx} href={url} css={link}>
										{url}
									</a>
								),
							)}{' '}
						</div>

						<Footer
							likeHandler={function (): void {
								throw new Error('Function not implemented.');
							}}
							dislikeHandler={function (): void {
								throw new Error('Function not implemented.');
							}}
						/>
					</div>
				))}
			</div>
		</>
	);
};

export const TagPageAI = ({ tag }: { tag?: string }) => {
	const emptyData = {
		earliestArticle: 'Loading...',
		latestArticle: 'Loading...',
		otherNotes: 'Loading...',
		results: [
			{
				name: 'Loading...',
				whyImportant: 'Loading...',
				quote: 'Loading...',
				link: 'Loading...',
				image: {
					url: 'Loading...',
					altText: 'Loading...',
					credit: 'Loading...',
				},
			},
		],
	};

	const [localData, setLocalData] = useState<any>(emptyData);

	useEffect(() => {
		fetch(
			`https://tagpagesupercharger.code.dev-gutools.co.uk/json/themes?tag=sport/formulaone`,
			// fetch(`http://localhost:9000/json/keyorgs?tag=${tag}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			},
		)
			.then((response) => response.json())
			.then((data) => {
				setLocalData(data);
				console.log('here is the data', data);
				console.log('data.results');
				console.log('local', localData);
			})
			.catch((error) => {
				console.error('Error fetching from localhost:9000:', error);
			});
	}, []);

	const label = () => {
		return (
			<>
				<p>test</p>
				<SvgAlertRound />
			</>
		);
	};

	const storylineSample: StorylineSample = {
		storylineTitle: 'Redbull Racing and the Belgian Grand Prix',
		vignette: [
			{
				vignetteType: 'storySoFar',
				title: 'The Story So Far',
				description:
					'A recap of the key events leading up to the Belgian Grand Prix, including Oscar Piastri’s victory and the changes at Red Bull Racing.',
				article: {
					url: 'https://www.theguardian.com/sport/2025/jul/27/oscar-piastri-wins-belgian-f1-grand-prix-formula-one-lando-norris-charles-leclerc',
					heading: 'Oscar Piastri wins Belgian F1 Grand Prix',
					summary:
						'Oscar Piastri clinched victory at the Belgian Grand Prix, showcasing his skill in challenging wet conditions',
				},
			},
			{
				vignetteType: 'timeline',
				title: 'Timeline of Key Events',
				timeline: {
					timelineItems: [
						{
							date: '2025-07-23',
							title: 'Piastri Wins Belgian GP',
							description:
								'Oscar Piastri wins the Belgian Grand Prix at Spa-Francorchamps.',
						},
						{
							date: '2025-07-25',
							title: 'Red Bull Leadership Change',
							description:
								'Christian Horner steps down as Red Bull Racing team principal, replaced by Laurent Mekies.',
						},
						{
							date: '2025-07-27',
							title: 'Concerns Over Spa Circuit Future',
							description:
								'Concerns arise about the long-term future of the Spa-Francorchamps circuit in F1.',
						},
					],
				},
			},
			{
				vignetteType: 'deeperDive',
				title: 'Deeper Dive into Key Themes',
				keyQuote:
					'"The Belgian Grand Prix at Spa-Francorchamps is a testament to the enduring appeal of traditional circuits in the face of modern challenges."',
				article: {
					url: 'https://www.theguardian.com/sport/2025/jul/25/red-bull-go-full-throttle-for-laurent-mekies-as-enthralling-new-era-begins-at-spa',
					heading:
						'Red Bull Racing enters a new era with Laurent Mekies',
					summary:
						'Red Bull Racing embarks on a new chapter with Laurent Mekies as team principal, marking a significant shift in the team’s leadership.',
				},
			},
			{
				vignetteType: 'views',
				title: 'Views',
				views: [
					{
						quote: 'The Belgian Grand Prix is a highlight of the F1 calendar, showcasing the best of racing at Spa.',
						article: {
							url: 'https://www.theguardian.com/sport/2025/jul/26/max-verstappen-formula-one-sprint',
							heading:
								'Max Verstappen reflects on the challenges of the Belgian Grand Prix weekend',
						},
					},
					{
						quote: 'The departure of Christian Horner marks the end of an era for Red Bull Racing.',
						article: {
							url: 'https://www.theguardian.com/sport/2025/jul/24/horner-exit-wont-influence-my-future-verstappen-on-whether-he-stays-at-red-bull',
							heading:
								'Verstappen on Horner’s exit and his future with Red Bull',
						},
					},
				],
			},
			{
				vignetteType: 'keyQuestion',
				title: 'Key Question for Fans',
				keyQuestion:
					'What does the future hold for iconic circuits like Spa-Francorchamps in the evolving world of Formula 1?',
				description:
					'As F1 continues to evolve, the future of traditional circuits like Spa-Francorchamps remains uncertain. Will they adapt to modern demands or fade away?',
				article: {
					url: 'https://www.theguardian.com/sport/2025/jul/23/f1s-heart-and-soul-lies-in-spa-but-the-clamour-for-glamour-puts-it-at-risk',
					heading: 'The future of Spa-Francorchamps in Formula 1',
				},
			},
			{
				vignetteType: 'opinions',
				title: 'Voices and Views',
				views: [
					{
						quote: 'The changes at Red Bull Racing signal a new direction for the team, but will it be enough to keep pace with rivals?',
						quoteSource: 'F1 Analyst',
						article: {
							url: 'https://www.theguardian.com/sport/2025/jul/10/no-guarantees-for-red-bull-that-horners-sacking-will-keep-verstappen',
							heading:
								'Red Bull’s future uncertain after Horner’s departure',
						},
					},
					{
						quote: 'The Belgian Grand Prix remains a fan favorite, but its future is uncertain amidst F1’s commercial pressures.',
						quoteSource: 'F1 Fan',
						article: {
							url: 'https://www.theguardian.com/sport/2025/jul/23/f1s-heart-and-soul-lies-in-spa-but-the-clamour-for-glamour-puts-it-at-risk',
							heading:
								'Is Spa-Francorchamps at risk of losing its place in F1?',
						},
					},
				],
			},
		],
	};

	const StorylineCarousel = ({
		storylineSample,
	}: {
		storylineSample: StorylineSample;
	}) => {
		return (
			<div>
				<TagPageAICarousel
					content={storylineSample}
					hasNavigationBackgroundColour={false}
				/>
			</div>
		);
	};

	return (
		<div
			css={css`
				margin-bottom: 1rem;
			`}
		>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					gap: 4px;
					margin-bottom: 4px;
				`}
			>
				<ErrorSummary
					cssOverrides={css`
						width: full;
					`}
					message="These are AI generated"
				/>

				<Accordion
					cssOverrides={css`
						width: full;
					`}
					children={[
						<AccordionRow label={'What does this mean?'}>
							<p>
								This is a list of key organisations related to
								the tag. It is generated by AI based on the
								articles presented below. Full efforts have been
								made to ensure accuracy; nevertheless we
								encourage reading the articles written by our
								journalists to get the full story, and would be
								grateful for any feedback.
							</p>
						</AccordionRow>,
					]}
				/>
			</div>

			{/* <h1>What are the key themes over the past week?</h1> */}
			{/* <h1>Storyline: {sampleData.storylineTitle}</h1> */}
			<div style={paddingStyles}>
				{/* <pre
					css={css`
						white-space: pre-wrap;
						word-break: break-word;
						padding-bottom: 20px;
					`}
				> */}

				{/* <NewsHighlights data={localData} /> */}

				<h1
					css={css`
						margin-bottom: 0.5rem;
						color: rgb(184, 5, 5);
						font-size: 24px;
						font-family: Guardian Headline;
						font-weight: 700;
					`}
				>
					{storylineSample.storylineTitle}
				</h1>
				<div
					css={css`
						display: flex;
						flex-direction: row;
						gap: 1rem;
					`}
				>
					<div
						css={css`
							width: 28%;
						`}
					>
						<FeatureCard
							linkTo={card.url}
							format={card.format}
							headlineText={card.headline}
							byline={card.byline}
							showByline={card.showByline}
							webPublicationDate={card.webPublicationDate}
							showClock={false}
							image={card.image}
							canPlayInline={false}
							dataLinkName={card.dataLinkName}
							discussionApiUrl={card.discussionApiUrl}
							isExternalLink={card.isExternalLink}
							containerPalette={containerPalette}
							absoluteServerTimes={absoluteServerTimes}
							imageLoading={imageLoading}
							aspectRatio={aspectRatio}
							imageSize="feature"
							headlineSizes={{
								desktop: 'xsmall',
								tablet: 'xxsmall',
								mobile: 'xsmall',
							}}
							trailText={undefined}
							collectionId={collectionId}
							isNewsletter={card.isNewsletter}
							showQuotes={card.showQuotedHeadline}
							showVideo={card.showVideo}
							isInHideTrailsAbTest={isInHideTrailsAbTest}
						/>
					</div>
					<div
						css={css`
							width: 72%;
							height: 100%;
						`}
					>
						<StorylineCarousel storylineSample={storylineSample} />
					</div>
				</div>
				{/* <NewsHighlights data={localData} /> */}

				{/* </pre> */}
			</div>
		</div>
	);
};
