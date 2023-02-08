import type { EditionId } from '../web/lib/edition';
import type { ConfigType } from './config';
import type { Newsletter } from './content';
import type { FooterType } from './footer';
import type { TagType } from './tag';

type KeysNotOnSimplePageConfig =
	| 'isPaidContent'
	| 'shortUrlId'
	| 'keywordIds'
	| 'shouldHideReaderRevenue'
	| 'showRelatedContent'
	| 'webPublicationDate'
	| 'dcrCouldRender';

type SimplePageConfig = Omit<ConfigType, KeysNotOnSimplePageConfig>;

export interface FENewslettersPageType {
	id: string;
	newsletters: Newsletter[];
	editionId: EditionId;
	subscribeUrl: string;
	contributionsServiceUrl: string;
	beaconURL: string;
	webTitle: string;
	description: string;
	config: SimplePageConfig;
	twitterData?: {
		[key: string]: string;
	};
	openGraphData?: {
		[key: string]: string;
	};
	nav: CAPINavType;
	pageFooter: FooterType;
	canonicalUrl: string;
	isAdFreeUser: boolean;
}

export type DCRNewslettersPageType = FENewslettersPageType & {
	sectionName?: string;
	format?: CAPIFormat;
	tags?: TagType[];
};
