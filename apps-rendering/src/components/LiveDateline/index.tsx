// ----- Imports ----- //

import { css, keyframes } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { neutral, pxToRem, textSans12 } from '@guardian/source-foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { makeRelativeDate } from 'date';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const livePulse = keyframes`
    0% {opacity: 1;}
    10% {opacity: .25;}
    40% {opacity: 1;}
    100% {opacity: 1;}
`;

const timestampStyles = (isDeadBlog = false): ReturnType<typeof css> => css`
	color: ${isDeadBlog ? neutral[7] : neutral[100]};
	${textSans12};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	 */
	line-height: 1.15;

	${darkModeCss`
		color: ${isDeadBlog ? neutral[60] : neutral[100]};
	`}
`;

const liveSpanStyles = css`
	font-weight: bold;

	&::before {
		content: '';
		display: inline-block;
		border-radius: 100%;
		background-color: ${neutral[100]};
		width: ${pxToRem(9)}rem;
		height: ${pxToRem(9)}rem;
		margin-right: ${pxToRem(2)}rem;
		animation: ${livePulse} 1s infinite;

		@media (prefers-reduced-motion) {
			animation: none;
		}
	}
`;

interface Props {
	date: Option<Date>;
	format: ArticleFormat;
}

const RelativeDateline: FC<Props> = ({ date, format }) =>
	maybeRender(date, (d) => (
		<time css={timestampStyles(format.design === ArticleDesign.DeadBlog)}>
			{format.design === ArticleDesign.LiveBlog && (
				<span css={liveSpanStyles}>LIVE </span>
			)}
			Updated {makeRelativeDate(d)}
		</time>
	));

// ----- Exports ----- //

export default RelativeDateline;
