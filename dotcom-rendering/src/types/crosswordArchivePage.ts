import type { EditionId } from '../lib/edition';
import type { ConfigType } from './config';
import type { FooterType } from './footer';
import type { FENavType } from './frontend';

export type CrosswordArchiveTab = {
	label: string;
	crosswordType: string;
	url: string;
	isSelected: boolean;
};

export type CrosswordArchiveEntry = {
	title: string;
	url: string;
	isLocked: boolean;
};

export interface FECrosswordArchivePageType {
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
	selectedType: string;
	tabs: CrosswordArchiveTab[];
	entries: CrosswordArchiveEntry[];
}
