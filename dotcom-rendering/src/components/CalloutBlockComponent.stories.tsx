import type { Decorator, Meta, StoryObj } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { calloutCampaign as calloutCampaignV2 } from '../../fixtures/manual/calloutCampaignV2';
import { CalloutBlockComponent } from './CalloutBlockComponent.importable';

const tomorrow = new Date().setDate(new Date().getDate() + 1) / 1000;
const yesterday = new Date().setDate(new Date().getDate() - 1) / 1000;

const meta = {
	component: CalloutBlockComponent,
	title: 'Components/Callout Block Component',
	decorators: [centreColumnDecorator],
} satisfies Meta<typeof CalloutBlockComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const goodRequest: Decorator<Story['args']> = (Story) => {
	fetchMock
		.restore()
		.post(
			'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
			{
				status: 201,
				body: null,
			},
		)
		.spy('end:.hot-update.json');

	return <Story />;
};

const badRequest: Decorator<Story['args']> = (Story) => {
	fetchMock
		.restore()
		.post(
			'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
			{
				status: 400,
				body: null,
			},
		)
		.spy('end:.hot-update.json');

	return <Story />;
};

/** ensure that multiple form IDs are not present on the same page */
let counter = 0;
const uniqueFormId: Decorator<Story['args']> = (Story, context) => (
	<Story
		args={{
			...context.args,
			callout: {
				...context.args.callout,
				formId: context.args.callout.formId + ++counter,
			},
		}}
	/>
);

export const NonCollapsible = {
	args: {
		callout: {
			...calloutCampaignV2,
			activeUntil: tomorrow,
		},
		pageId: 'world/2023/mar/01/tell-us-have-you-been-affected-by-the-train-crash-in-greece',
	},
	decorators: [goodRequest],
} satisfies Story;

export const Collapsible = {
	args: {
		...NonCollapsible.args,
		callout: {
			...NonCollapsible.args.callout,
			isNonCollapsible: false,
		},
	},
	decorators: [goodRequest, uniqueFormId],
} satisfies Story;

export const SubmissionFailure = {
	args: NonCollapsible.args,
	decorators: [badRequest],
	play: async ({ canvasElement }) => {
		await new Promise((resolve) => {
			// there’s some weirdness that resets the form
			setTimeout(resolve, 600);
		});

		const buttons = [
			...canvasElement.querySelectorAll('button[type=submit]'),
		];

		for (const button of buttons) {
			if (!(button instanceof HTMLButtonElement)) return;
			button.click();
		}
	},
} satisfies Story;

export const Expired = {
	args: {
		...NonCollapsible.args,
		callout: {
			...NonCollapsible.args.callout,
			activeUntil: yesterday,
		},
	},
} satisfies Story;

export const MinimalCallout = {
	args: {
		...Collapsible.args,
		callout: {
			...Collapsible.args.callout,
			title: '',
			prompt: '',
			description: '',
		},
	},
	decorators: [
		uniqueFormId,
		(Story) => (
			<>
				<div css={{ fontWeight: 'bold', paddingBottom: '16px' }}>
					Prompt, title and description are all optional
				</div>
				<Story />
			</>
		),
	],
} satisfies Story;
