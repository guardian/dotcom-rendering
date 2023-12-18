import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import {
	imageStoryExpanded,
	imageStoryWithCreditExpanded,
} from '../../fixtures/manual/qandaAtom';
import { QandaAtom as QandaAtomComponent } from './QandaAtom.importable';
const meta: Meta<typeof QandaAtomComponent> = {
	title: 'Components/Q and A Atom',
	component: QandaAtomComponent,
};

type Story = StoryObj<typeof QandaAtomComponent>;

export const NewsStoryExpanded: Story = {
	args: { ...imageStoryExpanded },
	decorators: [splitTheme()],
};

export const ListStoryExpanded: Story = {
	args: { ...imageStoryExpanded },
	decorators: [splitTheme()],
};

export const ImageStoryWithCreditExpanded: Story = {
	args: { ...imageStoryWithCreditExpanded },
	decorators: [splitTheme()],
};

export default meta;
