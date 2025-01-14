import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	space,
	textSans15,
	textSansBold14,
	textSansBold15,
} from '@guardian/source/foundations';
import { palette } from '../palette';
import type { PodcastSeriesImage } from '../types/tag';
import { CardPicture } from './CardPicture';
import { Island } from './Island';
import { PulsingDot } from './PulsingDot.importable';

type Props = {
	text: string;
	color: string;
	showPulsingDot?: boolean;
	/** Inline kickers inherit the font styles (in terms of sizing) of the parent */
	isInline?: boolean;
	/** Controls the weight of the standard, non-live kicker. Defaults to regular */
	fontWeight?: 'regular' | 'bold';
	image?: PodcastSeriesImage;
};

const standardTextStyles = css`
	${textSans15}
	/** We override the line height of the standard kicker
	and add additional padding below the text, to align the text to
	the top and match the overall height of the live kicker */
	line-height: 1;
	padding-bottom: 0.2em;
`;

const boldTextOverrideStyles = css`
	${textSansBold15}
`;

const liveTextStyles = css`
	${textSansBold14}
	display: flex;
	flex-direction: row;
	align-items: baseline;
	width: fit-content;
	padding: 0 ${space[1]}px;
`;

const inlineKickerStyles = css`
	display: inline-block;
	margin-right: ${space[1]}px;
	/** Unset the padding-bottom from standard kicker */
	padding-bottom: 0;
	/** Deliberately inherit the font size and line height from the parent when inline */
	font-size: inherit;
	line-height: inherit;
`;

const imageStyles = css`
	height: 88px;
	width: 88px;
	margin-bottom: ${space[2]}px;
`;

/**
 * The kicker is a prefix to be used with a headline (e.g. 'Live')
 *
 * Kickers should have a line height of 18px.
 */
export const Kicker = ({
	text,
	color,
	showPulsingDot,
	isInline,
	fontWeight = 'regular',
	image,
}: Props) => {
	/**
	 * @todo
	 * Future optimisation is to not have color as a prop, but to infer this through format and CSS vars.
	 * This would also allow showPulsingDot to be inferred from the format (is LiveBlog)
	 */
	const isLiveKicker = !!showPulsingDot;

	return (
		<div
			css={[
				isLiveKicker
					? liveTextStyles
					: [
							standardTextStyles,
							fontWeight === 'bold' && boldTextOverrideStyles,
					  ],
				isInline && inlineKickerStyles,
			]}
			style={{
				color: isLiveKicker ? palette('--kicker-text-live') : color,
				backgroundColor: isLiveKicker
					? palette('--kicker-background-live')
					: 'transparent',
			}}
		>
			{!isUndefined(image?.src) && (
				<div css={imageStyles}>
					<CardPicture
						mainImage={image.src}
						imageSize={'small'}
						alt={image.altText}
						loading={'lazy'}
						aspectRatio={'1:1'}
					/>
				</div>
			)}
			{showPulsingDot && (
				<Island priority="enhancement" defer={{ until: 'visible' }}>
					<PulsingDot colour={palette('--kicker-pulsing-dot-live')} />
				</Island>
			)}

			{text}
		</div>
	);
};
