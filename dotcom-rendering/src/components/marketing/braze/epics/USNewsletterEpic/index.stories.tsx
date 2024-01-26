import React, { ReactElement } from 'react';
import { BrazeEndOfArticleComponent } from '../../BrazeEndOfArticleComponent';
import {
	StorybookWrapper,
	mockFetchEmail,
	mockSubscribe,
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
	component: 'USNewsletterEpic',
	title: 'EndOfArticle/USNewsletterEpic',
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
				subscribeToNewsletter={() => mockSubscribe('4300')}
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
	header: 'First Thing',
	frequency: 'Daily',
	paragraph1:
		'Start your day with a global perspective on America. Get the Guardian’s top stories and must reads in one hit – every weekday.',
	paragraph2:
		'We thought you should know this newsletter may contain information about Guardian products and services.',
	componentName: 'USNewsletterEpic',
	ophanComponentId: 'example_ophan_component_id',
};

DefaultStory.storyName = 'USNewsletterEpic';
