import { ArticlePillar } from '@guardian/libs';
import type { EditionId } from '../types/edition';
import { findPillar } from './find-pillar';

interface BaseLinkType {
	url: string;
	title: string;
}

interface LinkType extends BaseLinkType {
	longTitle: string;
	children?: LinkType[];
	mobileOnly?: boolean;
	pillar?: ArticleTheme;
	more?: boolean;
}

interface EditionLinkType extends LinkType {
	id: EditionId;
}

interface PillarType extends LinkType {
	pillar: ArticleTheme;
}

interface MoreType extends LinkType {
	more: true;
}

interface SubNavType {
	parent?: LinkType;
	links: LinkType[];
}

interface BaseNavType {
	otherLinks: MoreType;
	brandExtensions: LinkType[];
	currentNavLink: string;
	subNavSections?: SubNavType;
	readerRevenueLinks: ReaderRevenuePositions;
}

interface SimpleNavType {
	pillars: PillarType[];
	otherLinks: MoreType;
	brandExtensions: LinkType[];
	readerRevenueLinks: ReaderRevenuePositions;
}

interface NavType extends BaseNavType {
	pillars: PillarType[];
}

const getLink = (data: CAPILinkType): LinkType => {
	const { title, longTitle = title, url } = data;
	return {
		title,
		longTitle,
		url,
		pillar: undefined,
		children: data.children?.map(getLink) ?? [],
		mobileOnly: false,
	};
};

const getPillar = (data: CAPILinkType): PillarType => ({
	...getLink(data),
	pillar: findPillar(data.title) ?? ArticlePillar.News,
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
}: CAPINavType): ReaderRevenuePositions => ({
	header: buildRRLinkCategories(readerRevenueLinks, 'header'),
	footer: buildRRLinkCategories(readerRevenueLinks, 'footer'),
	sideMenu: buildRRLinkCategories(readerRevenueLinks, 'sideMenu'),
	ampHeader: buildRRLinkCategories(readerRevenueLinks, 'ampHeader'),
	ampFooter: buildRRLinkCategories(readerRevenueLinks, 'ampFooter'),
});

export const extractNAV = (data: CAPINavType): NavType => {
	const pillars = data.pillars.map(getPillar);

	const { subNavSections: subnav, currentNavLinkTitle: currentNavLink = '' } =
		data;

	return {
		pillars,
		otherLinks: {
			url: '', // unused
			title: 'More',
			longTitle: 'More',
			more: true,
			children: data.otherLinks.map(getLink),
		},
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

export type {
	SimpleNavType,
	NavType,
	PillarType,
	BaseLinkType,
	SubNavType,
	LinkType,
	EditionLinkType,
};
