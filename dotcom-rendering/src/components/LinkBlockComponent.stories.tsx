import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { lightDecorator } from '../../.storybook/decorators/themeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
import type { LinkBlockComponentProps } from './LinkBlockComponent';
import { LinkBlockComponent } from './LinkBlockComponent';

const meta: Meta<typeof LinkBlockComponent> = {
	title: 'Components/LinkElement',
	component: LinkBlockComponent,
} satisfies Meta<typeof LinkBlockComponent>;

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

const Template: StoryFn<typeof LinkBlockComponent> = (
	args: Omit<LinkBlockComponentProps, 'url' | 'priority'>,
) => {
	return (
		<>
			{urls.map((url) => (
				<LinkBlockComponent key={url} url={url} {...args} />
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
