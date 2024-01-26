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
	component: 'DownToEarthNewsletterEpic',
	title: 'EndOfArticle/DownToEarthNewsletterEpic',
	parameters: {
		articleContext: {
			disable: false,
		},
	},
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
				subscribeToNewsletter={() => mockSubscribe('4147')}
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
	header: 'Down To Earth',
	frequency: 'Weekly',
	paragraph1:
		'An exclusive weekly piece from our top climate crisis correspondents, as well as a digest of the biggest environment stories – plus the good news, the not-so-good news, and everything else you need to know.',
	paragraph2:
		'We thought you should know this newsletter may contain information about Guardian products and services.',
	componentName: 'DownToEarthNewsletterEpic',
	ophanComponentId: 'example_ophan_component_id',
};

DefaultStory.storyName = 'DownToEarthNewsletterEpic';
