import { css } from '@emotion/react';

import { textSans, until } from '@guardian/source-foundations';
import { ArticleDesign, timeAgo } from '@guardian/libs';

import { decidePalette } from '../../../lib/decidePalette';
import ClockIcon from '../../../../static/icons/clock.svg';

type Props = {
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	webPublicationDate: string;
	showClock?: boolean;
};

const ageStyles = (format: ArticleFormat, palette: Palette) => {
	return css`
		${textSans.xxsmall()};
		color: ${palette.text.cardFooter};

		/* Provide side padding for positioning and also to keep spacing
    between any sibings (like Lines) */
		padding-left: 5px;
		padding-right: 5px;
		${until.tablet} {
			line-height: 1.25;
		}

		svg {
			fill: ${palette.text.cardFooter};
			margin-bottom: -1px;
			height: 11px;
			width: 11px;
			margin-right: 2px;
		}

		> time {
			${textSans.xxsmall({
				fontWeight:
					format.design === ArticleDesign.Gallery ||
					format.design === ArticleDesign.Audio ||
					format.design === ArticleDesign.Video
						? `bold`
						: `regular`,
			})};
		}
	`;
};

export const CardAge = ({
	format,
	containerPalette,
	webPublicationDate,
	showClock,
}: Props) => {
	const displayString = timeAgo(new Date(webPublicationDate).getTime());
	const palette = decidePalette(format, containerPalette);

	if (!displayString) {
		return null;
	}

	return (
		<span css={ageStyles(format, palette)}>
			<span>
				{showClock && <ClockIcon />}
				<time dateTime={webPublicationDate} data-relativeformat="med">
					{displayString}
				</time>
			</span>
		</span>
	);
};
