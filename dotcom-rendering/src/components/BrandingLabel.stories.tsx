import type { Meta } from '@storybook/react-webpack5';
import { BrandingLabel } from './BrandingLabel';

const meta: Meta<typeof BrandingLabel> = {
	component: BrandingLabel,
	title: 'Components/BrandingLabel',
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
				label: 'Paid for by',
				dimensions: {
					width: 120,
					height: 60,
				},
			},
			logoForDarkBackground: {
				src: 'https://static.theguardian.com/commercial/sponsor/22/Aug/2025/52dc0276-c2d9-405c-a686-2577c12914d4-ecover_pos_280.png',
				link: '#',
				label: 'Paid for by',
				dimensions: {
					width: 120,
					height: 60,
				},
			},
			sponsorName: 'Guardian Org',
			aboutThisLink: '#about',
		},
	},
};

export default meta;

export const Default = {
	args: {
		isLabs: false,
	},
};

export const LabsHorizontalOrientation = {
	args: {
		isLabs: true,
		orientation: 'horizontal',
	},
};

export const LabsVerticalOrientation = {
	args: {
		isLabs: true,
		orientation: 'vertical',
	},
};

export const LabsVerticalRightAlignment = {
	args: {
		isLabs: true,
		orientation: 'vertical',
		alignment: 'end',
	},
};
