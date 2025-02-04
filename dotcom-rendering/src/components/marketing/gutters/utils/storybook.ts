import type { GutterAskProps, GutterVariant } from './types';

const variant: GutterVariant = {
	name: 'default',
	moduleName: 'Gutter',
	content: {
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
	},
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const onCtaClick = () => {
	return undefined;
}; // TODO: temporary...

export const props: GutterAskProps = { variant, onCtaClick };
