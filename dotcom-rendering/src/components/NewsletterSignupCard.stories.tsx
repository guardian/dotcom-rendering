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
