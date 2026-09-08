import type { EditionId } from '../lib/edition';
import type { ConfigType } from './config';
import type { FooterType } from './footer';
import type { FENavType } from './frontend';

export type PuzzleCardVariant = 'large' | 'primary' | 'compact' | 'archive';

export type PuzzleItem = {
	id: string;
	title: string;
	type: string;
	set: string;
	cardVariant: PuzzleCardVariant;
	cadence?: string;
	url?: string;
	image?: string;
	slug?: string;
	index?: number;
	variant?: string;
	backgroundColour?: string;
};

export type PuzzleContent = {
	items: PuzzleItem[][];
	nestedContainers: PuzzleContainer[];
	archive?: PuzzleItem;
	archiveChoices?: PuzzleItem[];
};

export type PuzzleContainer = {
	id: string;
	title: string;
	variant?: 'featured' | 'standard' | 'ad' | 'supporting';
	content: PuzzleContent;
	enabled?: boolean;
	desktopSpan?: number;
	adSlot?: string;
	supporting?: PuzzlesSupportingContent;
};

export type PuzzleLink = {
	title: string;
	url: string;
};

export type PuzzlesNewsletter = {
	identityName: string;
	name: string;
	frequency: string;
	description: string;
	illustrationSquare?: string;
};

export type PuzzlePopularityGroup = {
	title: string;
	itemIds: string[];
};

export type PuzzlesSupportingContent = {
	usefulLinksTitle: string;
	usefulLinks: PuzzleLink[];
	newsletter?: PuzzlesNewsletter;
	popularTitle: string;
	popularGroups: PuzzlePopularityGroup[];
};

export type PuzzlesLayoutType = {
	containers: PuzzleContainer[];
};

export interface FEPuzzlesPageType {
	id: string;
	editionId: EditionId;
	editionLongForm: string;
	contributionsServiceUrl: string;
	webTitle: string;
	description?: string;
	config: ConfigType;
	nav: FENavType;
	pageFooter: FooterType;
	canonicalUrl: string;
	isAdFreeUser: boolean;
	layout: PuzzlesLayoutType;
	commercialProperties?: Record<string, unknown>;
}
