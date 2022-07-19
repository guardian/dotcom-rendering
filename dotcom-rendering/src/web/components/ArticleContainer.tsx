import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from, neutral, space, until } from '@guardian/source-foundations';
import { carrotAdStyles, labelStyles } from './AdSlot';

type Props = {
	format: ArticleFormat;
	children: React.ReactNode;
};

const articleWidth = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Interactive: {
			/* These articles use a special template which manages it's own width */
			return null;
		}
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog: {
			return css`
				${from.desktop} {
					width: 700px;
				}
			`;
		}
		default: {
			return css`
				${from.desktop} {
					width: 620px;
				}
			`;
		}
	}
};

const articleWrapper = css`
	${until.leftCol} {
		/* below 1140 */
		padding-left: 0;
	}

	flex-grow: 1;

	/* Due to MainMedia using position: relative, this seems to effect the rendering order
		To mitigate we use z-index
		TODO: find a cleaner solution */
	z-index: 1;
`;

const adStyles = css`
	.ad-slot {
		@media print {
			/* stylelint-disable-next-line declaration-no-important */
			display: none !important;
		}
		&.ad-slot--collapse {
			display: none;
		}
	}
	.ad-slot--mostpop {
		${from.desktop} {
			margin: 0;
			width: auto;
		}
	}
	.ad-slot--fluid {
		width: 100%;
	}

	.ad-slot-container {
		margin: ${space[3]}px auto;
		/* this is centring the ad iframe as they are display: inline; elements by default */
		text-align: center;
		display: flex;
		justify-content: center;

		${from.tablet} {
			background-color: ${neutral[97]};
		}

		/* Prevent merger with any nearby float left elements e.g. rich-links */
		${until.desktop} {
			clear: left;
		}

		.ad-slot {
			/* this fixes inter-scrollers stealing mouse events */
			overflow: hidden;

			${from.tablet} {
				/* from tablet the ad slot will stretch to the full width of the container and the iframe will be centred by the text-align: center; on the container */
				flex: 1;
				/* Ensures slots do not take on 100% of the container height, allowing them to be sticky in containers */
				align-self: flex-start;
			}
		}

		/* liveblogs ads have different background colours due the darker page background */
		.ad-slot--liveblog-inline {
			background-color: ${neutral[93]};
			.ad-slot__label {
				color: ${neutral[46]};
				border-top-color: ${neutral[86]};
			}
		}
	}

	.ad-slot-container--offset-right {
		${from.desktop} {
			float: right;
			max-width: 300px;
			margin-right: -318px;
			background-color: transparent;
		}

		${from.wide} {
			margin-right: -398px;
		}
	}
`;

export const ArticleContainer = ({ children, format }: Props) => {
	return (
		<div
			css={[
				articleWrapper,
				articleWidth(format),
				adStyles,
				carrotAdStyles,
				labelStyles,
			]}
		>
			{children}
		</div>
	);
};
