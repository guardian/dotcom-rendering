import { css } from '@emotion/react';
import { ArticleDesign, timeAgo } from '@guardian/libs';
import { textSans, until } from '@guardian/source-foundations';
import { decidePalette } from '../../../lib/decidePalette';
import ClockIcon from '../../../static/icons/clock.svg';
import type { DCRContainerPalette } from '../../../types/front';

type Props = {
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	webPublicationDate: string;
	showClock?: boolean;
	isDynamo?: true;
};

const ageStyles = css`
	${textSans.xxsmall({ lineHeight: 'tight' })};
	margin-top: -4px;

	/* Provide side padding for positioning and also to keep spacing
    between any sibings (like Lines) */
	padding-left: 5px;
	padding-right: 5px;
	${until.tablet} {
		line-height: 1.25;
	}

	svg {
		margin-bottom: -1px;
		height: 11px;
		width: 11px;
		margin-right: 2px;
	}
`;

const regular = css`
	${textSans.xxsmall({
		fontWeight: 'regular',
	})}
`;
const bold = css`
	${textSans.xxsmall({
		fontWeight: 'bold',
	})}
`;

export const CardAge = ({
	format,
	containerPalette,
	webPublicationDate,
	showClock,
	isDynamo,
}: Props) => {
	const displayString = timeAgo(new Date(webPublicationDate).getTime());
	const palette = decidePalette(format, containerPalette);

	if (displayString === false) {
		return null;
	}

	return (
		<span
			style={{
				fill: palette.text.cardFooter,
				color: isDynamo
					? palette.text.dynamoHeadline
					: palette.text.cardFooter,
			}}
			css={ageStyles}
		>
			{showClock && <ClockIcon />}
			<time
				dateTime={webPublicationDate}
				css={
					format.design === ArticleDesign.Gallery ||
					format.design === ArticleDesign.Audio ||
					format.design === ArticleDesign.Video
						? bold
						: regular
				}
				data-relativeformat="med"
			>
				{displayString}
			</time>
		</span>
	);
};
