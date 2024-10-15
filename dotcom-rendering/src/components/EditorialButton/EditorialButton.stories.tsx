import { css } from '@emotion/react';
import { SvgCross } from '@guardian/source/react-components';
import type { Meta, StoryFn } from '@storybook/react';
import {
	ArticleDesign,
	ArticleDisplay,
	Pillar as ArticlePillar,
	ArticleSpecial,
} from '../../lib/format';
import { EditorialButton } from './EditorialButton';
import type { EditorialButtonProps } from './EditorialButton';

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
};

const meta: Meta<typeof EditorialButton> = {
	title: 'Components/EditorialButton',
	component: EditorialButton,
	argTypes: {
		format: {
			options: [
				'news',
				'sport',
				'culture',
				'lifestyle',
				'opinion',
				'special_report',
				'labs',
			],
			mapping: {
				news: { ...defaultFormat, theme: ArticlePillar.News },
				sport: { ...defaultFormat, theme: ArticlePillar.Sport },
				culture: { ...defaultFormat, theme: ArticlePillar.Culture },
				lifestyle: { ...defaultFormat, theme: ArticlePillar.Lifestyle },
				opinion: { ...defaultFormat, theme: ArticlePillar.Opinion },
				special_report: {
					...defaultFormat,
					theme: ArticleSpecial.SpecialReport,
				},
				labs: { ...defaultFormat, theme: ArticleSpecial.Labs },
			},
			control: { type: 'radio' },
		},
		icon: {
			options: ['undefined', 'cross'],
			mapping: {
				undefined,
				cross: <SvgCross />,
			},
			control: { type: 'radio' },
		},
	},
	args: {
		size: 'default',
		hideLabel: false,
		icon: undefined,
		priority: 'primary',
		iconSide: 'left',
		nudgeIcon: false,
	},
};

export default meta;

const Template: StoryFn<typeof EditorialButton> = (
	args: EditorialButtonProps,
) => {
	// Providing any value for cssOverrides, even undefined, overrides the custom styles
	// for the editorial button so only pass through if it's defined
	const { cssOverrides, ...rest } = args;
	const props = rest as EditorialButtonProps;

	if (cssOverrides) {
		props.cssOverrides = cssOverrides;
	}

	return <EditorialButton {...props}>Click me</EditorialButton>;
};

const pillars = [
	ArticlePillar.News,
	ArticlePillar.Sport,
	ArticlePillar.Culture,
	ArticlePillar.Lifestyle,
	ArticlePillar.Opinion,
	ArticleSpecial.SpecialReport,
	ArticleSpecial.Labs,
];

const RowTemplate: StoryFn<typeof EditorialButton> = (
	args: Partial<EditorialButtonProps>,
) => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 800px;
		`}
	>
		{pillars.map((pillar) => (
			<Template
				key={pillar}
				{...args}
				format={{ ...defaultFormat, theme: pillar }}
			/>
		))}
	</div>
);

export const WhenPrimary: StoryFn<typeof EditorialButton> = RowTemplate.bind(
	{},
);
WhenPrimary.args = {
	priority: 'primary',
	size: 'small',
};

// *****************************************************************************

export const WhenSecondary: StoryFn<typeof EditorialButton> = RowTemplate.bind(
	{},
);
WhenSecondary.args = {
	priority: 'secondary',
	size: 'small',
};

// *****************************************************************************

export const WhenTertiary: StoryFn<typeof EditorialButton> = RowTemplate.bind(
	{},
);
WhenTertiary.args = {
	priority: 'tertiary',
	size: 'small',
};

// *****************************************************************************

export const WhenSubdued: StoryFn<typeof EditorialButton> = RowTemplate.bind(
	{},
);
WhenSubdued.args = {
	priority: 'subdued',
	size: 'small',
};

// *****************************************************************************

export const WithOverrides: StoryFn<typeof EditorialButton> = Template.bind({});
WithOverrides.args = {
	cssOverrides: css`
		background-color: pink;
	`,
};

// *****************************************************************************

export const WithDefaults: StoryFn<typeof EditorialButton> = Template.bind({});
WithDefaults.args = {};
