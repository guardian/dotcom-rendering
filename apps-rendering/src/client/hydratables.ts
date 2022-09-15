import { newsletterSignHydrateable } from 'components/HydrateableNewsletterSignup';
import { testComponentnHydrateable } from 'components/HydrationTestComponent';

export type Hydrateable = {
	containerClassName: string;
	renderInnerComponent: { (container: Element): React.ReactElement };
	needsInlineStyles: boolean;
};

export const hydrateables: Hydrateable[] = [
	newsletterSignHydrateable,
	testComponentnHydrateable,
];
