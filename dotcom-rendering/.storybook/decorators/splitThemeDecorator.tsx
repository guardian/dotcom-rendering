// ----- Imports ----- //
import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleFormat,
	ArticleSpecial,
	Pillar,
} from '../../src/lib/articleFormat';
import {
	palette as sourcePalette,
	space,
	textSans17,
	textSansBold20,
} from '@guardian/source/foundations';
import { Decorator } from '@storybook/react';
import { storybookPaletteDeclarations as paletteDeclarations } from '../mocks/paletteDeclarations';
import type { ReactNode } from 'react';

interface Orientation {
	orientation?: 'horizontal' | 'vertical';
}

/**
 * The `splitTheme` decorator displays a story simultaneously in both light and
 * dark mode.
 */
type ColourScheme = 'light' | 'dark';

/**
 * The second argument to a Storybook decorator is the story's context.
 */
type Context = Parameters<Decorator>[1];

/** A list of the most typical formats */
export const defaultFormats = [
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	},
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.Sport,
	},
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.Opinion,
	},
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.Culture,
	},
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.Lifestyle,
	},
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticleSpecial.Labs,
	},
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticleSpecial.SpecialReport,
	},
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticleSpecial.SpecialReportAlt,
	},
	{
		display: ArticleDisplay.Immersive,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	},
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Gallery,
		theme: Pillar.News,
	},
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.LiveBlog,
		theme: Pillar.News,
	},
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.LiveBlog,
		theme: Pillar.Sport,
	},
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.DeadBlog,
		theme: Pillar.News,
	},
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.DeadBlog,
		theme: Pillar.Sport,
	},
] as const satisfies readonly ArticleFormat[];

/**
 * Derives the background colour for a story based on the colour scheme set by
 * the `splitTheme` decorator and the parameters passed to the story. If
 * background colours are set via the `colourSchemeBackground` parameter, these
 * are used, otherwise defaults from {@linkcode sourcePalette} are used.
 *
 * @param colourScheme Light or dark mode.
 * @param context A story's context, containing the story parameters.
 * @returns A CSS `color` value.
 */
const backgroundColour = (
	colourScheme: ColourScheme,
	context: Context,
): string =>
	colourScheme === 'light'
		? context.parameters.colourSchemeBackground?.light ??
		  sourcePalette.neutral[100]
		: context.parameters.colourSchemeBackground?.dark ??
		  sourcePalette.neutral[0];

/**
 * Derives the text colour for a story based on the colour scheme set by the
 * `splitTheme` decorator and the parameters passed to the story. If text
 * colours are set via the `colourSchemeTextColour` parameter, these are used,
 * otherwise defaults from {@linkcode sourcePalette} are used.
 *
 * @param colourScheme Light or dark mode.
 * @param context A story's context, containing the story parameters.
 * @returns A CSS `color` value.
 */
const textColour = (colourScheme: ColourScheme, context: Context): string =>
	colourScheme === 'light'
		? context.parameters.colourSchemeTextColour?.light ??
		  sourcePalette.neutral[0]
		: context.parameters.colourSchemeTextColour?.dark ??
		  sourcePalette.neutral[100];

/**
 * Describes the theme being used to render the Story, 'light' or 'dark'.
 */
const ThemeHeading = ({ colourScheme }: { colourScheme: ColourScheme }) => (
	<h2
		css={[
			textSansBold20,
			{
				textAlign: 'center',
				padding: space[2],
				color:
					colourScheme === 'light'
						? sourcePalette.neutral[0]
						: sourcePalette.neutral[100],
				backgroundColor:
					colourScheme === 'light'
						? sourcePalette.neutral[100]
						: sourcePalette.neutral[0],
			},
		]}
	>
		{colourScheme === 'light' ? 'Light Theme ☀️' : 'Dark Theme 🌙'}
	</h2>
);

type FormatHeadingProps = {
	colourScheme: ColourScheme;
	format: ArticleFormat;
};

/**
 * Describes the {@linkcode ArticleFormat} being used to render the story.
 */
const FormatHeading = ({ format, colourScheme }: FormatHeadingProps) => (
	<h3
		css={[
			textSans17,
			{
				textAlign: 'center',
				padding: space[1],
				color:
					colourScheme === 'light'
						? sourcePalette.neutral[0]
						: sourcePalette.neutral[100],
				backgroundColor:
					colourScheme === 'light'
						? sourcePalette.neutral[100]
						: sourcePalette.neutral[0],
			},
		]}
	>
		{[
			`Display: ${ArticleDisplay[format.display]}`,
			`Design: ${ArticleDesign[format.design]}`,
			`Theme: ${Pillar[format.theme] || ArticleSpecial[format.theme]}`,
		]
			.map((line) => line.replaceAll(' ', ' ')) // non-breaking spaces
			.join(', ')}
	</h3>
);

type PaletteProps = {
	format: ArticleFormat;
	colourScheme: ColourScheme;
	context: Context;
	children: ReactNode;
};

/**
 * Generates the palette colours using the given {@linkcode ArticleFormat} and
 * {@linkcode ColourScheme} and makes them available to the Story. Also sets
 * default background and text colours supplied via the `colourSchemeBackground`
 * and `colourSchemeTextColour` parameters from the story, or provides defaults
 * when these are not supplied.
 *
 * For more information on how the palette works see
 * {@linkcode paletteDeclarations}.
 */
const Palette = ({ format, colourScheme, context, children }: PaletteProps) => (
	<div
		data-color-scheme={colourScheme}
		css={css(paletteDeclarations(format, colourScheme))}
		style={{
			backgroundColor: backgroundColour(colourScheme, context),
			color: textColour(colourScheme, context),
		}}
	>
		{children}
	</div>
);

type ThemeProps = {
	formats: ArticleFormat[];
	Story: Parameters<Decorator>[0];
	context: Context;
	colourScheme: ColourScheme;
};

/**
 * Renders a story one or more times, based on the list of
 * {@linkcode ArticleFormat}s passed, and in a particular
 * {@linkcode ColourScheme}.
 *
 * For example, if a single format is passed and the colour scheme is 'light',
 * it will render the story once in light mode. If three formats are passed and
 * the colours scheme is 'dark', it will render the story three times, once for
 * each format, and all three will be in dark mode.
 */
const Theme = ({ formats, Story, context, colourScheme }: ThemeProps) => (
	<div>
		<ThemeHeading colourScheme={colourScheme} />
		{formats.map((format) => (
			<>
				<FormatHeading format={format} colourScheme={colourScheme} />
				<Palette
					colourScheme={colourScheme}
					context={context}
					format={format}
				>
					<Story
						args={{
							...context.args,
							format,
						}}
					/>
				</Palette>
			</>
		))}
	</div>
);

/**
 * Creates a Storybook decorator used to render a story in both light and dark
 * mode simultaneously; either vertically, light above dark, or horizontally,
 * light on the left and dark on the right.
 *
 * If multiple {@linkcode ArticleFormat}s are passed, it will render the story
 * in both light and dark mode for each of these. For example, if three formats
 * are passed then it will render the story six times, three times in light
 * mode, once for each format, and three times in dark mode, once for each
 * format.
 *
 * The returned "splitTheme" decorator was historically used directly in story
 * files. This approach is now deprecated in favour of the "global colour
 * scheme" decorator and toolbar item, which use the "splitTheme" decorator in
 * turn. The "global colour scheme" can be set in Storybook via the toolbar, and
 * in Chromatic via "modes".
 *
 * @param formats A list of formats to render the story in. If none are passed
 * then the {@linkcode defaultFormats} are used.
 * @param orientation Whether to render light and dark mode side-by-side
 * vertically or horizontally. The default is `horizontal`.
 * @returns A decorator that can be used with Storybook.
 */
export const splitTheme =
	(
		formats: ArticleFormat[] = [...defaultFormats],
		{ orientation = 'horizontal' }: Orientation = {},
	): Decorator =>
	(Story, context) => (
		<div
			css={{
				display: 'grid',
				maxWidth: '100%',
				gridTemplateColumns:
					orientation === 'horizontal' ? '1fr 1fr' : '1fr',
			}}
		>
			<Theme
				colourScheme="light"
				formats={formats}
				Story={Story}
				context={context}
			/>
			<Theme
				colourScheme="dark"
				formats={formats}
				Story={Story}
				context={context}
			/>
		</div>
	);

export type StoryProps = { format: ArticleFormat };
