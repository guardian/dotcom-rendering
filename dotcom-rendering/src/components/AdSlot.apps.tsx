import { css } from '@emotion/react';
import {
	remSpace,
	palette as sourcePalette,
	textSans,
	until,
} from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import { forwardRef } from 'react';
import { palette } from '../palette';

// Exported for Storybook use
export interface Props {
	isFirstAdSlot: boolean;
	onClickSupportButton: () => void;
}

const adHeightPx = 258;

const styles = css`
	clear: both;
	margin: ${remSpace[4]} 0;
	color: ${sourcePalette.neutral[20]};
	background: ${palette('--ad-background')};

	${until.phablet} {
		margin: 1em -${remSpace[3]};
	}
`;

const adLabelsStyles = css`
	${textSans.xsmall()}
	color: ${palette('--ad-labels-background')};
	padding: ${remSpace[3]};
	float: left;

	/* We need to account for padding on both sides */
	width: calc(100% - 2 * ${remSpace[3]});

	p {
		margin: 0;
		float: left;
		font-size: 16px;
		font-weight: 400;
		color: ${palette('--ad-labels-text')};
	}
`;

const adSlotStyles = css`
	clear: both;
	padding-bottom: ${adHeightPx}px;
`;

const adSlotSquareStyles = css`
	${adSlotStyles}
	height: 344px;
	width: 320px;
	margin-left: auto;
	margin-right: auto;
	padding-bottom: 0;
`;

const supportBannerStyles = css`
	padding: ${remSpace[2]};
	background-color: ${palette('--support-banner-background')};

	p {
		${textSans.small()};
		color: ${palette('--support-banner-text')};
		font-weight: bold;
		margin-top: 0;
	}

	button {
		margin-top: ${remSpace[2]};
		color: ${palette('--support-banner-button-text')};
		background-color: ${palette('--support-banner-button-background')};
	}
`;

/**
 * Support banner component, used at the bottom of the ad slot
 *
 * @todo Allow this to be used with web ad slots
 * @todo Style for dark mode in apps
 */
const SupportBanner = ({
	onClickSupportButton,
}: Pick<Props, 'onClickSupportButton'>) => (
	<div css={supportBannerStyles}>
		<p>Enjoy the Guardian ad-free</p>
		<Button size="xsmall" priority="primary" onClick={onClickSupportButton}>
			Support the Guardian
		</Button>
	</div>
);

/**
 * AdSlot component for in-article ads **on apps only**
 *
 * Is set up with a forward ref due to the way ads are handled natively.
 * These slots are dynamically inserted into articles using React portals.
 * The ref is important so that we can provide the location of the slot to
 * the native layer, for it to "paint" an advert over the top of it.
 *
 * @todo Style for dark mode
 */
export const AdSlot = forwardRef<HTMLDivElement, Props>(
	({ isFirstAdSlot, onClickSupportButton }, ref) => (
		<aside css={styles}>
			<div css={adLabelsStyles}>
				<p>Advertisement</p>
			</div>
			<div
				css={isFirstAdSlot ? adSlotSquareStyles : adSlotStyles}
				ref={ref}
			></div>
			<SupportBanner onClickSupportButton={onClickSupportButton} />
		</aside>
	),
);
