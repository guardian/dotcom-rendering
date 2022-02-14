import { ArticleDesign, timeAgo } from '@guardian/libs';
import { css } from '@emotion/react';

const lastUpdatedStyles = (palette: Palette) => css`
	font-size: 0.75rem;
	line-height: 1rem;
	font-family: 'Guardian Text Sans Web', 'Helvetica Neue', Helvetica, Arial,
		'Lucida Grande', sans-serif;
	padding-bottom: 0.125rem;
	padding-top: 0.125rem;
	color: ${palette.text.standfirst};
`;

const livePulseIconStyles = (palette: Palette) => css`
	font-weight: bold;

	@keyframes live-pulse {
		0% {
			opacity: 1;
		}
		10% {
			opacity: 0.25;
		}
		40% {
			opacity: 1;
		}
		100% {
			opacity: 1;
		}
	}

	:before {
		border-radius: 62.5rem;
		display: inline-block;
		position: relative;
		background-color: ${palette.text.standfirst};
		width: 0.75em;
		height: 0.75em;
		content: '';
		margin-right: 0.1875rem;
		vertical-align: initial;
		-webkit-animation: live-pulse 1s infinite;
		animation: live-pulse 1s infinite;
	}
`;

type Props = {
	format: ArticleFormat;
	palette: Palette;
	lastUpdated: number;
};

export const ArticleLastUpdated = ({ format, palette, lastUpdated }: Props) => {
	const displayString = timeAgo(lastUpdated);
	const date = new Date(lastUpdated);

	return (
		<div css={lastUpdatedStyles(palette)}>
			{format.design === ArticleDesign.LiveBlog && (
				<span css={livePulseIconStyles(palette)}>LIVE</span>
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
