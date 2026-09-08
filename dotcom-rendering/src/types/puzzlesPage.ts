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
	filterId?: string;
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
	variant?: 'featured' | 'standard' | 'ad';
	content: PuzzleContent;
	filterId?: string;
	desktopSpan?: number;
	adSlot?: string;
};

export type PuzzleFilter = {
	id: string;
	title: string;
	target: string;
	backgroundColour?: string;
};

export type PuzzlesLayoutType = {
	containers: PuzzleContainer[];
	filters?: PuzzleFilter[];
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
