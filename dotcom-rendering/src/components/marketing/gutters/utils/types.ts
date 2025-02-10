import type { GutterContent } from '@guardian/support-dotcom-components/dist/shared/types';

// internal component
export interface GutterAskRenderProps {
	variant?: GutterContent;
	enrichedUrl: string;
	onCtaClick: () => void;
}
