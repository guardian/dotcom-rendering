// ----- Imports ----- //
import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleFormat,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { palette as sourcePalette, space } from '@guardian/source-foundations';
import { Decorator } from '@storybook/react';
import { paletteDeclarations } from '../../src/palette';

interface Orientation {
	orientation?: 'horizontal' | 'vertical';
}

const headerCss = css`
	font-size: 18px;
	width: 100%;
	text-align: center;
	font-weight: bold;
	padding-bottom: ${space[5]}px;
`;

const formatHeaderCss = css`
	h3 {
		font-size: 16px;
		width: 100%;
		padding-bottom: ${space[2]}px;
		padding-top: ${space[5]}px;
	}
`;

const splitCss = () => css`
	padding: ${space[4]}px;
	width: var(--column-width);
`;

const darkStoryCss = () => css`
	background-color: ${sourcePalette.neutral[0]};
	color: ${sourcePalette.neutral[100]};
	float: var(--dark-mode-float);
`;

const lightStoryCss = () => css`
	background-color: ${sourcePalette.neutral[100]};
	color: ${sourcePalette.neutral[0]};
	float: var(--light-mode-float);
`;

const rowCss = css`
	display: flex;
	flex-direction: row;
`;
const columnCss = css`
	display: flex;
	flex-direction: column;
`;

// ----- Decorators ----- //

/**
 * Creates storybook decorator used to render a component twice
 * Once in light mode, once in dark mode
 * Using a split screen
 */
export const splitTheme =
	(
		format: ArticleFormat,
		{ orientation = 'horizontal' }: Orientation = {},
	): Decorator =>
	(Story) =>
		(
			<>
				<div css={[orientation === 'horizontal' ? rowCss : columnCss]}>
					<div
						className="left-lightTheme"
						css={[
							splitCss,
							lightStoryCss,
							css(paletteDeclarations(format, 'light')),
						]}
					>
						<div css={headerCss}>Light Theme ☀️</div>
						<Story />
					</div>
					<div
						className="right-darkTheme"
						css={[
							splitCss,
							darkStoryCss,
							css(paletteDeclarations(format, 'dark')),
						]}
					>
						<div css={headerCss}>Dark Theme 🌙</div>
						<Story />
					</div>
				</div>
			</>
		);

const defaultFormats: ArticleFormat[] = [
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
];

export const splitThemeMultipleFormats =
	(formats: ArticleFormat[] = defaultFormats): Decorator =>
	(Story) =>
		(
			<>
				<div
					css={[headerCss, splitCss(), lightStoryCss()]}
					style={{
						['--column-width' as any]: '50%',
						['--light-mode-float' as any]: 'left',
					}}
				>
					Light Theme ☀️
				</div>
				<div
					css={[headerCss, splitCss(), darkStoryCss()]}
					style={{
						['--column-width' as any]: '50%',
						['--dark-mode-float' as any]: 'right',
					}}
				>
					Dark Theme 🌙
				</div>
				{formats.map((format) => {
					return (
						<>
							<div
								css={[
									css`
										width: 50%;
									`,
									lightStoryCss(),
									css(paletteDeclarations(format, 'light')),
									formatHeaderCss,
								]}
								style={{
									['--light-mode-float' as any]: 'left',
								}}
							>
								<h3>{`Display: ${
									ArticleDisplay[format.display]
								}, Design: ${
									ArticleDesign[format.design]
								}, Theme: ${
									Pillar[format.theme] ||
									ArticleSpecial[format.theme]
								}`}</h3>
								<Story format={format} />
							</div>
							<div
								css={[
									css`
										width: 50%;
									`,
									darkStoryCss(),
									css(paletteDeclarations(format, 'dark')),
									formatHeaderCss,
								]}
								style={{
									['--dark-mode-float' as any]: 'right',
								}}
							>
								<h3>{`Display: ${
									ArticleDisplay[format.display]
								}, Design: ${
									ArticleDesign[format.design]
								}, Theme: ${
									Pillar[format.theme] ||
									ArticleSpecial[format.theme]
								}`}</h3>
								<Story format={format} />
							</div>
						</>
					);
				})}
			</>
		);
