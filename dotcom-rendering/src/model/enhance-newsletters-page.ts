import type {
	DCRNewslettersPageType,
	FENewslettersPageType,
	GroupedNewsletters,
} from '../types/newslettersPage';

const getGroups = (
	newsletterData: FENewslettersPageType,
): GroupedNewsletters => {
	const { newsletters, editionId } = newsletterData;

	return {
		groups: [
			{
				title: 'sport',
				newsletters: newsletters.filter(
					(newsletter) => newsletter.group === 'Sport',
				),
			},
			{
				title: 'Local',
				newsletters: newsletters.filter(
					(newsletter) => newsletter.regionFocus === editionId,
				),
			},
		],
	};
};

export const enhanceNewslettersPage = (
	newsletterData: FENewslettersPageType,
): DCRNewslettersPageType => {
	return {
		...newsletterData,
		groupedNewsletters: getGroups(newsletterData),
	};
};
