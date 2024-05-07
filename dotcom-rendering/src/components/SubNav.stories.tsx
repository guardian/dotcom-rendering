import type { Meta, StoryObj } from '@storybook/react';
import { navInternational } from '../../fixtures/manual/nav-international';
import { navWorld } from '../../fixtures/manual/nav-world';
import { extractNAV } from '../model/extract-nav';
import { SubNav as SubNavComponent } from './SubNav.importable';

const meta = {
	component: SubNavComponent,
	parameters: {},
} satisfies Meta<typeof SubNavComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		subNavSections: extractNAV(navInternational).subNavSections ?? {
			links: [],
		},
		currentNavLink: '',
		position: 'header',
	},
} satisfies Story;

export const World = {
	args: {
		subNavSections: extractNAV(navWorld).subNavSections ?? { links: [] },
		currentNavLink: 'World',
		position: 'footer',
	},
} satisfies Story;
