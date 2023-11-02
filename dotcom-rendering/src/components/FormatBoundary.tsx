import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { paletteDeclarations } from '../palette';
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
	const { darkModeAvailable = false } = useConfig();

	return (
		<div
			data-format-theme={format.theme}
			data-format-design={format.design}
			data-format-display={format.display}
			css={[
				displayContents,
				paletteDeclarations(format, 'light'),
				darkModeAvailable &&
					css`
						@media (prefers-color-scheme: dark) {
							${paletteDeclarations(format, 'dark')}
						}
					`,
			]}
		>
			{children}
		</div>
	);
};
