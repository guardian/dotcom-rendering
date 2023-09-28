import type { Newsletter } from '../types/content';
import type {
	DCRNewslettersPageType,
	FENewslettersPageType,
	GroupedNewsletters,
} from '../types/newslettersPage';
import type { StaticGroups } from './newsletter-grouping';
import { groups } from './newsletter-grouping';

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

	for (const newsletter of newsletters) {
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
	}

	return grouping;
};

const getGroups = (
	newsletterPageData: FENewslettersPageType,
): GroupedNewsletters => {
	const { newsletters, editionId } = newsletterPageData;
	const staticGroup = groups[editionId] ?? groups['UK'];

	return staticGroup
		? mapStaticGroups(staticGroup, newsletters)
		: reduceToDefaultGrouping(newsletters);
};

export const enhanceNewslettersPage = (
	newsletterData: FENewslettersPageType,
): DCRNewslettersPageType => {
	return {
		...newsletterData,
		groupedNewsletters: getGroups(newsletterData),
	};
};
