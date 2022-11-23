import type { NavType } from 'src/model/extract-nav';
import type { TagType } from 'src/types/tag';
import type { EditionId } from 'src/web/lib/edition';
import type { ConfigType } from '../types/config';
import type { FooterType } from '../types/footer';

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
