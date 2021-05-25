import { css } from '@emotion/react';

import { Design } from '@guardian/types';
import { border, neutral, text } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';
import { BigNumber } from '@root/src/web/components/BigNumber/BigNumber';
import { AgeWarning } from '@root/src/web/components/AgeWarning';

import { LinkHeadline } from '@root/src/web/components/LinkHeadline';

const gridItem = (position: number) => css`
	position: relative;

	${until.leftCol} {
		/* Below leftCol always set top border */
		border-top: 1px solid ${border.secondary};
	}
	/* Above leftCol, don't apply a top border on the 1st and 6th
       items to prevent double borders */
	border-top: ${position !== 1 &&
	position !== 6 &&
	`1px solid ${border.secondary}`};

	/* The left border is set on the container */
	border-right: 1px solid ${border.secondary};
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

const headlineHeader = css`
	padding: 0.1875rem 0.625rem 1.125rem 4.6875rem;
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
};

export const MostViewedFooterItem = ({ trail, position }: Props) => (
	<li css={gridItem(position)} data-link-name={`${position} | text`}>
		<a css={headlineLink} href={trail.url} data-link-name="article">
			<span css={bigNumber}>
				<BigNumber index={position} />
			</span>
			<div css={headlineHeader}>
				{trail.format.design === Design.LiveBlog ? (
					<LinkHeadline
						headlineText={trail.headline}
						palette={trail.palette}
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
						palette={trail.palette}
						format={trail.format}
						size="small"
						showQuotes={
							trail.format.design === Design.Comment ||
							trail.format.design === Design.Letter
						}
					/>
				)}
			</div>
			{trail.ageWarning && (
				<div css={ageWarningStyles}>
					<AgeWarning age={trail.ageWarning} size="small" />
				</div>
			)}
		</a>
	</li>
);
