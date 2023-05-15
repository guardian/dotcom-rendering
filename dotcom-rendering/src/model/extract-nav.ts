import type { EditionId } from '../web/lib/edition';

export type Pillar = 'news' | 'opinion' | 'sport' | 'culture' | 'lifestyle';

export interface BaseLinkType {
	url: string;
	title: string;
}

export interface LinkType extends BaseLinkType {
	longTitle: string;
	children?: LinkType[];
	mobileOnly?: boolean;
}

export interface EditionLinkType extends LinkType {
	editionId: EditionId;
	locale: string;
}

export interface PillarLinkType extends LinkType {
	pillar: Pillar;
}

export interface SubNavType {
	parent?: LinkType;
	links: LinkType[];
}

interface BaseNavType {
	otherLinks: LinkType[];
	brandExtensions: LinkType[];
	currentNavLink: string;
	subNavSections?: SubNavType;
	readerRevenueLinks: ReaderRevenuePositions;
}

export interface NavType extends BaseNavType {
	pillars: PillarLinkType[];
	selectedPillar: Pillar;
}

export const getPillar: (name: string) => Pillar | undefined = (name) => {
	const pillar: string = name.toLowerCase();

	switch (pillar) {
		// The pillar name is "arts" in CAPI, but "culture" everywhere else
		case 'arts':
		case 'culture':
			return 'culture';
		case 'opinion':
			return 'opinion';
		case 'news':
			return 'news';
		case 'sport':
			return 'sport';
		case 'lifestyle':
			return 'lifestyle';
		default:
			return undefined;
	}
};

const getLink = (data: FELinkType): LinkType => {
	const { title, longTitle = title, url } = data;
	return {
		title,
		longTitle,
		url,
		children: data.children?.map(getLink) ?? [],
		mobileOnly: false,
	};
};

const getPillarLink = (data: FELinkType): PillarLinkType => ({
	...getLink(data),
	pillar: getPillar(data.title) ?? 'news',
});

const buildRRLinkCategories = (
	readerRevenueLinks: ReaderRevenuePositions,
	position: ReaderRevenuePosition,
): ReaderRevenueCategories => {
	const { subscribe, support, contribute, supporter } =
		readerRevenueLinks[position];
	return {
		subscribe,
		support,
		contribute,
		supporter,
	};
};

const buildRRLinkModel = ({
	readerRevenueLinks,
}: FENavType): ReaderRevenuePositions => ({
	header: buildRRLinkCategories(readerRevenueLinks, 'header'),
	footer: buildRRLinkCategories(readerRevenueLinks, 'footer'),
	sideMenu: buildRRLinkCategories(readerRevenueLinks, 'sideMenu'),
	ampHeader: buildRRLinkCategories(readerRevenueLinks, 'ampHeader'),
	ampFooter: buildRRLinkCategories(readerRevenueLinks, 'ampFooter'),
});

export const extractNAV = (data: FENavType): NavType => {
	const pillars = data.pillars.map(getPillarLink);

	const { subNavSections: subnav, currentNavLinkTitle: currentNavLink = '' } =
		data;

	return {
		pillars,
		otherLinks: data.otherLinks.map(getLink),
		brandExtensions: data.brandExtensions.map(getLink),
		currentNavLink,
		subNavSections: subnav
			? {
					parent: subnav.parent ? getLink(subnav.parent) : undefined,
					links: subnav.links.map(getLink),
			  }
			: undefined,
		readerRevenueLinks: buildRRLinkModel(data),
		selectedPillar: 'news',
	};
};
