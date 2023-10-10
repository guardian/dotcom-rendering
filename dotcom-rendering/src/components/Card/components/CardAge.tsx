import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { textSans, until } from '@guardian/source-foundations';
import { decidePalette } from '../../../lib/decidePalette';
import ClockIcon from '../../../static/icons/clock.svg';
import type { DCRContainerPalette } from '../../../types/front';
import type { Palette } from '../../../types/palette';
import { Island } from '../../Island';
import { RelativeTime } from '../../RelativeTime.importable';

type Props = {
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	webPublicationDate: string;
	showClock?: boolean;
	isDynamo?: true;
};

const ageStyles = (
	format: ArticleFormat,
	palette: Palette,
	isDynamo?: true,
) => {
	return css`
		${textSans.xxsmall({ lineHeight: 'tight' })};
		margin-top: -4px;
		color: ${isDynamo
			? palette.text.dynamoHeadline
			: palette.text.cardFooter};

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
	isDynamo,
}: Props) => {
	const palette = decidePalette(format, containerPalette);

	return (
		<span css={ageStyles(format, palette, isDynamo)}>
			{showClock && <ClockIcon />}
			<Island priority="enhancement" defer={{ until: 'visible' }}>
				<RelativeTime
					now={Date.now()}
					then={new Date(webPublicationDate).getTime()}
				/>
			</Island>
		</span>
	);
};
