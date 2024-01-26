import React, { ReactElement } from 'react';
import { BrazeEndOfArticleComponent } from '../../BrazeEndOfArticleComponent';
import {
	StorybookWrapper,
	mockSubscribe,
	mockFetchEmail,
	mockButtonClick,
	mockComponentEvent,
} from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';
import {
	coreArgTypes,
	ophanComponentIdArgType,
} from '../storybookCommon/argTypes';
import type { BrazeMessageProps } from '.';

export default {
	component: 'EpicNewsletter_AU_AfternoonUpdate',
	title: 'EndOfArticle/EpicNewsletter_AU_AfternoonUpdate',
	parameters: {},
	argTypes: {
		...coreArgTypes,
		...ophanComponentIdArgType,
		header: {
			name: 'header',
			type: { name: 'string', required: true },
			description: 'Header text',
		},
		frequency: {
			name: 'frequency',
			type: { name: 'string', required: true },
			description: 'Text description of how often the email is sent',
		},
		paragraph1: {
			name: 'paragraph1',
			type: { name: 'string', required: true },
			description: 'First paragraph',
		},
		paragraph2: {
			name: 'paragraph2',
			type: { name: 'string', required: false },
			description: 'Second paragraph',
		},
	},
};

const StoryTemplate = (
	args: BrazeMessageProps & { componentName: string },
): ReactElement | null => {
	const brazeMessageProps = {
		header: args.header,
		frequency: args.frequency,
		paragraph1: args.paragraph1,
		paragraph2: args.paragraph2,
		ophanComponentId: args.ophanComponentId,
	};

	knobsData.set({ ...brazeMessageProps, componentName: args.componentName });

	return (
		<StorybookWrapper>
			<BrazeEndOfArticleComponent
				componentName={args.componentName}
				brazeMessageProps={brazeMessageProps}
				subscribeToNewsletter={() => mockSubscribe('6023')}
				fetchEmail={() => mockFetchEmail()}
				logButtonClickWithBraze={(internalButtonId) =>
					mockButtonClick(internalButtonId)
				}
				submitComponentEvent={(componentEvent) =>
					mockComponentEvent(componentEvent)
				}
			/>
		</StorybookWrapper>
	);
};

export const DefaultStory = StoryTemplate.bind({});

DefaultStory.args = {
	slotName: 'EndOfArticle',
	header: `Sign up for Guardian Australia's Afternoon Update`,
	frequency: 'Every weekday',
	paragraph1:
		'Our Australian afternoon update breaks down the key stories of the day, telling you what’s happening and why it matters.',
	paragraph2:
		'We thought you should know this newsletter may contain information about Guardian products and services.',
	componentName: 'EpicNewsletter_AU_AfternoonUpdate',
	ophanComponentId: 'example_ophan_component_id',
};

DefaultStory.storyName = 'EpicNewsletter_AU_AfternoonUpdate';
