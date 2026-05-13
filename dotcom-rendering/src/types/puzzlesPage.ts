import type { EditionId } from '../lib/edition';
import type { ConfigType } from './config';
import type { FooterType } from './footer';
import type { FENavType } from './frontend';

export type PuzzleItem = {
	title: string;
	type: string;
	set: string;
	url?: string;
	index?: number;
};

export type PuzzleContent = {
	items: PuzzleItem[][];
	nestedContainers: PuzzleContainer[];
};

export type PuzzleContainer = {
	title: string;
	content: PuzzleContent;
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
}
