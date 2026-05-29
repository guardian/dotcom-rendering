import preview from '../../.storybook/preview';
import { navInternational } from '../../fixtures/manual/nav-international';
import { navWorld } from '../../fixtures/manual/nav-world';
import { extractNAV } from '../model/extract-nav';
import { SubNav as SubNavComponent } from './SubNav.island';

const meta = preview.meta({
	component: SubNavComponent,
	parameters: {},
});

export const Default = meta.story({
	args: {
		subNavSections: extractNAV(navInternational).subNavSections ?? {
			links: [],
		},
		currentNavLink: '',
		position: 'header',
	},
});

export const World = meta.story({
	args: {
		subNavSections: extractNAV(navWorld).subNavSections ?? { links: [] },
		currentNavLink: 'World',
		position: 'footer',
	},
});
