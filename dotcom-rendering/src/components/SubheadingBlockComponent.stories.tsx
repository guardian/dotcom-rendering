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
import { getAllDesigns, getAllThemes } from '../lib/format';

const globalStrongStyles = css`
	strong {
		font-weight: bold;
	}
`;

/** Mocking the styles normally inherited via ArticleBody component */
const GlobalStylesDecorator: Decorator = (Story) => (
	<div css={[globalStrongStyles]}>{Story()}</div>
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

export const StandardDisplayThemeVariation = {
	decorators: [
		GlobalStylesDecorator,
		splitTheme(
			getAllThemes({
				// we need a design that colours h2s to illustrate the theme variation
				design: ArticleDesign.Analysis,
				display: ArticleDisplay.Standard,
			}),
		),
	],
} satisfies Story;

export const StandardDisplayDesignVariation = {
	decorators: [
		GlobalStylesDecorator,
		splitTheme(
			getAllDesigns({
				theme: Pillar.News,
				display: ArticleDisplay.Standard,
			}),
		),
	],
} satisfies Story;

export const ImmersiveDisplayThemeVariation = {
	decorators: [
		GlobalStylesDecorator,
		splitTheme(
			getAllThemes({
				// we need a design that colours h2s to illustrate the theme variation
				design: ArticleDesign.Analysis,
				display: ArticleDisplay.Immersive,
			}).concat(
				getAllThemes({
					// and a design that does not colour h2s to illustrate the lack of theme variation
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Immersive,
				}),
			),
		),
	],
} satisfies Story;

export const ImmersiveDisplayDesignVariation = {
	decorators: [
		GlobalStylesDecorator,
		splitTheme(
			getAllDesigns({
				theme: Pillar.News,
				display: ArticleDisplay.Immersive,
			}),
		),
	],
} satisfies Story;
