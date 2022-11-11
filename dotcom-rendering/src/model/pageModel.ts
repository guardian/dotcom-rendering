import type { NavType } from 'src/model/extract-nav';
import type { ConfigType } from '../types/config';
import type { FooterType } from '../types/footer';

export type BasePageModel = {
	config: ConfigType;
	nav: NavType;
	footer: FooterType;
	editionId: 'UK' | 'US' | 'INT' | 'AU' | 'EUR';

	isPaidContent?: boolean;
	shouldHideReaderRevenue?: boolean;
	renderAds?: boolean;
	subscribeUrl: string;
	contributionsServiceUrl: string;

	webTitle: string;
	description?: string;
	format?: CAPIFormat;
	sectionName?: string;
	contentType: string;
	tags?: TagType[];
	pageId: string;
	beaconURL: string;
};

export type NewslettersPageModel = BasePageModel & {
	newsletters: Newsletter[];
};
