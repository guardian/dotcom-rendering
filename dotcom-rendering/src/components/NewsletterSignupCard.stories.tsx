import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { NewsletterSignupCard } from './NewsletterSignupCard';
import { Section } from './Section';

const meta = preview.meta({
	component: NewsletterSignupCard,
	title: 'Components/Newsletter Signup Card',
	parameters: {
		chromatic: {
			modes: {
				'vertical mobile': allModes['vertical mobile'],
				'vertical tablet': allModes['vertical tablet'],
			},
		},
	},
	decorators: [
		(Story) => (
			<Section
				title="NewsletterSignupCard"
				showTopBorder={true}
				padContent={false}
				centralBorder="partial"
			>
				<Story />
			</Section>
		),
	],
});

export const Default = meta.story({
	args: {
		name: 'Saturday Edition',
		description:
			"An exclusive roundup of the week's best Guardian journalism from the editor-in-chief, Katharine Viner, free to your inbox every Saturday.",
		frequency: 'Weekly',
		illustrationSquare:
			'https://i.guim.co.uk/img/uploads/2023/11/01/SaturdayEdition_-_5-3.jpg?width=220&dpr=2&s=none&crop=5%3A3',
		children: <></>,
	},
});

/**
 * Demonstrates a longer frequency string in a narrow container, to show that
 * the text breaks after the "|" divider rather than wrapping mid-word.
 */
export const LongFrequencyNarrow = meta.story({
	args: {
		name: 'Breaking News US',
		description: 'Get the most important news as it breaks.',
		frequency: 'Around 2-3 times a day',
		illustrationSquare:
			'https://media.guim.co.uk/10b4e02333ee97ecf51d5e814fd324a88832fb17/1177_0_2998_3000/2998.jpg',
		children: <></>,
	},
	decorators: [
		(Story) => (
			<div css={{ maxWidth: 300 }}>
				<Story />
			</div>
		),
	],
});
