import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { storylinesSectionContent } from '../../fixtures/manual/storylinesSectionContent';
import { StorylinesSection } from './StorylinesSection.importable';

const meta = {
	component: StorylinesSection,
	title: 'Components/StorylinesSection',
	args: {
		url: 'https://www.theguardian.com/technology/artificialintelligenceai',
		index: 1,
		containerId: 'container-1 | storylines-section',
		editionId: 'UK',
		TPSGContent: storylinesSectionContent,
	},
	render: (args) => (
		<div
			css={css`
				width: 280px;
			`}
		>
			<StorylinesSection {...args} />
		</div>
	),
} satisfies Meta<typeof StorylinesSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
