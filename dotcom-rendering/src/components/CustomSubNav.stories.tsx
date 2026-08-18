import preview from '../../.storybook/preview';
import type { CustomSubnav } from '../types/customSubnav';
import { CustomSubNav as CustomSubNavComponent } from './CustomSubNav';

const links: CustomSubnav['links'] = [
	{ linkText: 'Wildlife', dotcomPath: '/environment/wildlife' },
	{ linkText: 'Energy', dotcomPath: '/environment/energy' },
	{ linkText: 'Pollution', dotcomPath: '/environment/pollution' },
	{ linkText: 'Climate crisis', dotcomPath: '/environment/climate-crisis' },
	{ linkText: 'Trees and forests', dotcomPath: '/environment/forests' },
];

const baseSubnav: CustomSubnav = {
	id: 'environment-custom-subnav',
	header: {
		headerText: 'The age of extinction',
		dotcomPath: '/environment/age-of-extinction',
		copy: 'Our reporting on the sixth mass extinction and the fight to protect the natural world.',
	},
	format: 'large',
	links,
	pages: [{ type: 'front', path: 'environment' }],
	lastUpdated: 1_700_000_000_000,
	updatedBy: 'Ada Lovelace',
	updatedEmail: 'ada.lovelace@theguardian.com',
};

const meta = preview.meta({
	component: CustomSubNavComponent,
	parameters: {},
	args: {
		guardianBaseURL: 'https://www.theguardian.com',
	},
});

export const Large = meta.story({
	args: {
		subnav: baseSubnav,
	},
});

export const Compact = meta.story({
	args: {
		subnav: {
			...baseSubnav,
			format: 'compact',
		},
	},
});
