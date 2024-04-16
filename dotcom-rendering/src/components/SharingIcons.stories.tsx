import type { Meta, StoryObj } from '@storybook/react';
import { sharingUrls } from '../../fixtures/manual/sharingUrls';
import { SharingIcons as SharingIconsComponent } from './SharingIcons';

const meta = {
	title: 'Components/SharingIcons',
	component: SharingIconsComponent,
} satisfies Meta<typeof SharingIconsComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SharingIcons = {
	args: {
		sharingUrls,
		displayIcons: [
			'facebook',
			'twitter',
			'email',
			'whatsApp',
			'messenger',
			'pinterest',
			'linkedIn',
		],
	},
} satisfies Story;
