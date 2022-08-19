import { ArticlePillar } from '@guardian/libs';
import type { EditionId } from '../types/edition';
import type { FEFrontCard, TreatType } from '../types/front';

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
		links: [
			{
				linkTo: '/info/2015/dec/08/daily-email-us?INTCMP=gdnwb_treat_election_today_us',
				text: 'Guardian Today US: Get the headlines & more in a daily email',
			},
		],
		theme: ArticlePillar.News,
		containerTitle: 'Spotlight',
		editionId: 'US',
		imageUrl:
			'https://uploads.guim.co.uk/2020/10/22/newsletter-treat-img.png',
		altText: 'The White House',
		pageId: 'us',
	},
	{
		links: [
			{
				linkTo: '/tv-and-radio/ng-interactive/2022/aug/01/whats-on-netflix-and-amazon-this-month-august',
				text: "What's on Netflix & Amazon this month",
			},
			{
				linkTo: '/books/ng-interactive/2022/aug/19/this-months-best-paperbacks-jan-morris-katie-kitamura-and-more',
				text: "This month's best paperbacks",
			},
		],
		theme: ArticlePillar.Culture,
		containerTitle: 'Culture',
		editionId: 'UK',
		imageUrl:
			'https://uploads.guim.co.uk/2022/08/19/culture-nugget-august.png',
		altText: "What's on Netflix and Amazon this month",
		pageId: 'uk',
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
