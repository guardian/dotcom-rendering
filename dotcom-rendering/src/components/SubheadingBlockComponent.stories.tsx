import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { headline } from '@guardian/source-foundations';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { SubheadingBlockComponent } from './SubheadingBlockComponent';

const standardFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

const immersiveFormat = {
	...standardFormat,
	display: ArticleDisplay.Immersive,
};

/** Mocking the styles normally inherited via ArticleBody component */
const GlobalStylesDecorator =
	(format: ArticleFormat): Decorator =>
	(Story) => (
		<div
			css={css`
				h2:not([data-ignore='global-h2-styling']) {
					${format.display === ArticleDisplay.Immersive
						? headline.medium({ fontWeight: 'light' })
						: headline.xxsmall({ fontWeight: 'bold' })};
				}

				p + h2 {
					padding-top: 8px;
				}
			`}
		>
			{Story()}
		</div>
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

const meta = {
	component: SubheadingBlockComponent,
	title: 'Components/SubheadingBlockComponent',
	render: (args) => {
		return (
			<StoryWrapper>
				<SubheadingBlockComponent
					format={args.format}
					html="<h2>Basic subheading</h2>"
				/>
				<SubheadingBlockComponent
					format={args.format}
					html="<h2>Subheading <a href='/'>with anchor</a></h2>"
				/>
				<SubheadingBlockComponent
					format={args.format}
					html="<h2>Subheading with HTML comment<!-- HTML comment--></h2>"
				/>
				<SubheadingBlockComponent
					format={args.format}
					html="Subheading text only (no HTML)"
				/>

				<hr />
			</StoryWrapper>
		);
	},
	args: {
		html: '<h2>Subheading</h2>',
		format: standardFormat,
	},
} satisfies Meta<typeof SubheadingBlockComponent>;

type Story = StoryObj<typeof meta>;
export default meta;

export const StandardDisplay = {
	decorators: [
		GlobalStylesDecorator(standardFormat),

		splitTheme([
			// "Authoritative clear" styles
			{
				design: ArticleDesign.Obituary,
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
			},
			// "Authoritative stand-out" styles
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
			// "Neutral clear" styles
			standardFormat,
			// "Neutral stand-out" styles
			{
				design: ArticleDesign.DeadBlog,
				display: ArticleDisplay.Standard,
				theme: Pillar.Sport,
			},
			{
				design: ArticleDesign.Analysis,
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
			},
			// "Soft" stand-out styles
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
		GlobalStylesDecorator(immersiveFormat),
		splitTheme([
			// "Authoritative clear" styles
			{
				design: ArticleDesign.Obituary,
				display: ArticleDisplay.Immersive,
				theme: Pillar.News,
			},
			// "Authoritative stand-out" styles
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
			// "Neutral clear" styles
			immersiveFormat,
			// "Neutral stand-out" styles
			{
				design: ArticleDesign.DeadBlog,
				display: ArticleDisplay.Immersive,
				theme: Pillar.Sport,
			},
			{
				design: ArticleDesign.Analysis,
				display: ArticleDisplay.Immersive,
				theme: Pillar.Lifestyle,
			},
			// "Soft" stand-out styles
			{
				design: ArticleDesign.Interview,
				display: ArticleDisplay.Immersive,
				theme: Pillar.Culture,
			},
		]),
	],
} satisfies Story;
