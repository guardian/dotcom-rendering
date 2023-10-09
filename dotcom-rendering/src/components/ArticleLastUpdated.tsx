import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { textSans } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import type { Palette } from '../types/palette';
import { Island } from './Island';
import { PulsingDot } from './PulsingDot.importable';
import { RelativeTime } from './RelativeTime.importable';

const lastUpdatedStyles = (palette: Palette) => css`
	${textSans.small()}
	padding-bottom: 0.125rem;
	padding-top: 0.125rem;
	color: ${palette.text.lastUpdated};
`;

const livePulseIconStyles = (palette: Palette) => css`
	${textSans.small({ fontWeight: 'bold' })}
	color: ${palette.text.standfirst};
`;

type Props = {
	format: ArticleFormat;
	lastUpdated: number;
};

export const ArticleLastUpdated = ({ format, lastUpdated }: Props) => {
	const palette = decidePalette(format);

	return (
		<div css={lastUpdatedStyles(palette)}>
			{format.design === ArticleDesign.LiveBlog && (
				<span css={livePulseIconStyles(palette)}>
					<Island priority="enhancement" defer={{ until: 'visible' }}>
						<PulsingDot />
					</Island>
					LIVE
				</span>
			)}
			&nbsp;Updated&nbsp;
			<Island priority="enhancement" defer={{ until: 'visible' }}>
				<RelativeTime epoch={lastUpdated} format="short" />
			</Island>
		</div>
	);
};
