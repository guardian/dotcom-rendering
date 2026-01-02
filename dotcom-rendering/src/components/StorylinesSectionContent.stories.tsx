import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { mockStorylinesSectionContent } from '../../fixtures/manual/storylines-section';
import { StorylinesSectionContent } from './StorylinesSectionContent.importable';

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
	render: (args) => <StorylinesSectionContent {...args} />,
} satisfies Meta<typeof StorylinesSectionContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
