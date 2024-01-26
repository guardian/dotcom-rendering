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
import { BrazeMessageProps } from '.';
import { grid, withGrid } from '../../.storybook/grid/withGrid';

export default {
	component: 'NewsletterEpic',
	title: 'EndOfArticle/NewsletterEpic',
	decorators: [withGrid],
	parameters: {
		grid: {
			disable: false,
		},
	},
	argTypes: {
		...coreArgTypes,
		...ophanComponentIdArgType,
		newsletterId: {
			name: 'newsletterId',
			type: { name: 'string', required: true },
			description: 'The newsletter Id value',
		},
		imageUrl: {
			name: 'imageUrl (use Grid image picker)',
			type: { name: 'string', required: true },
			control: null,
			description:
				'i.guim.co.uk URL for the epic image. Use the Grid image picker to select this.',
		},
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
	args: BrazeMessageProps & {
		componentName: string;
		newsletterId: string;
	},
): ReactElement | null => {
	const imageUrl = grid(
		'https://i.guim.co.uk/img/media/898c5401ab51b983dc4b2508aaaf0735e6bda0e2/0_0_2000_2000/2000.png?width=400&quality=75&s=9191ec413d946058f37caced7edd0b90',
	);

	const brazeMessageProps = {
		newsletterId: args.newsletterId,
		imageUrl,
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
	newsletterId: '6023',
	header: `Newsletter title`,
	frequency: 'Frequency',
	paragraph1:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	paragraph2:
		'We thought you should know this newsletter may contain information about Guardian products and services.',
	componentName: 'NewsletterEpic',
	ophanComponentId: 'example_ophan_component_id',
};

DefaultStory.story = { name: 'NewsletterEpic' };
