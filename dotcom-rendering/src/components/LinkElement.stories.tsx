import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { lightDecorator } from '../../.storybook/decorators/themeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
import type { LinkElementProps } from './LinkElement';
import { LinkElement } from './LinkElement';

const meta: Meta<typeof LinkElement> = {
	title: 'Components/LinkElement',
	component: LinkElement,
} satisfies Meta<typeof LinkElement>;

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

const Template: StoryFn<typeof LinkElement> = (
	args: Omit<LinkElementProps, 'url' | 'priority'>,
) => {
	return (
		<>
			{urls.map((url) => (
				<LinkElement key={url} url={url} {...args} />
			))}
		</>
	);
};

export const WhenPrimary = {
	args: {
		priority: 'Primary',
		label: 'Click me',
		linkType: 'StandardButton',
	},
	render: Template,
	decorators: [lightDecorator(allThemeStandardVariations)],
} satisfies Story;
// *****************************************************************************

export const WhenTertiary = {
	args: {
		priority: 'Tertiary',
		label: 'Click me',
		linkType: 'StandardButton',
	},
	render: Template,
	decorators: [lightDecorator(allThemeStandardVariations)],
} satisfies Story;
// *****************************************************************************
