import { Pillar } from '@guardian/libs';
import type { EditionId } from '../lib/edition';
import type { FEFrontCard, TreatType } from '../types/front';

const SOCCER_TREAT: TreatType = {
	links: [
		{
			linkTo: '/football/2023/jul/20/sign-up-for-soccer-with-jonathan-wilson-his-free-weekly-newsletter-on-european-soccer',
			title: 'Soccer with Jonathan Wilson: ',
			text: 'The latest on the global game',
		},
	],
	theme: Pillar.Sport,
	imageUrl: 'https://uploads.guim.co.uk/2023/08/03/Soccer-v7_TREAT.png',
	altText: 'Soccer ball',
};

const HEADLINES_US_TREAT: TreatType = {
	links: [
		{
			linkTo: '/info/2015/dec/08/daily-email-us?INTCMP=gdnwb_treat_election_today_us',
			title: 'Guardian Today US: ',
			text: 'Get the headlines & more in a daily email',
		},
	],
	theme: Pillar.News,
	imageUrl: 'https://uploads.guim.co.uk/2020/10/22/newsletter-treat-img.png',
	altText: 'The White House',
};

const WELLNESS_US_TREAT: TreatType = {
	links: [
		{
			linkTo: '/us/wellness',
			text: 'Read more on living a good life in a complex world.',
		},
	],
	theme: Pillar.Lifestyle,
	imageUrl: 'https://uploads.guim.co.uk/2023/10/30/Wellness_Treat.png',
	altText: 'Well Actually logo',
};

/**
 * PLATFORM_TREATS
 *
 * 👉 Edit this list below to change, remove or add new treats to front pages 👈
 *
 * This list controls treats that will appear in the bottom of the left column for a
 * particular container. The actual container that a treat appears in is decided
 * based on the values of containerTitle and editionId
 *
 * If both imageUrl and altText are provided, then an image will be shown. Otherwise,
 * if no imageUrl or altText are given, then a basic text treat will be shown
 * instead
 */
const PLATFORM_TREATS: TreatType[] = [
	{
		...HEADLINES_US_TREAT,
		pageId: 'us',
		containerTitle: 'Spotlight',
		editionId: 'US',
	},
	{
		...HEADLINES_US_TREAT,
		pageId: 'us-news',
		containerTitle: 'US headlines',
	},
	{
		links: [
			{
				linkTo: '/news/series/qatar-beyond-the-football',
				text: 'Qatar: beyond the football',
			},
		],
		theme: Pillar.News,
		imageUrl:
			'https://uploads.guim.co.uk/2023/06/02/BALL-nugget-grass_5.png',
		altText: 'Image of football covered in bank notes',
		pageId: 'football/world-cup-2022',
		containerTitle: 'Qatar: beyond the football',
	},
	{
		...SOCCER_TREAT,
		pageId: 'us',
		containerTitle: 'Sports',
	},
	{
		...WELLNESS_US_TREAT,
		pageId: 'us',
		containerTitle: 'Wellness',
	},
];

const getPlatformTreats = (
	displayName: string,
	editionId: EditionId,
	pageId: string,
): TreatType[] => {
	return PLATFORM_TREATS.filter((treat) => {
		/**
		 * We decide if a treat should be shown for a container based on the container
		 * name, the edition and the page id.
		 *
		 * Matching on edition or page id is optional. If either of these are not
		 * provided then we return true for that check
		 *
		 * If editionId is given without pageId it will match against all readers who
		 * have that edition cookie, regardless of which page they are viewing
		 */
		const matchesContainer = treat.containerTitle === displayName;
		const matchesEdition =
			!treat.editionId || treat.editionId === editionId;
		const matchesPage = !treat.pageId || treat.pageId === pageId;

		return matchesContainer && matchesEdition && matchesPage;
	});
};

export const enhanceTreats = (
	treats: FEFrontCard[],
	displayName: string,
	editionId: EditionId,
	pageId: string,
): TreatType[] => {
	const existingTreats = treats.map((treat) => ({
		links: [
			{
				text: treat.header.headline,
				linkTo: treat.properties.href ?? treat.header.url,
			},
		],
		editionId,
	}));

	// Add any platform treats that we can find for this container
	const platformTreats = getPlatformTreats(displayName, editionId, pageId);

	return [...platformTreats, ...existingTreats];
};
