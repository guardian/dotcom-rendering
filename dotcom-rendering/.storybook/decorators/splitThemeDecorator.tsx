// ----- Imports ----- //
import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleFormat,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import {
	palette as sourcePalette,
	space,
	textSans17,
	textSansBold20,
} from '@guardian/source/foundations';
import { Decorator } from '@storybook/react';
import { storybookPaletteDeclarations as paletteDeclarations } from '../mocks/paletteDeclarations';

interface Orientation {
	orientation?: 'horizontal' | 'vertical';
}

const headerCss = css`
	${textSansBold20};
	text-align: center;
	padding: ${space[2]}px;
`;

const styles = css`
	display: grid;
	max-width: 100%;
`;

const FormatHeading = ({ format }: { format: ArticleFormat }) => (
	<h3
		css={css`
			${textSans17};
			text-align: center;
			padding: ${space[1]}px;
			opacity: 0.75;
		`}
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
// ----- Decorators ----- //

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
 * Creates storybook decorator used to render a component twice
 * Once in light mode, once in dark mode
 * Using a split screen
 */
export const splitTheme =
	(
		formats: ArticleFormat[] = [...defaultFormats],
		{ orientation = 'horizontal' }: Orientation = {},
	): Decorator =>
	(Story, context) => (
		<div
			css={styles}
			style={{
				gridTemplateColumns:
					orientation === 'horizontal' ? '1fr 1fr' : '1fr',
			}}
		>
			<div
				data-color-scheme="light"
				css={[
					css`
						background-color: ${sourcePalette.neutral[100]};
						color: ${sourcePalette.neutral[0]};
					`,
					css(paletteDeclarations(defaultFormats[0], 'light')),
				]}
			>
				<h2 css={headerCss}>Light Theme ☀️</h2>
				{formats.map((format) => (
					<div css={css(paletteDeclarations(format, 'light'))}>
						<FormatHeading format={format} />
						<Story
							args={{
								...context.args,
								format,
								theme: 'light',
							}}
						/>
					</div>
				))}
			</div>
			<div
				data-color-scheme="dark"
				css={[
					css`
						background-color: ${sourcePalette.neutral[0]};
						color: ${sourcePalette.neutral[100]};
					`,
					css(paletteDeclarations(defaultFormats[0], 'dark')),
				]}
			>
				<h2 css={headerCss}>Dark Theme 🌙</h2>
				{formats.map((format) => (
					<div css={css(paletteDeclarations(format, 'dark'))}>
						<FormatHeading format={format} />
						<Story
							args={{
								...context.args,
								format,
								theme: 'dark',
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);

export type StoryProps = { format: ArticleFormat };
