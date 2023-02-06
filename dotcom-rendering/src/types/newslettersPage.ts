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

export interface FENewslettersPageType {
	newsletters: Newsletter[];
	id: string;
	editionId: EditionId;
	subscribeUrl: string;
	contributionsServiceUrl: string;
	beaconURL: string;
	webTitle: string;
	description: string;
	config: Omit<ConfigType, KeysNotOnSimplePageConfig>;
	twitterData?: {
		[key: string]: string;
	};
	openGraphData?: {
		[key: string]: string;
	};
	nav: CAPINavType;
	pageFooter: FooterType;
}

export type DCRNewslettersPageType = {
	webTitle: string;
	description?: string;
	canonicalUrl?: string;
	sectionName?: string;
	format?: CAPIFormat;
	editionId: EditionId;
	tags?: TagType[];
	renderAds?: boolean;
	subscribeUrl: string;
	contributionsServiceUrl: string;
	beaconURL: string;
	twitterData?: {
		[key: string]: string;
	};
	openGraphData?: {
		[key: string]: string;
	};
	config: ConfigType;
	nav: CAPINavType;
	pageFooter: FooterType;
	newsletters: Newsletter[];
};
