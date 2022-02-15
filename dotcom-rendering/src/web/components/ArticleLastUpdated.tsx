import { ArticleDesign, timeAgo } from '@guardian/libs';
import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import { PulsingDot } from './PulsingDot.importable';
import { Island } from './Island';

const lastUpdatedStyles = (palette: Palette) => css`
	${textSans.xxsmall()}
	padding-bottom: 0.125rem;
	padding-top: 0.125rem;
	color: ${palette.text.standfirst};
`;

const livePulseIconStyles = css`
	${textSans.xxsmall({ fontWeight: 'bold' })}
`;

type Props = {
	format: ArticleFormat;
	lastUpdated: number;
};

export const ArticleLastUpdated = ({ format, lastUpdated }: Props) => {
	const palette = decidePalette(format);
	const displayString = timeAgo(lastUpdated);
	const date = new Date(lastUpdated);

	return (
		<div css={lastUpdatedStyles(palette)}>
			{format.design === ArticleDesign.LiveBlog && (
				<span css={livePulseIconStyles}>
					<Island>
						<PulsingDot />
					</Island>
					LIVE
				</span>
			)}
			&nbsp;Updated&nbsp;
			<time
				dateTime={date.toString()}
				data-relativeformat="med"
				data-gu-marker="liveblog-last-updated"
			>
				{displayString}
			</time>
		</div>
	);
};
