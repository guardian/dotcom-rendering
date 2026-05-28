import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { NewsletterHighlightsCard } from './NewsletterHighlightsCard';
import { Section } from './Section';

const meta = preview.meta({
	component: NewsletterHighlightsCard,
	title: 'Components/Newsletter Highlights Card',
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
				title="NewsletterHighlightsCard"
				showTopBorder={true}
				padContent={false}
				centralBorder="partial"
			>
				<Story />
			</Section>
		),
	],
});

const defaultArgs = {
	highlightCardTitle: 'Sign up to Saturday Edition',
	illustrationSquare:
		'https://i.guim.co.uk/img/uploads/2023/11/01/SaturdayEdition_-_5-3.jpg?width=220&dpr=2&s=none&crop=5%3A3',
	onClick: () => undefined,
};

export const Default = meta.story({
	args: defaultArgs,
});

export const LongHighlightCardTitle = meta.story({
	args: {
		...defaultArgs,
		highlightCardTitle:
			'Sign up to This is London: your free weekly city guide',
	},
});
