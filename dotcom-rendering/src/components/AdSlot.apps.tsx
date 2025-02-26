import { css } from '@emotion/react';
import { remSpace, textSans14, until } from '@guardian/source/foundations';
import { forwardRef } from 'react';
import { palette } from '../palette';

// Exported for Storybook use
export interface Props {
	isFirstAdSlot: boolean;
}

const adHeightPx = 250;

const styles = css`
	clear: both;
	margin: ${remSpace[4]} 0;
	background: ${palette('--ad-background')};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	${until.phablet} {
		margin: 1em 0px;
	}
`;

const adLabelsStyles = css`
	${textSans14}
	padding: ${remSpace[1]} ${remSpace[3]};
	float: left;
	display: flex;
	justify-content: center;
	color: ${palette('--ad-labels-text')};

	/* We need to account for padding on both sides */
	width: calc(100% - 2 * ${remSpace[3]});
`;

const adSlotStyles = css`
	clear: both;
	padding-bottom: ${adHeightPx}px;
	width: 100%;
`;

const adSlotSquareStyles = css`
	${adSlotStyles}
	${until.phablet} {
		width: 320px;
		margin-left: 10px;
		margin-right: 10px;
	}

	height: 344px;
	width: 300px;
	padding-bottom: 0;
`;

/**
 * AdSlot component for in-article ads **on apps only**
 *
 * Is set up with a forward ref due to the way ads are handled natively.
 * These slots are dynamically inserted into articles using React portals.
 * The ref is important so that we can provide the location of the slot to
 * the native layer, for it to "paint" an advert over the top of it.
 */
export const AdSlot = forwardRef<HTMLDivElement, Props>(
	({ isFirstAdSlot }, ref) => (
		<aside css={styles}>
			<div css={adLabelsStyles}>
				<p>Advertisement</p>
			</div>
			<div
				css={isFirstAdSlot ? adSlotSquareStyles : adSlotStyles}
				ref={ref}
			></div>
		</aside>
	),
);
