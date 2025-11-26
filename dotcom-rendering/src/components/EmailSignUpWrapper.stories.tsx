import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useEffect } from 'react';
import type { EmailSignUpProps } from './EmailSignup';
import { EmailSignUpWrapper } from './EmailSignUpWrapper';

const meta: Meta<typeof EmailSignUpWrapper> = {
	title: 'Components/EmailSignUpWrapper',
	component: EmailSignUpWrapper,
};

type Story = StoryObj<typeof EmailSignUpWrapper>;

const defaultArgs = {
	index: 10,
	listId: 4147,
	identityName: 'the-recap',
	description:
		"The best of our sports journalism from the past seven days and a heads-up on the weekend's action",
	name: 'The Recap',
	frequency: 'Weekly',
	successDescription: "We'll send you The Recap every week",
	theme: 'sport',
} satisfies Story['args'];

export const DefaultStory: Story = {
	args: {
		hidePrivacyMessage: true,
		...defaultArgs,
	},
};

export const DefaultStoryWithPrivacy: Story = {
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
	},
};

// Simulates when user is NOT subscribed - signup form is visible
export const NotSubscribedState: Story = {
	args: {
		hidePrivacyMessage: false,
		...defaultArgs,
	},
	decorators: [(Story) => <Story />],
};

// Simulates when user IS subscribed - component returns null
interface EmailSignUpWrapperProps extends EmailSignUpProps {
	index: number;
	listId: number;
	identityName: string;
	successDescription: string;
	hidePrivacyMessage?: boolean;
}

const AlreadySubscribedWrapper = (props: EmailSignUpWrapperProps) => {
	const idApiUrl = window.guardian?.config?.page?.idApiUrl;
	// Directly use the hook logic - in a real scenario it would return true
	// For storybook, we simulate by just returning null
	const isSubscribed = true; // Simulating hook return value

	useEffect(() => {
		console.log(
			'AlreadySubscribedState: useNewsletterSubscription would return true',
		);
		console.log('Props:', { listId: props.listId, idApiUrl });
	}, [props.listId, idApiUrl]);

	if (isSubscribed === true) {
		return null;
	}

	return <EmailSignUpWrapper {...props} />;
};

export const AlreadySubscribedState = {
	render: (args: EmailSignUpWrapperProps) => (
		<AlreadySubscribedWrapper {...args} />
	),
	args: {
		...defaultArgs,
		hidePrivacyMessage: false,
	},
} satisfies Story;

export default meta;
