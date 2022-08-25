import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import {
	border,
	headline,
	neutral,
	text,
	until,
} from '@guardian/source-foundations';
import type { TrailType } from '../../types/trails';
import { AgeWarning } from './AgeWarning';
import { BigNumber } from './BigNumber/BigNumber';
import { LinkHeadline } from './LinkHeadline';

const thinGreySolid = `1px solid ${border.secondary}`;

const gridItem = (position: number, isExpandable: boolean) => css`
	position: relative;

	${until.leftCol} {
		/* Below leftCol always set top border */
		border-top: ${thinGreySolid};
	}
	/* Above leftCol, don't apply a top border on the 1st and 6th
       items to prevent double borders, except when in expandable list, 
	   which only skips first li*/
	border-top: ${position !== 1 && position !== 6 && thinGreySolid};
	border-bottom: ${isExpandable && (position === 10 || position === 5)
		? thinGreySolid
		: 'none'};

	/* The left border is set on the container except when expandable */
	border-left: ${isExpandable ? thinGreySolid : 'none'};
	border-right: ${thinGreySolid};
	min-height: 3.25rem;

	&:hover {
		cursor: pointer;
	}

	&:hover,
	:focus {
		background: ${neutral[97]};
	}
`;

const bigNumber = css`
	position: absolute;
	top: 0.375rem;
	left: 0.625rem;
	fill: ${text.primary};
`;

const headlineHeader = (isExpandable: boolean) => css`
	padding: 0.1875rem 0.625rem ${isExpandable ? `1.75rem` : `1.125rem`}
		4.6875rem;
	word-wrap: break-word;
	overflow: hidden;
`;

const headlineLink = css`
	text-decoration: none;
	color: ${text.anchorSecondary};
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
	trail: TrailType;
	position: number;
	cssOverrides?: SerializedStyles;
	isExpandable?: boolean;
};

export const MostViewedFooterItem = ({
	trail,
	position,
	cssOverrides,
	isExpandable = false,
}: Props) => (
	<li
		css={[gridItem(position, isExpandable), cssOverrides]}
		data-link-name={`${position} | text`}
	>
		<a css={headlineLink} href={trail.url} data-link-name="article">
			<span css={bigNumber}>
				<BigNumber index={position} />
			</span>
			<div css={headlineHeader(isExpandable)}>
				{trail.format.design === ArticleDesign.LiveBlog ? (
					<LinkHeadline
						headlineText={trail.headline}
						format={trail.format}
						size="small"
						kickerText="Live"
						showSlash={true}
						showPulsingDot={true}
						showQuotes={false}
					/>
				) : (
					<LinkHeadline
						headlineText={trail.headline}
						format={trail.format}
						size="small"
						showQuotes={
							trail.format.design === ArticleDesign.Comment ||
							trail.format.design === ArticleDesign.Letter
						}
					/>
				)}
			</div>
			{!!trail.ageWarning && (
				<div css={ageWarningStyles}>
					<AgeWarning age={trail.ageWarning} size="small" />
				</div>
			)}
		</a>
	</li>
);
