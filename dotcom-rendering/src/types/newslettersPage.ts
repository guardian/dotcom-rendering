import type { NavType } from '../model/extract-nav';
import type { EditionId } from '../web/lib/edition';
import type { ConfigType } from './config';
import type { Newsletter } from './content';
import type { FooterType } from './footer';
import type { TagType } from './tag';

export interface FENewslettersPageType {
	newsletters: Newsletter[];
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
	nav: NavType;
	footer: FooterType;
	newsletters: Newsletter[];
};
