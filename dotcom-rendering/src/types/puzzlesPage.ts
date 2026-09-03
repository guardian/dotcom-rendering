import type { EditionId } from '../lib/edition';
import type { ConfigType } from './config';
import type { FooterType } from './footer';
import type { FENavType } from './frontend';

export const puzzleCardVariants = [
	'large',
	'primary',
	'compact',
	'archive',
] as const;
export type PuzzleCardVariant = (typeof puzzleCardVariants)[number];

export const puzzleContainerVariants = ['featured', 'standard'] as const;
export type PuzzleContainerVariant = (typeof puzzleContainerVariants)[number];

export const puzzlePageVariants = ['iframe-page', 'archive-page'] as const;
export type PuzzlePageVariant = (typeof puzzlePageVariants)[number];

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
	variant?: PuzzlePageVariant;
	backgroundColour?: string;
	filterId?: string;
};

export type PuzzleContent = {
	items: PuzzleItem[][];
	nestedContainers: PuzzleContainer[];
	archive?: PuzzleItem;
};

export type PuzzleContainer = {
	title: string;
	variant?: PuzzleContainerVariant;
	content: PuzzleContent;
	filterId?: string;
	desktopSpan?: number;
};

export type PuzzleFilter = {
	id: string;
	title: string;
	target: string;
	backgroundColour?: string;
};

export type PuzzlesLayoutType = {
	containers: PuzzleContainer[];
	filters: PuzzleFilter[];
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
	commercialProperties: Record<string, unknown>;
	isAdFreeUser: boolean;
	canonicalUrl: string;
	layout: PuzzlesLayoutType;
}
