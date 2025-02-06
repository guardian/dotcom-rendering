import type { GutterContent } from '@guardian/support-dotcom-components/dist/shared/types';

// TODO: temporary - once SDC changes in place, switch to using those.
export type GutterVariant = {
	name: string;
	moduleName: string;
	content: {
		image: {
			mainUrl: string;
			altText: string;
		};
		bodyCopy: string[];
		cta: {
			baseUrl: string;
			text: string;
		};
	};
};

// end temporary

// internal component
export interface GutterAskRenderProps {
	variant?: GutterContent;
	enrichedUrl: string;
	onCtaClick: () => void;
}
