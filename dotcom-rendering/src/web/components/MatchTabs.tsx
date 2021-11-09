import { css } from '@emotion/react';
import { border } from '@guardian/src-foundations/palette';
import { space, palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';

type Props = {
	minByMinUrl?: string;
	matchUrl?: string;
};

const thinGreySolid = `1px solid ${border.secondary}`;

const GreyBorder = () => (
	<div
		css={css`
			/* stylelint-disable-next-line color-no-hex */
			border-left: ${thinGreySolid};
			margin-left: ${space[1]}px;
			width: ${space[2]}px;
		`}
	/>
);

const tabsContainer = css`
	display: flex;
	position: relative;
	border-bottom: ${thinGreySolid};
`;

const tab = css`
	flex-basis: 50%;
	height: 40px;
	border-top: 3px solid ${border.secondary};

	:nth-child(1) {
		border-top: 3px solid ${palette.sport[300]};
	}
`;

const tabLink = css`
	color: ${palette.sport[300]};
	display: block;
	text-decoration: none;
	&:hover {
		background-color: ${palette.neutral[93]};
	}
`;

const tabLabel = css`
	${headline.xxxsmall()};
	background: transparent;
	padding: 6px 8px 0;
	text-align: left;
	font-weight: 600;
	min-height: 36px;
	display: block;
	width: 100%;
`;

export const MatchTabs = ({ minByMinUrl, matchUrl }: Props) => (
	<div>
		<ul css={tabsContainer}>
			<li css={tab}>
				<a href={matchUrl} data-link-name="report" css={tabLink}>
					<span css={tabLabel}>Report</span>
				</a>
			</li>
			<GreyBorder />
			<li css={tab}>
				<a href={minByMinUrl} data-link-name="Min-by-min" css={tabLink}>
					<span css={tabLabel}>Min-by-min</span>
				</a>
			</li>
		</ul>
	</div>
);
