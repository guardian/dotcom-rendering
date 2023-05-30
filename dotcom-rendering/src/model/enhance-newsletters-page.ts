import type { Newsletter } from '../types/content';
import type {
	DCRNewslettersPageType,
	FENewslettersPageType,
	GroupedNewsletters,
} from '../types/newslettersPage';
import STATIC_GROUP_DATA from './newsletter-grouping.json';

type StaticGroups = {
	title: string;
	subtitle?: string;
	newsletters: string[];
}[];

const mapStaticGroups = (
	staticGroups: StaticGroups,
	newsletters: Newsletter[],
): GroupedNewsletters => {
	const newsletterRecord = newsletters.reduce<
		Partial<Record<string, Newsletter>>
	>((record, newsletter) => {
		record[newsletter.identityName] = newsletter;
		return record;
	}, {});

	const mapped = staticGroups.map((group) => ({
		title: group.title,
		subtitle: group.subtitle,
		newsletters: group.newsletters.reduce<Newsletter[]>((list, name) => {
			const match = newsletterRecord[name];
			if (match) {
				list.push(match);
			}
			return list;
		}, []),
	}));

	return {
		groups: mapped,
	};
};

const reduceToDefaultGrouping = (
	newsletters: Newsletter[],
): GroupedNewsletters => {
	const grouping: GroupedNewsletters = {
		groups: [],
	};

	newsletters.forEach((newsletter) => {
		const { group: groupName } = newsletter;
		const exstingGroup = grouping.groups.find(
			(group) => group.title === groupName,
		);
		if (exstingGroup) {
			exstingGroup.newsletters.push(newsletter);
		} else {
			grouping.groups.push({
				title: groupName,
				newsletters: [newsletter],
			});
		}
	});

	return grouping;
};

const getGroups = (
	newsletterData: FENewslettersPageType,
): GroupedNewsletters => {
	const { newsletters, editionId } = newsletterData;

	if (editionId === 'UK') {
		return mapStaticGroups(
			STATIC_GROUP_DATA.UK,
			newsletterData.newsletters,
		);
	}
	if (editionId === 'US') {
		return mapStaticGroups(
			STATIC_GROUP_DATA.US,
			newsletterData.newsletters,
		);
	}

	return reduceToDefaultGrouping(newsletters);
};

export const enhanceNewslettersPage = (
	newsletterData: FENewslettersPageType,
): DCRNewslettersPageType => {
	return {
		...newsletterData,
		groupedNewsletters: getGroups(newsletterData),
	};
};
