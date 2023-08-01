import { Pillar } from '@guardian/libs';
import type { EditionId } from '../lib/edition';
import { findPillar } from './find-pillar';

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
	timeZone: string;
}

export interface PillarLinkType extends LinkType {
	pillar: ArticleTheme;
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
	selectedPillar?: Pillar;
}

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

const getPillar = (data: FELinkType): PillarLinkType => ({
	...getLink(data),
	pillar: findPillar(data.title) ?? Pillar.News,
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
	const pillars = data.pillars.map(getPillar);

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
	};
};
