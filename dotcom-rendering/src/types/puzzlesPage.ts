import type { EditionId } from '../lib/edition';
import type { ConfigType } from './config';
import type { FooterType } from './footer';
import type { FENavType } from './frontend';

export type PuzzleItem = {
	title: string;
	type: string;
	set: string;
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
};

export type PuzzleContainer = {
	title: string;
	variant?: string;
	content: PuzzleContent;
	filterId?: string;
	desktopSpan?: number;
};

export type PuzzleFilter = {
	id: string;
	title: string;
	backgroundColour?: string;
};

export type PuzzleArchiveNavigation = {
	title: string;
	url: string;
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
}
