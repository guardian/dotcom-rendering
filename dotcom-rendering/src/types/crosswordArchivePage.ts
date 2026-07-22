import type { EditionId } from '../lib/edition';
import type { ConfigType } from './config';
import type { FooterType } from './footer';
import type { FENavType } from './frontend';

export type CrosswordArchiveEntry = {
	date: string;
	url: string;
};

export type CrosswordArchiveSection = {
	title: string;
	cadence: string;
	crosswordType: string;
	moreUrl: string;
	entries: CrosswordArchiveEntry[];
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
	sections: CrosswordArchiveSection[];
}
