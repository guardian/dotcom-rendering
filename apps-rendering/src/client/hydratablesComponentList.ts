import { newsletterSignHydrateable } from 'components/NewsletterSignup';
import { testComponentnHydrateable } from 'components/HydrationTestComponent';
import { Hydrateable } from './hydratables';

export const hydratablesComponentList: Hydrateable[] = [
	newsletterSignHydrateable,
	testComponentnHydrateable,
];
