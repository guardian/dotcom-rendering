import preview from '../../.storybook/preview';
import { BrandingLabel } from './BrandingLabel';

const meta = preview.meta({
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
});

export const Default = meta.story({
	args: {
		isLabs: false,
	},
});

export const LabsHorizontalOrientation = meta.story({
	args: {
		isLabs: true,
		orientation: 'horizontal',
	},
});

export const LabsVerticalOrientation = meta.story({
	args: {
		isLabs: true,
		orientation: 'vertical',
	},
});

export const LabsVerticalRightAlignment = meta.story({
	args: {
		isLabs: true,
		orientation: 'vertical',
		alignment: 'end',
	},
});
