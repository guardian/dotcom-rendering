import type { Meta, StoryObj } from '@storybook/react-webpack5';
import MockDate from 'mockdate';
import { mockStorylinesSectionContent } from '../../fixtures/manual/storylines-section';
import { StorylinesSectionContent } from './StorylinesSectionContent.island';

const meta = {
	component: StorylinesSectionContent,
	title: 'Components/StorylinesSectionContent',
	args: {
		url: 'https://www.theguardian.com/technology/artificialintelligenceai',
		index: 1,
		containerId: 'container-1 | storylines-section',
		editionId: 'UK',
		storylinesContent: mockStorylinesSectionContent,
	},
	beforeEach: () => {
		const globalMockDate = new Date();
		/**
		 * Fixture articles are from Dec 2025; the global mock date would put them in the future,
		 * but we want to make sure that they're in the past so that the publication date shows
		 * in the component correctly.*/
		MockDate.set('2025-12-10T12:00:00Z');
		return () => MockDate.set(globalMockDate);
	},
	render: (args) => <StorylinesSectionContent {...args} />,
} satisfies Meta<typeof StorylinesSectionContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
