import type { NavType } from 'src/model/extract-nav';
import type { EditionId } from 'src/types/edition';
import type { ConfigType } from '../types/config';
import type { FooterType } from '../types/footer';

export type BasePageModel = {
	config: ConfigType;
	nav: NavType;
	footer: FooterType;
	editionId: EditionId;

	renderAds?: boolean;
	subscribeUrl: string;
	contributionsServiceUrl: string;

	webTitle: string;
	description?: string;
	format?: CAPIFormat;
	sectionName?: string;
	tags?: TagType[];

	beaconURL: string;
};

export type NewslettersPageModel = BasePageModel & {
	newsletters: Newsletter[];
};
