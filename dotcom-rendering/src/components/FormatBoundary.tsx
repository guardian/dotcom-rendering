import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { paletteDeclarations } from '../palette';
import { useConfig } from './ConfigContext';

type Props = {
	format: ArticleFormat;
	children: React.ReactNode;
};

/**
 * Used to create a set of palette colours for a different format
 * to that of the :root element
 */
export const FormatBoundary = ({ format, children }: Props) => {
	const { darkModeAvailable } = useConfig();

	return (
		<div
			data-format-theme={format.theme}
			data-format-design={format.design}
			data-format-display={format.display}
			css={[
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
