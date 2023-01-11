import type { NavType } from '../model/extract-nav';
import type { ConfigType } from '../types/config';
import type { Newsletter } from '../types/content';
import type { FooterType } from '../types/footer';
import type { TagType } from '../types/tag';
import type { EditionId } from '../web/lib/edition';

export type BasePageModel = {
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
};

export type NewslettersPageModel = BasePageModel & {
	newsletters: Newsletter[];
};
