import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { SubheadingBlockComponent } from './SubheadingBlockComponent';

const globalH2Styles = css`
	p + h2 {
		padding-top: 8px;
	}
`;

const globalStrongStyles = css`
	strong {
		font-weight: bold;
	}
`;

/** Mocking the styles normally inherited via ArticleBody component */
const GlobalStylesDecorator: Decorator = (Story) => (
	<div css={[globalH2Styles, globalStrongStyles]}>{Story()}</div>
);

const StoryWrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			hr {
				border: 0.5px dashed;
			}

			margin: 10px;

			* {
				margin-bottom: 10px;
			}
		`}
	>
		{children}
	</div>
);

const subheadingHtmlStrings = [
	'<h2>Basic subheading</h2>',
	'<h2>Subheading with <strong>strong</strong> tags</h2>',
	"<h2>Subheading <a href='/'>with anchor</a></h2>",
	'<h2>Subheading with HTML comment<!-- HTML comment--></h2>',
	'Subheading text only (no HTML)',
];

const meta = {
	component: SubheadingBlockComponent,
	title: 'Components/SubheadingBlockComponent',
	render: (args) => {
		return (
			<StoryWrapper>
				{subheadingHtmlStrings.map((html, index) => (
					<SubheadingBlockComponent
						// eslint-disable-next-line react/no-array-index-key -- ignore for Story only
						key={index}
						format={args.format}
						html={html}
					/>
				))}

				<hr />
			</StoryWrapper>
		);
	},
	args: {
		html: '<h2>Subheading</h2>',
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	},
} satisfies Meta<typeof SubheadingBlockComponent>;

type Story = StoryObj<typeof meta>;
export default meta;

export const StandardDisplay = {
	decorators: [
		GlobalStylesDecorator,
		splitTheme([
			{
				design: ArticleDesign.Obituary,
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
			},
			{
				design: ArticleDesign.Comment,
				display: ArticleDisplay.Standard,
				theme: Pillar.Opinion,
			},
			{
				design: ArticleDesign.Comment,
				display: ArticleDisplay.Standard,
				theme: ArticleSpecial.Labs,
			},
			{
				design: ArticleDesign.Editorial,
				display: ArticleDisplay.Standard,
				theme: ArticleSpecial.SpecialReportAlt,
			},
			{
				design: ArticleDesign.Comment,
				display: ArticleDisplay.Standard,
				theme: ArticleSpecial.Labs,
			},
			{
				design: ArticleDesign.Editorial,
				display: ArticleDisplay.Standard,
				theme: ArticleSpecial.SpecialReportAlt,
			},
			{
				design: ArticleDesign.Comment,
				display: ArticleDisplay.Standard,
				theme: ArticleSpecial.Labs,
			},
			{
				design: ArticleDesign.Editorial,
				display: ArticleDisplay.Standard,
				theme: ArticleSpecial.SpecialReportAlt,
			},
			{
				design: ArticleDesign.Comment,
				display: ArticleDisplay.Standard,
				theme: ArticleSpecial.Labs,
			},
			{
				design: ArticleDesign.Editorial,
				display: ArticleDisplay.Standard,
				theme: ArticleSpecial.SpecialReportAlt,
			},
			{
				design: ArticleDesign.Analysis,
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
			},
			{
				design: ArticleDesign.Analysis,
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
			},
			{
				design: ArticleDesign.Feature,
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
			},
			{
				design: ArticleDesign.Interview,
				display: ArticleDisplay.Standard,
				theme: Pillar.Culture,
			},
			{
				design: ArticleDesign.Analysis,
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
			},
			{
				design: ArticleDesign.Feature,
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
			},
			{
				design: ArticleDesign.Interview,
				display: ArticleDisplay.Standard,
				theme: Pillar.Culture,
			},
		]),
	],
} satisfies Story;

export const ImmersiveDisplay = {
	decorators: [
		GlobalStylesDecorator,
		splitTheme([
			{
				design: ArticleDesign.Obituary,
				display: ArticleDisplay.Immersive,
				theme: Pillar.News,
			},
			{
				design: ArticleDesign.Comment,
				display: ArticleDisplay.Immersive,
				theme: Pillar.Opinion,
			},
			{
				design: ArticleDesign.Comment,
				display: ArticleDisplay.Immersive,
				theme: ArticleSpecial.Labs,
			},
			{
				design: ArticleDesign.Editorial,
				display: ArticleDisplay.Immersive,
				theme: ArticleSpecial.SpecialReportAlt,
			},
			{
				design: ArticleDesign.Comment,
				display: ArticleDisplay.Immersive,
				theme: ArticleSpecial.Labs,
			},
			{
				design: ArticleDesign.Editorial,
				display: ArticleDisplay.Immersive,
				theme: ArticleSpecial.SpecialReportAlt,
			},
			{
				design: ArticleDesign.Comment,
				display: ArticleDisplay.Immersive,
				theme: ArticleSpecial.Labs,
			},
			{
				design: ArticleDesign.Editorial,
				display: ArticleDisplay.Immersive,
				theme: ArticleSpecial.SpecialReportAlt,
			},
			{
				design: ArticleDesign.Comment,
				display: ArticleDisplay.Immersive,
				theme: ArticleSpecial.Labs,
			},
			{
				design: ArticleDesign.Editorial,
				display: ArticleDisplay.Immersive,
				theme: ArticleSpecial.SpecialReportAlt,
			},
			{
				design: ArticleDesign.Feature,
				display: ArticleDisplay.Immersive,
				theme: Pillar.News,
			},
			{
				design: ArticleDesign.Interview,
				display: ArticleDisplay.Immersive,
				theme: Pillar.Culture,
			},
			{
				design: ArticleDesign.Feature,
				display: ArticleDisplay.Immersive,
				theme: Pillar.News,
			},
			{
				design: ArticleDesign.Interview,
				display: ArticleDisplay.Immersive,
				theme: Pillar.Culture,
			},
		]),
	],
} satisfies Story;
