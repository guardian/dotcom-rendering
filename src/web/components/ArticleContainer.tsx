import { css } from '@emotion/react';
import { from, until } from '@guardian/src-foundations/mq';

import { labelStyles, carrotAdStyles } from '@root/src/web/components/AdSlot';

const articleContainer = css`
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

const articleAdStyles = css`
	.ad-slot {
		@media print {
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
	.ad-slot--inline {
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
	.ad-slot--fluid {
		width: 100%;
	}
`;

type Props = {
	children: React.ReactNode;
};

export const ArticleContainer = ({ children }: Props) => {
	return (
		<main
			css={[
				articleContainer,
				articleAdStyles,
				carrotAdStyles,
				labelStyles,
			]}
		>
			{children}
		</main>
	);
};
