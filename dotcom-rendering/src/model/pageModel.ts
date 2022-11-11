import type { NavType } from 'src/model/extract-nav';
import type { ConfigType } from '../types/config';
import type { FooterType } from '../types/footer';

type BasePageModel = {
	config: ConfigType;
	nav: NavType;
	footer: FooterType;
	editionId: 'UK' | 'US' | 'INT' | 'AU' | 'EUR';
};

export type NewslettersPageModel = BasePageModel & {
	newsletters: Newsletter[];
};
