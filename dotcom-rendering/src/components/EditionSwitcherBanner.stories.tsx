import type { Meta, StoryObj } from '@storybook/react';
import { EditionSwitcherBanner as EditionSwitcherBannerComponent } from './EditionSwitcherBanner.importable';

const meta = {
	title: 'Components/EditionSwitcherBanner',
	component: EditionSwitcherBannerComponent,
} satisfies Meta<typeof EditionSwitcherBannerComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EditionSwitcherBanner = {
	args: {
		pageId: 'uk',
		edition: 'US',
	},
} satisfies Story;
