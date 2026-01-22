import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { lightDecorator } from '../../../.storybook/decorators/themeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../../lib/articleFormat';
import type { StandardLinkElementButtonProps } from './StandardLinkElementButton';
import { StandardLinkElementButton } from './StandardLinkElementButton';

const meta: Meta<typeof StandardLinkElementButton> = {
	title: 'Components/StandardLinkElementButton',
	component: StandardLinkElementButton,
} satisfies Meta<typeof StandardLinkElementButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const pillars = [
	Pillar.News,
	Pillar.Sport,
	Pillar.Culture,
	Pillar.Lifestyle,
	Pillar.Opinion,
	ArticleSpecial.SpecialReport,
	ArticleSpecial.Labs,
];

const allThemeStandardVariations = pillars.map((theme) => ({
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme,
}));

const urls = ['https://www.theguardian.com/uk', 'https://www.bbc.co.uk'];

const Template: StoryFn<typeof StandardLinkElementButton> = (
	args: Omit<StandardLinkElementButtonProps, 'url' | 'priority'>,
) => {
	return (
		<>
			{urls.map((url) => (
				<StandardLinkElementButton
					key={url}
					{...args}
					label="Click me"
					url={url}
				/>
			))}
		</>
	);
};

export const WhenPrimary = {
	args: {
		priority: 'primary',
	},
	render: Template,
	decorators: [lightDecorator(allThemeStandardVariations)],
} satisfies Story;
// *****************************************************************************

export const WhenSecondary = {
	args: {
		priority: 'secondary',
	},
	render: Template,
	decorators: [lightDecorator(allThemeStandardVariations)],
} satisfies Story;
// *****************************************************************************

export const WhenTertiary = {
	args: {
		priority: 'tertiary',
	},
	render: Template,
	decorators: [lightDecorator(allThemeStandardVariations)],
} satisfies Story;
// *****************************************************************************

export const WhenSubdued = {
	args: {
		priority: 'subdued',
	},
	render: Template,
	decorators: [lightDecorator(allThemeStandardVariations)],
} satisfies Story;
// *****************************************************************************
