import { css } from '@emotion/react';
import { adSizes, constants } from '@guardian/commercial';
import { from, space, textSans12, until } from '@guardian/source/foundations';
import { palette } from '../palette';

const labelHeight = constants.AD_LABEL_HEIGHT;

const labelBoxStyles = css`
	${textSans12};
	height: ${labelHeight}px;
	max-height: ${labelHeight}px;
	background-color: ${palette('--ad-background')};
	padding-top: 3px;
	border-top: 1px solid ${palette('--ad-border')};
	color: ${palette('--ad-labels-text')};
	text-align: center;
	box-sizing: border-box;
`;

const labelStyles = css`
	.ad-slot[data-label-show='true']::before {
		content: attr(ad-label-text);
		display: block;
		${labelBoxStyles}
	}

	.ad-slot__adtest-cookie-clear-link {
		${textSans12};
		text-align: left;
		position: absolute;
		left: 268px;
		top: 1px;
		z-index: 10;
		padding: 0;
		border: 0;
	}
`;

const adSlotContainerStyles = css`
	.ad-slot-container {
		max-width: 100vw;
		position: relative;
	}
`;

const adSlotStyles = css`
	.ad-slot {
		/* this is centring the ad iframe as they are display: inline; elements by default */
		text-align: center;

		/*
			Ensure that the ad slot is centred,
			the element with this class name is inserted by GAM into the ad slot
		*/
		.ad-slot__content {
			margin-left: auto;
			margin-right: auto;
		}

		@media print {
			/* stylelint-disable-next-line declaration-no-important */
			display: none !important;
		}

		&.ad-slot--collapse {
			display: none;
		}

		/**
		* Usage according to DAP (Digital Ad Production)
		*
		* #### Desktop
		* - 'fabric' > 'top-above-nav','merchandising-high','merchandising'
		* - 'fabric-custom' > 'top-above-nav','merchandising-high','merchandising'
		* - 'fabric-expandable' > 'merchandising-high'
		* - 'fabric-third-party' > 'top-above-nav','merchandising-high','merchandising'
		* - 'fabric-video' > 'top-above-nav','merchandising-high'
		* - 'fabric-video-expandable' > 'merchandising-high'
		*
		* #### Mobile
		* - 'interscroller' > 'top-above-nav'
		* - 'mobile-revealer' > 'top-above-nav'
		*/
		&.ad-slot--fluid {
			min-height: 250px;
			padding: 0;
			margin: 0;
			overflow: visible;
			width: 100%;
		}
	}
`;

const spacefinderAdSlotContainerStyles = css`
	.ad-slot-container {
		margin: 12px auto;
		text-align: center;
		display: flex;
		justify-content: center;

		${from.tablet} {
			background-color: ${palette('--ad-background')};
		}

		/* Prevent merger with any nearby float left elements e.g. rich-links */
		${until.desktop} {
			clear: left;
		}

		.ad-slot--interscroller {
			/* this fixes inter-scrollers stealing mouse events */
			overflow: hidden;
			position: relative;

			/* position the iframe absolutely (relative to the slot) so that it is in the correct position to detect viewability */
			.ad-slot__content {
				position: absolute;
				height: 100%;
				left: 0;
				top: 0;
				right: 0;

				/* must be behind as the actual ad is on top of the iframe */
				z-index: -1;
			}

			/* Hide default label, interscrollers have a special label */
			&::before {
				display: none;
			}
		}
	}

	/*
		To push inline2+ on desktop to the right column
	*/
	.ad-slot-container--offset-right {
		${from.desktop} {
			float: right;
			max-width: 300px;
			margin-right: -330px;
			background-color: transparent;
		}

		${from.leftCol} {
			margin-right: -310px;
		}

		${from.wide} {
			margin-right: -400px;
		}
	}
`;

const spacefinderAdSlotStyles = css`
	${from.tablet} {
		.ad-slot {
			/* from tablet the ad slot will stretch to the full width of the container and the iframe will be centred by the text-align: center; on the container */
			flex: 1;
			/* Ensures slots do not take on 100% of the container height, allowing them to be sticky in containers */
			align-self: flex-start;
		}
	}

	/* Give ad slots inserted on the client side a placeholder height.
    Let the ad slot take control of its height once rendered. */
	.ad-slot--inline {
		min-height: ${adSizes.mpu.height + constants.AD_LABEL_HEIGHT}px;
	}

	/* Give inline1 ad slot a different placeholder height comparing to subsequent-inlines to reduce CLS.
   Let the ad slot take control of its height once rendered.
   IMPORTANT NOTE: We currently do not serve OPT-OUT for inline1 but we will need to change this value before we do. */
	.ad-slot--inline1:not(.ad-slot--rendered) {
		${from.desktop} {
			min-height: ${adSizes.outstreamDesktop.height +
			constants.AD_LABEL_HEIGHT}px;
		}
	}

	/* This refers to the inline top-above-nav slot used on mobile pages, NOT the
   top-above-nav that is inserted above the navigation. */
	.ad-slot--top-above-nav:not(.ad-slot--rendered) {
		${until.tablet} {
			min-height: ${adSizes.mpu.height + constants.AD_LABEL_HEIGHT}px;
		}
	}

	.ad-slot--carrot {
		float: left;
		clear: both;
		width: 140px;
		margin-right: 20px;
		margin-bottom: ${space[1]}px;
		${from.leftCol} {
			position: relative;
			margin-left: -160px;
			width: 140px;
		}
		${from.wide} {
			margin-left: -240px;
			width: 220px;
		}
	}

	/* Scroll for more label on interscrollers */
	.ad-slot__scroll {
		position: fixed;
		bottom: 0;
		width: 100%;

		${labelBoxStyles}

		&.visible {
			visibility: initial;
		}
		&.hidden {
			visibility: hidden;
		}
	}

	.ad-slot--interscroller[data-label-show='true']::before {
		content: 'Advertisement';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		border: 0;
		display: block;
		${labelBoxStyles}
	}
`;

/*
	Styles applied to all ads regardless of their position, or method of insertion,
	These are applied as part of `rootStyles`
 */
const rootAdStyles = [labelStyles, adSlotStyles, adSlotContainerStyles];

/*
	Styles applied only to ads within an article inserted by spacefinder
	applied to the ArticleRenderer component which spacefinder is scoped
	to via the `.article-body-commercial-selector` class
*/
const spacefinderAdStyles = [
	spacefinderAdSlotContainerStyles,
	spacefinderAdSlotStyles,
];

export {
	labelHeight,
	labelBoxStyles,
	labelStyles,
	rootAdStyles,
	spacefinderAdStyles,
};
