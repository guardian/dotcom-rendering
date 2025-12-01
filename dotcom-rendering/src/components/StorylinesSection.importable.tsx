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
	textSansBold34,
	headlineBold42,
	headlineLight50,
	from,
	textSans14,
} from '@guardian/source/foundations';
import { ScrollableCarousel } from './ScrollableCarousel';
import { timeAgo } from '@guardian/libs';
import { MainMedia } from 'src/types/mainMedia';

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
	TPSGContent?: TPSGContent;
};

type ImageData = {
	src: string;
	altText: string;
	isAvatar: boolean;
	mediaData: MainMedia | null;
};

type ArticleData = {
	url: string;
	headline: string;
	byline?: string | null;
	publicationTime: string;
	image?: ImageData | null;
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

export type TPSGContent = {
	created: string;
	tag: string;
	storylines: StorylineContent[];
	articleCount?: number | null;
	earliestArticleTime?: string | null;
	latestArticleTime?: string | null;
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
	const format = (d?: Date | null) => d?.toLocaleDateString('en-GB') || '';

	if (earliest && latest) {
		return `between ${format(earliest)} and ${format(latest)}`;
	} else if (earliest) {
		return `since ${format(earliest)}`;
	} else if (latest) {
		return `up to ${format(latest)}`;
	} else {
		return '';
	}
}

// importable because we need js to handle the tabs and fetch request
export const StorylinesSection = ({
	url,
	index,
	containerId,
	tagPage,
	TPSGContent,
}: StorylinesSectionProps) => {
	const [storylines, SetStorylines] = useState<TPSGContent>();
	// const mockData: TPSGContent =
	// {
	//     "created": "2025-11-03T10:44:00.149954278Z",
	//     "tag": "world/ukraine",
	//     "storylines": [
	//         {
	//             "title": "Ukrainian drone warfare innovation and gamification systems",
	//             "description": "The development of Ukraine's innovative drone attack systems that use gaming elements to reward soldiers and improve battlefield effectiveness.",
	//             "content": [
	//                 {
	//                     "category": "Key Stories",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/commentisfree/2023/apr/29/thank-the-lords-someone-is-worried-about-ai-controlled-weapons-systems",
	//                             "headline": "",
	//                             "byline": "John Naughton",
	//                             "publicationTime": "2023-04-29T15:00:39Z",
	//                             "image": {
	//                                 "src": "https://uploads.guim.co.uk/2020/04/12/John_Haughton.jpg",
	//                                 "altText": "John Naughton",
	//                                 "mediaData": null
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/commentisfree/2023/apr/29/thank-the-lords-someone-is-worried-about-ai-controlled-weapons-systems",
	//                             "headline": "Thank the Lords someone is worried about AI-controlled weapons systems",
	//                             "byline": "John Naughton",
	//                             "publicationTime": "2023-04-29T15:00:39Z",
	//                             "image": {
	//                                 "src": "https://uploads.guim.co.uk/2020/04/12/John_Haughton.jpg",
	//                                 "altText": "John Naughton",
	//                                 "mediaData": null
	//                             }
	//                         },
	//                         //   {
	//                         //     "url": "https://www.theguardian.com/commentisfree/2023/apr/29/thank-the-lords-someone-is-worried-about-ai-controlled-weapons-systems",
	//                         //     "headline": "Thank the Lords someone is worried about AI-controlled weapons systems",
	//                         //     "byline": "John Naughton",
	//                         //     "publicationTime": "2023-04-29T15:00:39Z",
	//                         //     "image": {
	//                         //         "src": "https://uploads.guim.co.uk/2020/04/12/John_Haughton.jpg",
	//                         //         "altText": "John Naughton",
	//                         //         "mediaData": null
	//                         //     }
	//                         // },
	//                         //   {
	//                         //     "url": "https://www.theguardian.com/commentisfree/2023/apr/29/thank-the-lords-someone-is-worried-about-ai-controlled-weapons-systems",
	//                         //     "headline": "Thank the Lords someone is worried about AI-controlled weapons systems",
	//                         //     "byline": "John Naughton",
	//                         //     "publicationTime": "2023-04-29T15:00:39Z",
	//                         //     "image": {
	//                         //         "src": "https://uploads.guim.co.uk/2020/04/12/John_Haughton.jpg",
	//                         //         "altText": "John Naughton",
	//                         //         "mediaData": null
	//                         //     }
	//                         // },
	//                         {
	//                             "url": "https://www.theguardian.com/commentisfree/2023/apr/29/thank-the-lords-someone-is-worried-about-ai-controlled-weapons-systems",
	//                             "headline": "Thank the Lords someone is worried about AI-controlled weapons systems",
	//                             "byline": "John Naughton",
	//                             "publicationTime": "2023-04-29T15:00:39Z",
	//                             "image": {
	//                                 "src": "https://uploads.guim.co.uk/2020/04/12/John_Haughton.jpg",
	//                                 "altText": "John Naughton",
	//                                 "mediaData": null
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/commentisfree/2023/apr/29/thank-the-lords-someone-is-worried-about-ai-controlled-weapons-systems",
	//                             "headline": "Thank the Lords someone is worried about AI-controlled weapons systems",
	//                             "byline": "John Naughton",
	//                             "publicationTime": "2023-04-29T15:00:39Z",
	//                             "image": {
	//                                 "src": "https://uploads.guim.co.uk/2020/04/12/John_Haughton.jpg",
	//                                 "altText": "John Naughton",
	//                                 "mediaData": null
	//                             }
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Contrasting opinions",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/commentisfree/2024/feb/13/the-guardian-view-on-the-new-drone-wars-as-prices-fall-casualties-mount",
	//                             "headline": "The Guardian view on the new drone wars: as prices fall, casualties mount",
	//                             "byline": "Editorial",
	//                             "publicationTime": "2024-02-13T19:16:10Z",
	//                             "image": null
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/commentisfree/2023/apr/29/thank-the-lords-someone-is-worried-about-ai-controlled-weapons-systems",
	//                             "headline": "Thank the Lords someone is worried about AI-controlled weapons systems",
	//                             "byline": "John Naughton",
	//                             "publicationTime": "2023-04-29T15:00:39Z",
	//                             "image": {
	//                                 "src": "https://uploads.guim.co.uk/2020/04/12/John_Haughton.jpg",
	//                                 "altText": "John Naughton",
	//                                 "mediaData": null
	//                             }
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Explainers",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/world/2025/nov/02/ukraine-war-briefing-ukraine-says-its-troops-still-holding-out-in-embattled-pokrovsk",
	//                             "headline": "Ukraine war briefing: Ukraine says its troops still holding out in embattled Pokrovsk",
	//                             "byline": "Guardian staff and agencies",
	//                             "publicationTime": "2025-11-02T02:59:54Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/1ce203965e02717d5d227955f30900882d284754/497_0_5000_4000/1000.jpg",
	//                                 "altText": "Anti-drone nets are installed over a road in the frontline town of Kostiantynivka, amid Russia's attack on Ukraine, in the Donetsk region.",
	//                                 "mediaData": null
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/world/2025/oct/27/ukraine-war-briefing-russian-claims-test-of-nuclear-powered-missile-known-as-flying-chornobyl",
	//                             "headline": "Ukraine war briefing: Russia claims test of nuclear-powered missile condemned as 'flying Chornobyl'",
	//                             "byline": "Warren Murray",
	//                             "publicationTime": "2025-10-27T02:42:52Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/79e6a56b15100967069cdf12e5c5df349f5fd54c/0_0_1350_1080/1000.jpg",
	//                                 "altText": "A red-tipped object mostly under a tarp on a production line while a technician in white clean-room garb works on its nose.",
	//                                 "mediaData": null
	//                             }
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Deep Reads",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/world/2025/nov/03/ukrainian-computer-game-style-drone-attack-system-goes-viral",
	//                             "headline": "Ukrainian computer game-style drone attack system goes 'viral'",
	//                             "byline": "Robert Booth",
	//                             "publicationTime": "2025-11-03T05:00:25Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/ca1301dc757f0117d2940dd3e1958b250b0ee64f/251_0_2493_1994/1000.jpg",
	//                                 "altText": "Ukrainian servicemen training to fly drones",
	//                                 "mediaData": null
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/world/2025/jun/25/ukraine-russia-autonomous-drones-ai",
	//                             "headline": "Killing machines: how Russia and Ukraine's race to perfect deadly pilotless drones could harm us all",
	//                             "byline": "Daniel Boffey",
	//                             "publicationTime": "2025-06-25T09:00:12Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/9edd539b0a6b73f148695a08c76edf217012311a/0_0_8256_5504/1000.jpg",
	//                                 "altText": "A military drone on a tabletop",
	//                                 "mediaData": null
	//                             }
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Find multimedia",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/world/video/2025/oct/22/ukraine-kindergarten-among-civilian-sites-hit-by-russian-drone-and-missile-strikes-video",
	//                             "headline": "Ukraine kindergarten among civilian sites hit by Russian drone and missile strikes – video",
	//                             "byline": null,
	//                             "publicationTime": "2025-10-22T12:28:29Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/345c5fb973bea6bcc4ae9f908b5b58e531e214a0/160_0_1210_968/master/1210.jpg",
	//                                 "altText": "Several people killed and many more wounded as Russia launches more than 400 air attacks across Ukraine ",
	//                                 "mediaData": {
	//                                     "Video": {
	//                                         "type": "Video",
	//                                         "id": "gRaPL4bJ5eg",
	//                                         "videoId": "",
	//                                         "height": 500,
	//                                         "width": 300,
	//                                         "origin": "As credited",
	//                                         "title": "Ukraine kindergarten among civilian sites hit by Russian drone and missile strikes – video",
	//                                         "duration": 54,
	//                                         "expired": false,
	//                                         "image": "https://media.guim.co.uk/345c5fb973bea6bcc4ae9f908b5b58e531e214a0/0_151_1452_817/master/1452.jpg"
	//                                     }
	//                                 }
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/politics/audio/2025/oct/17/donald-trump-king-of-the-world-podcast",
	//                             "headline": "Donald Trump: King of the world? – podcast",
	//                             "byline": "Presented by Jonathan Freedland, with Andrew Roth, produced by Danielle Stephens and the executive producer is Zoe Hitch",
	//                             "publicationTime": "2025-10-17T04:00:02Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/6c3d53838d02b29eb91ae3c8c3a196dfbe8c23c7/462_0_4620_3696/500.jpg",
	//                                 "altText": "Donald Trump stands next to Egypt's president, Abdel Fattah al-Sisi, Qatar's Emir Sheikh Tamim bin Hamad al-Thani, Jordan's King Abdullah and Turkey's president, Recep Tayyip Erdoğan",
	//                                 "mediaData": {
	//                                     "Audio": {
	//                                         "type": "Audio",
	//                                         "duration": "30:00"
	//                                     }
	//                                 }
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/world/video/2025/oct/01/you-dont-think-it-will-happen-to-you-a-deep-friendship-forged-behind-ukraines-frontline",
	//                             "headline": "You don't think it will happen to you: a deep friendship forged on Ukraine's frontline",
	//                             "byline": "Alisa Sopova",
	//                             "publicationTime": "2025-10-01T10:45:42Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/50dec76aeca0d4ae702a4d2a40c2b986a1113683/767_0_5448_4359/master/5448.jpg",
	//                                 "altText": "When the war breaks out in Ukraine, Alisa is thrown into a life she wasn't expecting. Working as a translator for foreign journalists she meets British war photographer Anastasia, who chooses not to rush towards the front, instead observing quiet moments of everyday resilience - birthdays, picnics, weddings. A unique friendship forms as the two women strive to collapse the emotional distance between “us” and “them”. Their bond deepens as war wounds them both —transforming this into a poetic meditation on closeness, distance, and what happens when war stops being a story about others.",
	//                                 "mediaData": {
	//                                     "Video": {
	//                                         "type": "Video",
	//                                         "id": "ch2eArHFm8c",
	//                                         "videoId": "",
	//                                         "height": 500,
	//                                         "width": 300,
	//                                         "origin": "The Guardian",
	//                                         "title": "You don't think it will happen to you: a deep friendship forged on Ukraine's frontline",
	//                                         "duration": 504,
	//                                         "expired": false,
	//                                         "image": "https://media.guim.co.uk/50dec76aeca0d4ae702a4d2a40c2b986a1113683/377_945_6069_3414/master/6069.jpg"
	//                                     }
	//                                 }
	//                             }
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Profiles and Interviews",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/world/article/2024/jul/24/i-know-we-will-win-and-how-ukraines-top-general-on-turning-the-tables-against-russia",
	//                             "headline": "'I know we will win – and how': Ukraine's top general on turning the tables against Russia",
	//                             "byline": "Luke Harding",
	//                             "publicationTime": "2024-07-24T04:00:10Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/72db608a518bfae9d46c9a06222649d1019aa397/46_561_6393_3836/1000.jpg",
	//                                 "altText": "Oleksandr Syrskyi says Ukraine will beat Russian might by the quality of its fighting. Photograph: Alessio Mamo/The Guardian",
	//                                 "mediaData": null
	//                             }
	//                         }
	//                     ]
	//                 }
	//             ]
	//         },
	//         {
	//             "title": "Russian airspace violations and drone incursions into Nato territory",
	//             "description": "A series of Russian drone and aircraft incursions into Nato member states' airspace, prompting emergency responses and diplomatic tensions.",
	//             "content": [
	//                 {
	//                     "category": "Contrasting opinions",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/commentisfree/2025/sep/25/the-guardian-view-on-nato-airspace-incursions-russia-is-testing-european-and-us-will-it-wont-stop-here",
	//                             "headline": "The Guardian view on Nato airspace incursions: Russia is testing European and US will. It won't stop here",
	//                             "byline": "Editorial",
	//                             "publicationTime": "2025-09-25T17:43:41Z",
	//                             "image": null
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/commentisfree/2025/sep/16/the-guardian-view-on-donald-trump-ukraine-strategy-talking-tough-and-doing-very-little-isnt-working",
	//                             "headline": "The Guardian view on Donald Trump's Ukraine strategy: talking tough and doing very little isn't working",
	//                             "byline": "Editorial",
	//                             "publicationTime": "2025-09-16T18:02:30Z",
	//                             "image": null
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Explainers",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/world/2025/oct/08/this-is-europe-russia-hybrid-war-destabilise-europe",
	//                             "headline": "Drone dilemma: How Russia's 'hybrid war' is using fear to destabilise Europe",
	//                             "byline": "Katherine Butler",
	//                             "publicationTime": "2025-10-08T15:17:11Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/978745e279b14eec7841e2d06f9a039139b57200/531_591_2887_2309/500.jpg",
	//                                 "altText": "Danish police officers after Copenhagen airport was closed due to drone reports.",
	//                                 "mediaData": null
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/world/2025/sep/24/wednesday-briefing-what-russia-wants-with-nato-airspace-and-what-options-it-leaves-the-west",
	//                             "headline": "Wednesday briefing: What Russia wants with Nato airspace – and what options it leaves the west",
	//                             "byline": "Archie Bland",
	//                             "publicationTime": "2025-09-24T05:45:16Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/e3871986db777270fe301788bbe9c94704e5be38/298_185_1433_1146/1000.jpg",
	//                                 "altText": "One of the three Russian Mig-31 fighter jets after it left Estonian airspace, according to claims by the Swedish military.",
	//                                 "mediaData": null
	//                             }
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Deep Reads",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/world/2025/sep/27/estonia-city-mayoral-election-moscow-threat",
	//                             "headline": "'A big chance for the populists': Estonian city alert to the threat of Moscow in its mayoral election",
	//                             "byline": "Daniel Boffey",
	//                             "publicationTime": "2025-09-27T12:00:42Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/1024acd70a16797d4ffddab634e5729fe7e82ec9/537_0_5200_4160/500.jpg",
	//                                 "altText": "View of the bridge ",
	//                                 "mediaData": null
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/world/2025/aug/25/finland-fence-nato-border-russia",
	//                             "headline": "'For Russians, Nato is next to Satan': Finnish guards on alert at Russia border",
	//                             "byline": "Miranda Bryant",
	//                             "publicationTime": "2025-08-25T14:02:55Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/be5fca9e33940d5182fe2b3156288246eec7985f/0_0_5472_3648/1000.jpg",
	//                                 "altText": "A dog looking up at its handler near striped bollards",
	//                                 "mediaData": null
	//                             }
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Find multimedia",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/news/audio/2025/sep/24/russia-high-risk-game-nato-podcast",
	//                             "headline": "Russia's high-risk game in Nato skies – podcast",
	//                             "byline": "Presented by Helen Pidd with Dan Sabbagh; produced by Tom Glasser, Emilia Gill and Ross Burns; executive producer Sami Kent",
	//                             "publicationTime": "2025-09-24T02:00:11Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/f553c029723a5e30675493ba061d185960cf8aec/522_230_2625_2101/500.jpg",
	//                                 "altText": "Russian military aircraft fly in formation",
	//                                 "mediaData": {
	//                                     "Audio": {
	//                                         "type": "Audio",
	//                                         "duration": "23:38"
	//                                     }
	//                                 }
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/world/video/2025/sep/22/yvette-cooper-says-uk-will-confront-russian-planes-in-nato-airspace-video",
	//                             "headline": "Yvette Cooper says UK will confront Russian planes in Nato airspace – video",
	//                             "byline": "",
	//                             "publicationTime": "2025-09-22T18:22:57Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/d93b36e20f100dace93de77a56394efbcd092729/0_0_5589_4471/master/5589.jpg",
	//                                 "altText": "UK foreign secretary tells UN security council Russia is risking direct armed confrontation with Nato",
	//                                 "mediaData": {
	//                                     "Video": {
	//                                         "type": "Video",
	//                                         "id": "J5pR3J9IQCM",
	//                                         "videoId": "",
	//                                         "height": 500,
	//                                         "width": 300,
	//                                         "origin": "Reuters",
	//                                         "title": "Yvette Cooper says UK will confront Russian planes in Nato airspace – video",
	//                                         "duration": 92,
	//                                         "expired": false,
	//                                         "image": "https://media.guim.co.uk/d93b36e20f100dace93de77a56394efbcd092729/0_699_6707_3772/master/6707.jpg"
	//                                     }
	//                                 }
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/world/video/2025/sep/10/poland-shoots-down-russian-drones-over-its-airspace-video",
	//                             "headline": "Poland shoots down Russian drones over its airspace   – video",
	//                             "byline": "",
	//                             "publicationTime": "2025-09-10T11:59:26Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/90893d4d1ea0fe04d71cbc4dd50ffb87f709e6ab/1362_0_6830_5464/master/6830.jpg",
	//                                 "altText": "Poland’s military command says air defences 'neutralised' threat after Russian attack on Ukraine spread to Nato-member territory  ",
	//                                 "mediaData": {
	//                                     "Video": {
	//                                         "type": "Video",
	//                                         "id": "U064rQzDWV4",
	//                                         "videoId": "",
	//                                         "height": 500,
	//                                         "width": 300,
	//                                         "origin": "Reuters; UGC",
	//                                         "title": "Poland shoots down Russian drones over its airspace   – video",
	//                                         "duration": 64,
	//                                         "expired": false,
	//                                         "image": "https://media.guim.co.uk/90893d4d1ea0fe04d71cbc4dd50ffb87f709e6ab/0_428_8192_4608/master/8192.jpg"
	//                                     }
	//                                 }
	//                             }
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Profiles and Interviews",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/uk-news/2025/sep/14/my-conscience-is-clear-prince-harry-on-ukraine-his-family-and-the-media",
	//                             "headline": "'My conscience is clear': Prince Harry on Ukraine, his family and the media",
	//                             "byline": "Nick Hopkins",
	//                             "publicationTime": "2025-09-14T17:00:39Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/0d3340c1c0b31fcb7e6d9e526a6a52c611396990/0_0_5582_4055/500.jpg",
	//                                 "altText": "Prince Harry speaking to the Guardian after attending a veterans event in Kyiv.",
	//                                 "mediaData": null
	//                             }
	//                         }
	//                     ]
	//                 }
	//             ]
	//         },
	//         {
	//             "title": "Zaporizhzhia nuclear plant power supply crisis and safety concerns",
	//             "description": "The ongoing crisis at Europe's largest nuclear power plant as external power supplies are repeatedly cut and safety concerns mount.",
	//             "content": [
	//                 {
	//                     "category": "Contrasting opinions",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/commentisfree/article/2024/may/08/russia-nuclear-posturing-nato-ukraine",
	//                             "headline": "The world must reject Russia's nuclear posturing – but not ignore the danger",
	//                             "byline": "Christopher S Chivvis",
	//                             "publicationTime": "2024-05-08T10:01:40Z",
	//                             "image": {
	//                                 "src": "https://uploads.guim.co.uk/2025/10/23/Christopher_S_Chivvis.jpg",
	//                                 "altText": "Christopher S Chivvis",
	//                                 "mediaData": null
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/commentisfree/2023/jul/11/russia-nuclear-plants-ukrainians-putin-ukraine",
	//                             "headline": "Will Russia target nuclear plants? For Ukrainians, it feels like a 'when', not an if",
	//                             "byline": "Jade McGlynn",
	//                             "publicationTime": "2023-07-11T13:19:59Z",
	//                             "image": {
	//                                 "src": "https://uploads.guim.co.uk/2023/05/31/Jade_McGlynn.png",
	//                                 "altText": "Jade McGlynn",
	//                                 "mediaData": null
	//                             }
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Explainers",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/world/2025/oct/19/ukraine-war-briefing-repairs-begin-in-bid-to-restore-power-to-zaporizhzhia-nuclear-plant",
	//                             "headline": "Ukraine war briefing: Repairs begin in bid to restore power to Zaporizhzhia nuclear plant",
	//                             "byline": "Guardian staff and agencies",
	//                             "publicationTime": "2025-10-19T00:53:54Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/1a0033fa7e65fbaeb0b72b89859f32947d4cf888/420_0_4848_3879/500.jpg",
	//                                 "altText": "Ukraine’s Zaporizhzhia nuclear plant ",
	//                                 "mediaData": null
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/world/2025/oct/04/ukraine-war-briefing-political-will-needed-to-restore-external-power-to-zaporizhzhia-nuclear-plant-un-watchdog-says",
	//                             "headline": "Ukraine war briefing: 'Political will' needed to restore external power to Zaporizhzhia nuclear plant, UN watchdog says",
	//                             "byline": "Guardian staff and agencies",
	//                             "publicationTime": "2025-10-04T02:04:50Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/726a6a5c9eac85412b51f89b98f3ba9dc6a1f722/576_0_3677_2943/500.jpg",
	//                                 "altText": "Ukraine’s Russian-held Zaporizhzhia nuclear power",
	//                                 "mediaData": null
	//                             }
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Deep Reads",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/world/2025/oct/30/ukraine-women-wartime-wives-mothers-fighters-activists",
	//                             "headline": "Wives, mothers, fighters, activists: the millennial women keeping Ukraine going",
	//                             "byline": "Charlotte Higgins",
	//                             "publicationTime": "2025-10-30T05:00:52Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/a48e72a6da15597661a770a89e9785001b97874c/0_0_3750_3000/1000.jpg",
	//                                 "altText": "Composite image of four millennial women against a yellow background",
	//                                 "mediaData": null
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/world/2025/oct/23/drones-ukraine-wildfires-russia-heat-mines-shelling",
	//                             "headline": "Wildfires have consumed vast chunks of Ukraine. Is Russia deliberately fuelling the flames?",
	//                             "byline": "Linda Hourani",
	//                             "publicationTime": "2025-10-23T04:00:57Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/ad5abe3ddc539d22fdd77dcd530639af7aa44e67/1315_1494_3602_2881/500.jpg",
	//                                 "altText": "A firefighter pulls on a hose amid smoke and sprays of water; the trees around them are blackened and bare, many have toppled over.",
	//                                 "mediaData": null
	//                             }
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Find multimedia",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/world/video/2025/oct/22/ukraine-kindergarten-among-civilian-sites-hit-by-russian-drone-and-missile-strikes-video",
	//                             "headline": "Ukraine kindergarten among civilian sites hit by Russian drone and missile strikes – video",
	//                             "byline": null,
	//                             "publicationTime": "2025-10-22T12:28:29Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/345c5fb973bea6bcc4ae9f908b5b58e531e214a0/160_0_1210_968/master/1210.jpg",
	//                                 "altText": "Several people killed and many more wounded as Russia launches more than 400 air attacks across Ukraine ",
	//                                 "mediaData": {
	//                                     "Video": {
	//                                         "type": "Video",
	//                                         "id": "gRaPL4bJ5eg",
	//                                         "videoId": "",
	//                                         "height": 500,
	//                                         "width": 300,
	//                                         "origin": "As credited",
	//                                         "title": "Ukraine kindergarten among civilian sites hit by Russian drone and missile strikes – video",
	//                                         "duration": 54,
	//                                         "expired": false,
	//                                         "image": "https://media.guim.co.uk/345c5fb973bea6bcc4ae9f908b5b58e531e214a0/0_151_1452_817/master/1452.jpg"
	//                                     }
	//                                 }
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/politics/audio/2025/oct/17/donald-trump-king-of-the-world-podcast",
	//                             "headline": "Donald Trump: King of the world? – podcast",
	//                             "byline": "Presented by Jonathan Freedland, with Andrew Roth, produced by Danielle Stephens and the executive producer is Zoe Hitch",
	//                             "publicationTime": "2025-10-17T04:00:02Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/6c3d53838d02b29eb91ae3c8c3a196dfbe8c23c7/462_0_4620_3696/500.jpg",
	//                                 "altText": "Donald Trump stands next to Egypt's president, Abdel Fattah al-Sisi, Qatar's Emir Sheikh Tamim bin Hamad al-Thani, Jordan's King Abdullah and Turkey's president, Recep Tayyip Erdoğan",
	//                                 "mediaData": {
	//                                     "Audio": {
	//                                         "type": "Audio",
	//                                         "duration": "30:00"
	//                                     }
	//                                 }
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/world/video/2025/oct/10/russian-strike-energy-plunges-kyiv-darkness-video",
	//                             "headline": "Russian strike on energy sites plunges Kyiv into darkness – video",
	//                             "byline": null,
	//                             "publicationTime": "2025-10-10T09:47:39Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/f4e8ac570e99a234715acc7685ffffe23900e802/482_0_4821_3857/master/4821.jpg",
	//                                 "altText": "Power cuts were triggered in districts across Ukraine's capital by  a 'massive attack' as Russia pummelled the city's infrastructure",
	//                                 "mediaData": {
	//                                     "Video": {
	//                                         "type": "Video",
	//                                         "id": "1zmnbNg6SyI",
	//                                         "videoId": "",
	//                                         "height": 500,
	//                                         "width": 300,
	//                                         "origin": "",
	//                                         "title": "Russian strike on energy sites plunges Kyiv into darkness – video ",
	//                                         "duration": 67,
	//                                         "expired": false,
	//                                         "image": "https://media.guim.co.uk/f4e8ac570e99a234715acc7685ffffe23900e802/0_0_5785_3254/master/5785.jpg"
	//                                     }
	//                                 }
	//                             }
	//                         }
	//                     ]
	//                 }
	//             ]
	//         },
	//         {
	//             "title": "Trump administration's evolving Ukraine policy and sanctions on Russia",
	//             "description": "The development of Donald Trump's approach to the Ukraine war, from initial reluctance to imposing significant sanctions on Russian oil companies.",
	//             "content": [
	//                 {
	//                     "category": "Contrasting opinions",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/commentisfree/2025/oct/23/sanctions-weapons-russia-ukraine-allies",
	//                             "headline": "New sanctions and weapons will not stop Russia. It's time for Ukraine's allies to change their flawed strategy",
	//                             "byline": "Christopher S Chivvis",
	//                             "publicationTime": "2025-10-23T13:30:37Z",
	//                             "image": {
	//                                 "src": "https://uploads.guim.co.uk/2025/10/23/Christopher_S_Chivvis.jpg",
	//                                 "altText": "Christopher S Chivvis",
	//                                 "mediaData": null
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/commentisfree/2025/oct/20/gaza-ukraine-donald-trump-stop-war-peace",
	//                             "headline": "In Gaza, and now Ukraine, Donald Trump may be peace activists' greatest ally. That deserves our backing",
	//                             "byline": "Simon Jenkins",
	//                             "publicationTime": "2025-10-20T04:00:34Z",
	//                             "image": {
	//                                 "src": "https://static.guim.co.uk/sys-images/Guardian/Pix/contributor/2015/7/8/1436364958107/Simon-Jenkins.jpg",
	//                                 "altText": "Simon Jenkins",
	//                                 "mediaData": null
	//                             }
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Explainers",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/world/2025/oct/23/will-us-sanctions-russia-oil-companies-be-effective-why-trump-now",
	//                             "headline": "Will US sanctions on Russian oil companies be effective, and why is Trump imposing them now?",
	//                             "byline": "Jonathan Yerushalmy",
	//                             "publicationTime": "2025-10-23T15:07:01Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/57727f24227a7f56490a7d4e8db9a56065984eed/333_0_2817_2254/500.jpg",
	//                                 "altText": "A flame burns from a tower at the Vankorskoye oilfield owned by Rosneft north of the Russian Siberian city of Krasnoyarsk.",
	//                                 "mediaData": null
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/world/2025/oct/17/what-are-tomahawk-missiles-and-why-does-ukraine-want-them",
	//                             "headline": "What are Tomahawk missiles and why does Ukraine want them?",
	//                             "byline": "Dan Sabbagh",
	//                             "publicationTime": "2025-10-17T12:34:46Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/797e7e2bf2f818f42a848771566d7a7e58dd18b0/432_0_4320_3455/1000.jpg",
	//                                 "altText": "Tomahawk missiles in flight",
	//                                 "mediaData": null
	//                             }
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Deep Reads",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/world/2025/may/24/trump-russia-sanctions-europe-ukraine",
	//                             "headline": "Trump's Russia sanctions refusal leaves Europe with few options but to wait",
	//                             "byline": "Patrick Wintour",
	//                             "publicationTime": "2025-05-24T09:00:55Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/d6551c9a61ba5a40de4acce51addd33df2e6710c/0_0_4167_3333/500.jpg",
	//                                 "altText": "Framed photos and flags big and small are tightly massed together, with buildings in the background",
	//                                 "mediaData": null
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/world/2024/dec/06/russia-and-ukraine-warily-wait-for-trump-transition-and-subsequent-peace-talks",
	//                             "headline": "'A trip to the casino': Russia and Ukraine wait warily for Trump transition",
	//                             "byline": "Shaun Walker",
	//                             "publicationTime": "2024-12-06T12:31:11Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/42e8a0719d3d0f1502efae800b42add62b275bf8/0_11_5472_3283/1000.jpg",
	//                                 "altText": "Two Ukrainian soldiers",
	//                                 "mediaData": null
	//                             }
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Find multimedia",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/world/video/2025/oct/20/trump-says-ukraine-donbas-region-should-be-cut-way-it-is-end-war-russia-video",
	//                             "headline": "Trump says Ukraine's Donbas region should be 'cut the way it is' to end war with Russia – video",
	//                             "byline": null,
	//                             "publicationTime": "2025-10-20T08:48:28Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/e5d8187070c18d1966e2b48c8e16fa9895305000/705_0_7050_5640/master/7050.jpg",
	//                                 "altText": "After a tense meeting with Volodymyr Zelenskyy that left the Ukrainian delegation disappointed, the US president publicly called for a ceasefire on the current frontlines",
	//                                 "mediaData": {
	//                                     "Video": {
	//                                         "type": "Video",
	//                                         "id": "1ainHDIY-HA",
	//                                         "videoId": "",
	//                                         "height": 500,
	//                                         "width": 300,
	//                                         "origin": "Reuters",
	//                                         "title": "Trump says Ukraine's Donbas region should be 'cut the way it is' to end war with Russia – video",
	//                                         "duration": 46,
	//                                         "expired": false,
	//                                         "image": "https://media.guim.co.uk/e5d8187070c18d1966e2b48c8e16fa9895305000/0_422_8460_4759/master/8460.jpg"
	//                                     }
	//                                 }
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/us-news/video/2025/oct/17/trump-hopes-russia-ukraine-war-can-end-without-supplying-tomahawks-video",
	//                             "headline": "Trump hopes Russia-Ukraine war can end without supplying Tomahawks – video",
	//                             "byline": null,
	//                             "publicationTime": "2025-10-17T20:38:34Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/3bbaec5aa2b68f0047df6891e8aa3e20e59b8bac/1161_0_7202_5760/master/7202.jpg",
	//                                 "altText": "Donald Trump signalled reluctance to sending long-range Tomahawk missiles to Ukraine, declaring, \"We want Tomahawks too.",
	//                                 "mediaData": {
	//                                     "Video": {
	//                                         "type": "Video",
	//                                         "id": "4Pkq8MwG9cA",
	//                                         "videoId": "",
	//                                         "height": 500,
	//                                         "width": 300,
	//                                         "origin": "Reuters/AP",
	//                                         "title": "Trump hopes Russia-Ukraine war can end without supplying Tomahawks – video",
	//                                         "duration": 70,
	//                                         "expired": false,
	//                                         "image": "https://media.guim.co.uk/3bbaec5aa2b68f0047df6891e8aa3e20e59b8bac/0_607_8640_4859/master/8640.jpg"
	//                                     }
	//                                 }
	//                             }
	//                         },
	//                         {
	//                             "url": "https://www.theguardian.com/politics/audio/2025/oct/17/donald-trump-king-of-the-world-podcast",
	//                             "headline": "Donald Trump: King of the world? – podcast",
	//                             "byline": "Presented by Jonathan Freedland, with Andrew Roth, produced by Danielle Stephens and the executive producer is Zoe Hitch",
	//                             "publicationTime": "2025-10-17T04:00:02Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/6c3d53838d02b29eb91ae3c8c3a196dfbe8c23c7/462_0_4620_3696/500.jpg",
	//                                 "altText": "Donald Trump stands next to Egypt's president, Abdel Fattah al-Sisi, Qatar's Emir Sheikh Tamim bin Hamad al-Thani, Jordan's King Abdullah and Turkey's president, Recep Tayyip Erdoğan",
	//                                 "mediaData": {
	//                                     "Audio": {
	//                                         "type": "Audio",
	//                                         "duration": "30:00"
	//                                     }
	//                                 }
	//                             }
	//                         }
	//                     ]
	//                 },
	//                 {
	//                     "category": "Profiles and Interviews",
	//                     "articles": [
	//                         {
	//                             "url": "https://www.theguardian.com/books/2025/jan/01/timothy-snyder-trump-musk-russia-ukraine-putin",
	//                             "headline": "'Just by existing, he's extended this war': Timothy Snyder on Trump, Russia and Ukraine",
	//                             "byline": "Martin Pengelly in Washington",
	//                             "publicationTime": "2025-01-01T11:00:12Z",
	//                             "image": {
	//                                 "src": "https://media.guim.co.uk/a0666dea8668de82177a53d96346c62457b59eb4/0_438_6614_3971/1000.jpg",
	//                                 "altText": "man wearing black sweater flips through notebook",
	//                                 "mediaData": null
	//                             }
	//                         }
	//                     ]
	//                 }
	//             ]
	//         }
	//     ]
	// }

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
			byline: article.byline || '',
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
						src: category.articles[0]?.image.src,
						altText: category.articles[0]?.image.altText || '',
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
				case 'Contrasting opinions':
					return 'Opinions';
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
	// parseTPSGContentToStorylines(mockData);

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
										{index + 1}
									</span>
								) : (
									<>
										<span css={numberStyles}>
											{index + 1}
										</span>
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
					{`These storylines were curated from ${
						storylines.articleCount
					} articles published ${formatDateRangeText(
						storylines.earliestArticleTime,
						storylines.latestArticleTime,
					)}. Some articles may be older to provide further context.`}
				</div>{' '}
			</StorylineSection>
		</>
	);
};
