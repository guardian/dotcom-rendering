import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import { calloutCampaign } from '../../fixtures/manual/calloutCampaign';
import { customMockFetch } from '../lib/mockRESTCalls';
import { CalloutEmbedBlockComponent as CalloutEmbedBlock } from './CalloutEmbedBlockComponent.importable';

const meta = {
	component: CalloutEmbedBlock,
	title: 'Components/Callout Embed Block Component',
	decorators: [centreColumnDecorator],
	parameters: {
		chromatic: {
			modes: {
				'light mobileMedium': allModes['light mobileMedium'],
			},
		},
	},
} satisfies Meta<typeof CalloutEmbedBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

const goodRequest: Decorator<Story['args']> = (Story) => {
	global.fetch = customMockFetch([
		{
			mockedMethod: 'POST',
			mockedUrl:
				'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
			mockedStatus: 201,
		},
	]);

	return <Story />;
};

export const CalloutEmbedBlockComponent = {
	args: {
		callout: calloutCampaign,
	},
	decorators: [goodRequest],
} satisfies Story;
