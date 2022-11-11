import type { NavType } from 'src/model/extract-nav';
import type { EditionId } from 'src/types/edition';
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
	config: ConfigType;
	nav: NavType;
	footer: FooterType;
};

export type NewslettersPageModel = BasePageModel & {
	newsletters: Newsletter[];
};
