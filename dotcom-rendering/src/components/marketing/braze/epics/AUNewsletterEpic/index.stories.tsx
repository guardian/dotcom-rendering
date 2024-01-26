import type { ReactElement } from 'react';
import React from 'react';
import { BrazeEndOfArticleComponent } from '../../BrazeEndOfArticleComponent';
import {
	coreArgTypes,
	ophanComponentIdArgType,
} from '../storybookCommon/argTypes';
import { knobsData } from '../utils/knobsData';
import {
	mockButtonClick,
	mockComponentEvent,
	mockFetchEmail,
	mockSubscribe,
	StorybookWrapper,
} from '../utils/StorybookWrapper';
import type { BrazeMessageProps } from '.';

export default {
	component: 'AUNewsletterEpic',
	title: 'EndOfArticle/AUNewsletterEpic',
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
				subscribeToNewsletter={() => mockSubscribe('4148')}
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
	header: `Guardian Australia's Morning Mail`,
	frequency: 'Every weekday',
	paragraph1:
		'Get early morning news from Guardian Australia straight to your inbox.',
	paragraph2:
		'We thought you should know this newsletter may contain information about Guardian products and services.',
	componentName: 'AUNewsletterEpic',
	ophanComponentId: 'example_ophan_component_id',
};

DefaultStory.storyName = 'AUNewsletterEpic';
