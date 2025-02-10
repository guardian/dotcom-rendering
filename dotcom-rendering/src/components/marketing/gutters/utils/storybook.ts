import type { GutterContent } from '@guardian/support-dotcom-components/dist/shared/types';
import type { GutterAskRenderProps } from './types';

const variant: GutterContent = {
	image: {
		mainUrl: 'https://uploads.guim.co.uk/2025/01/22/not_for_sale.svg',
		altText: 'Not for Sale',
	},
	bodyCopy: [
		'The Guardian’s expert news coverage is funded by people like you, not a billionaire owner. Will you help us keep our independent journalism free and open to all today?',
	],
	cta: {
		baseUrl: 'https://support.theguardian.com/contribute',
		text: 'Support us',
	},
};

const enrichedUrl = 'https://www.theguardian.com/uk';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const onCtaClick = () => {
	return undefined;
}; // TODO: temporary...

export const props: GutterAskRenderProps = { variant, enrichedUrl, onCtaClick };
