import type { Meta } from '@storybook/react';
import { SponsoredContentLabel } from './SponsoredContentLabel';

const meta: Meta<typeof SponsoredContentLabel> = {
	component: SponsoredContentLabel,
	title: 'Components/SponsoredContentLabel',
	parameters: {
		layout: 'centered',
		chromatic: {
			disable: true,
		},
	},
	args: {
		branding: {
			logo: {
				src: 'https://static.theguardian.com/commercial/sponsor/22/Aug/2025/52dc0276-c2d9-405c-a686-2577c12914d4-ecover_pos_280.png',
				link: '#',
				label: 'Paid for',
				dimensions: {
					width: 120,
					height: 60,
				},
			},
			logoForDarkBackground: {
				src: 'https://static.theguardian.com/commercial/sponsor/22/Aug/2025/52dc0276-c2d9-405c-a686-2577c12914d4-ecover_pos_280.png',
				link: '#',
				label: 'Paid for',
				dimensions: {
					width: 120,
					height: 60,
				},
			},
			sponsorName: 'Guardian Org',
			aboutThisLink: '',
		},
	},
};

export default meta;

export const HorizontalOrientation = {
	args: {
		orientation: 'horizontal',
	},
};

export const VerticalOrientation = {
	args: {
		orientation: 'vertical',
	},
};

export const VerticalRightAlignment = {
	args: {
		alignment: 'end',
		orientation: 'vertical',
	},
};
