import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import {
	headline,
	palette as sourcePalette,
	until,
} from '@guardian/source-foundations';
import { palette } from '../palette';
import { AgeWarning } from './AgeWarning';
import { BigNumber } from './BigNumber';
import { FormatBoundary } from './FormatBoundary';
import { LinkHeadline } from './LinkHeadline';

const gridItem = (position: number, hasPageSkin: boolean) => {
	const borderTop = hasPageSkin
		? css`
				border-top: 1px solid ${sourcePalette.neutral[86]};
		  `
		: css`
				/* Below leftCol always set top border */
				${until.leftCol} {
					border-top: 1px solid ${sourcePalette.neutral[86]};
				}
		  `;
	return css`
		position: relative;

		${borderTop}

		/* Above leftCol, don't apply a top border on the 1st and 6th
		items to prevent double borders */
		border-top: ${position !== 1 &&
		position !== 6 &&
		`1px solid ${sourcePalette.neutral[86]}`};

		/* The left border is set on the container */
		border-right: 1px solid ${sourcePalette.neutral[86]};
		min-height: 52px;

		&:hover {
			cursor: pointer;
		}

		&:hover,
		:focus {
			background: ${palette('--most-viewed-footer-hover')};
		}
	`;
};

const bigNumber = css`
	position: absolute;
	top: 0.375rem;
	left: 0.625rem;
	fill: ${palette('--article-text')};
	svg {
		height: 2.5rem;
	}
`;

const headlineHeader = css`
	padding: 0.1875rem 0.625rem 1.125rem 4.6875rem;
	word-wrap: break-word;
	overflow: hidden;
`;

const headlineLink = css`
	text-decoration: none;
	color: ${palette('--article-text')};
	font-weight: 500;
	${headline.xxxsmall()};

	display: block; /* To ensure focus outline works okay */
`;

const ageWarningStyles = css`
	padding-left: 4.6875rem;
	margin-top: -16px;
	margin-bottom: 16px;
`;

type Props = {
	position: number;
	url: string;
	format: ArticleFormat;
	headlineText: string;
	ageWarning?: string;
	cssOverrides?: SerializedStyles | SerializedStyles[];
	hasPageSkin?: boolean;
};

type MiniImageProps = {
	image: string;
	alt: string;
};

export const MostViewedFooterItem = ({
	position,
	url,
	format,
	headlineText,
	ageWarning,
	cssOverrides,
	hasPageSkin = false,
}: Props) => (
	<li
		css={[gridItem(position, hasPageSkin), cssOverrides]}
		data-link-name={`${position} | text`}
	>
		<a css={headlineLink} href={url} data-link-name="article">
			<span css={bigNumber}>
				<BigNumber index={position} />
			</span>
			<div css={[headlineHeader]}>
				<FormatBoundary format={format}>
					{format.design === ArticleDesign.LiveBlog ? (
						<LinkHeadline
							headlineText={headlineText}
							format={format}
							size="small"
							kickerText="Live"
							hideLineBreak={false}
							showPulsingDot={true}
							showQuotes={false}
						/>
					) : (
						<LinkHeadline
							headlineText={headlineText}
							format={format}
							size="small"
							showQuotes={
								format.design === ArticleDesign.Comment ||
								format.design === ArticleDesign.Letter
							}
						/>
					)}
				</FormatBoundary>
			</div>
			{!!ageWarning && (
				<div css={ageWarningStyles}>
					<AgeWarning age={ageWarning} size="small" />
				</div>
			)}
		</a>
	</li>
);
