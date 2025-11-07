import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	Pillar,
} from '../lib/articleFormat';
import { paletteDeclarations } from '../paletteDeclarations';
import { useConfig } from './ConfigContext';

type Props = {
	format: ArticleFormat;
	children: React.ReactNode;
};

/** @see https://developer.mozilla.org/en-US/docs/Web/CSS/display-box#contents */
const displayContents = css`
	display: contents;
`;

/**
 * Used to create a set of palette colours for a different format
 * to that of the :root element
 */
export const FormatBoundary = ({ format, children }: Props) => {
	const { darkModeAvailable } = useConfig();

	const [isStorybook, setIsStorybook] = useState(false);
	useEffect(() => {
		if (!('STORIES' in window)) return;
		setIsStorybook(true);
	}, []);

	/**
	 * Default fronts format copied from `FrontPage.tsx`.
	 * For use elsewhere (ie. articles) we will need to get the format that has
	 * actually been applied to the page.
	 */
	const defaultFormat = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	};

	return (
		<div
			data-format-theme={format.theme}
			data-format-design={format.design}
			data-format-display={format.display}
			css={[
				displayContents,
				paletteDeclarations(format, 'light', defaultFormat),
				darkModeAvailable &&
					css`
						@media (prefers-color-scheme: dark) {
							${paletteDeclarations(
								format,
								'dark',
								defaultFormat,
							)}
						}
					`,
				isStorybook &&
					css`
						[data-color-scheme='light'] & {
							${paletteDeclarations(format, 'light')}
						}

						[data-color-scheme='dark'] & {
							${paletteDeclarations(format, 'dark')}
						}
					`,
			]}
		>
			{children}
		</div>
	);
};
