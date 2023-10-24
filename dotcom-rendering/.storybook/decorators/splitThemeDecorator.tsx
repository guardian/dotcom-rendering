// ----- Imports ----- //
import { css } from '@emotion/react';
import { paletteDeclarations } from '../../src/palette';
import { palette as sourcePalette, space } from '@guardian/source-foundations';
import { Decorator } from '@storybook/react';
import { ArticleFormat } from '@guardian/libs';

const headerCss = css`
	font-size: 18px;
	width: 100%;
	text-align: center;
	font-weight: bold;
	padding-bottom: ${space[5]}px;
`;

const splitCss = css`
	width: 50%;
	padding: ${space[4]}px;
`;

const darkStoryCss = css`
	float: right;
	background-color: ${sourcePalette.neutral[0]};
	color: ${sourcePalette.neutral[100]};
`;
const lightStoryCss = css`
	float: left;
	background-color: ${sourcePalette.neutral[100]};
	color: ${sourcePalette.neutral[0]};
`;

// ----- Decorators ----- //

/**
 * Creates storybook decorator used to render a component twice
 * Once in light mode, once in dark mode
 * Using a split screen
 */
export const splitTheme =
	(format: ArticleFormat): Decorator =>
	(Story) =>
		(
			<>
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
			</>
		);
