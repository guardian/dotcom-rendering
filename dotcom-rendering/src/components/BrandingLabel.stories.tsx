import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { BrandingLabel } from './BrandingLabel';

const meta = {
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
} satisfies Meta<typeof BrandingLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		isLabs: false,
	},
} satisfies Story;

export const LabsHorizontalOrientation = {
	args: {
		isLabs: true,
		orientation: 'horizontal',
	},
} satisfies Story;

export const LabsVerticalOrientation = {
	args: {
		isLabs: true,
		orientation: 'vertical',
	},
} satisfies Story;

export const LabsVerticalRightAlignment = {
	args: {
		isLabs: true,
		orientation: 'vertical',
		alignment: 'end',
	},
} satisfies Story;
