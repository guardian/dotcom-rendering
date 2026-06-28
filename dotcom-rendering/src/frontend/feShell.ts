import type { EditionId } from '../lib/edition';
import type { ConfigType } from '../types/config';
import type { FooterType } from '../types/footer';
import type { FENavType } from '../types/frontend';

export type FEShell = {
	canonicalUrl: string;
	config: ConfigType;
	contributionsServiceUrl: string;
	editionId: EditionId;
	guardianBaseURL: string;
	isAdFreeUser: boolean;
	nav: FENavType;
	pageFooter: FooterType;
	pageId: string;
};
