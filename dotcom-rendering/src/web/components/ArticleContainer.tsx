import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from, neutral, space, until } from '@guardian/source-foundations';
import { useAB } from '../lib/useAB';

import { labelStyles, carrotAdStyles } from './AdSlot';

type Props = {
	format: ArticleFormat;
	children: React.ReactNode;
};

type ABVariants = 'ab-test-variant' | 'ab-test-control' | 'ab-test-not-in-test';

const articleWidth = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Interactive: {
			// These articles use a special template which manages it's own width
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

const articleAdStyles = (abVariant: ABVariants) => {
	const sharedCSS = css`
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
		.ad-slot-container {
			max-width: 300px;
		}
		.ad-slot--fluid {
			width: 100%;
		}
		.ad-slot--liveblog-inline {
			margin: 0 auto ${space[3]}px;

			.ad-slot__label {
				color: ${neutral[46]};
				border-top-color: ${neutral[86]};
			}

			&.ad-slot--outstream {
				${from.tablet} {
					width: 620px;
				}
			}

			&:not(.ad-slot--outstream) {
				width: 300px;
				background-color: ${neutral[93]};
				text-align: center;

				${from.tablet} {
					width: 100%;
					padding-bottom: ${space[6]}px;

					& > div:not(.ad-slot__label) {
						width: 300px;
						margin-left: auto;
						margin-right: auto;
					}
				}
			}

			&.ad-slot--fluid {
				background-color: green;
				width: 100%;
			}
		}
	`;
	const controlCSS = css`
		.ad-slot--inline,
		.ad-slot-liveblog--inline {
			width: 300px;
			margin: 12px auto;
			min-width: 160px;
			min-height: 274px;
			text-align: center;

			${from.tablet} {
				margin-right: -100px;
				width: auto;
				float: right;
				margin-top: 4px;
				margin-left: 20px;
			}
			${from.desktop} {
				width: auto;
				float: right;
				margin: 0;
				margin-top: 4px;
				margin-left: 20px;
			}
		}
		.ad-slot--offset-right {
			${from.desktop} {
				float: right;
				width: auto;
				margin-right: -318px;
			}

			${from.wide} {
				margin-right: -398px;
			}
		}
		.ad-slot--outstream {
			${from.tablet} {
				margin-left: 0;
				width: 100%;
				.ad-slot__label {
					margin-left: 35px;
					margin-right: 35px;
				}
			}
		}
	`;
	const variantCSS = css`
		.ad-slot--inline1 {
			margin: 12px auto;
			text-align: center;
			/* Unlike other inlines we don't float right inline1 */
			/* Prevent merger with any nearby float left elements e.g. rich-links */
			${until.tablet} {
				clear: left;
				width: 300px;
			}
			/* Reserve full width with a background colour */
			${from.tablet} {
				background-color: ${neutral[97]};
			}
		}
		.ad-slot--inline:not(.ad-slot--inline1),
		.ad-slot-liveblog--inline:not(.ad-slot--inline1) {
			width: 300px;
			margin: 12px auto;
			min-width: 300px;
			min-height: 274px;
			text-align: center;
			${from.tablet} {
				margin-right: -100px;
				width: auto;
				float: right;
				margin-top: 4px;
				margin-left: 20px;
			}
			${from.desktop} {
				width: auto;
				float: right;
				margin: 0;
				margin-top: 4px;
				margin-left: 20px;
			}
			&.ad-slot--offset-right {
				${from.desktop} {
					float: right;
					width: auto;
					margin-right: -318px;
				}

				${from.wide} {
					margin-right: -398px;
				}
			}
		}
	`;
	if (abVariant === 'ab-test-variant') {
		return [
			sharedCSS,
			variantCSS,
		];
	}
	return [
		sharedCSS,
		controlCSS,
	];
}

export const ArticleContainer = ({ children, format }: Props) => {
	const ABTestAPI = useAB();
	const abTestVariant: ABVariants =
		(ABTestAPI?.isUserInVariant('Inline1ContainerSizing', 'control') &&
			'ab-test-control') ||
		(ABTestAPI?.isUserInVariant('Inline1ContainerSizing', 'variant') &&
			'ab-test-variant') ||
		'ab-test-not-in-test';
	return (
		<div
			css={[
				articleWrapper,
				articleWidth(format),
				articleAdStyles(abTestVariant),
				carrotAdStyles,
				labelStyles,
			]}
		>
			{children}
		</div>
	);
};
