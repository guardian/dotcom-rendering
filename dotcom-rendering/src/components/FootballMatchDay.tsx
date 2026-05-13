import { css } from '@emotion/react';
import {
	from,
	headlineMedium14,
	neutral,
	sport,
	textSans12,
	textSans15,
} from '@guardian/source/foundations';
import { SvgChevronRightSingleSmall } from '@guardian/source/react-components';

export const FootballMatchDay = () => (
	<section
		css={css`
			${textSans12}
		`}
	>
		<ul
			css={css`
				list-style: none;
				margin: 0;
				padding: 0;
			`}
		>
			<Match />
		</ul>
		<a
			href="https://www.theguardian.com/football/world-cup-2026/overview"
			css={allFixtures}
		>
			See all fixtures <SvgChevronRightSingleSmall size="xsmall" />
		</a>
	</section>
);

const allFixtures = css`
	${textSans15}
	display: inline-flex;
	align-items: center;
	float: right;
	margin-top: 12px;
	color: inherit;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;

const Match = () => (
	<li css={match}>
		<a href="/" css={wrapper}>
			<span css={status}>20:00 BST</span>
			<span css={team}>
				Canada
				<picture css={crest}>
					<img
						srcSet="https://i.guim.co.uk/img/sport/football/crests/31901.png?width=20&amp;dpr=1&amp;s=none&amp;crop=none, https://i.guim.co.uk/img/sport/football/crests/31901.png?width=20&amp;dpr=2&amp;s=none&amp;crop=none 2x"
						src="https://i.guim.co.uk/img/sport/football/crests/31901.png?width=20&amp;dpr=1&amp;s=none&amp;crop=none"
						alt=""
					/>
				</picture>
			</span>
			<span css={score}>v</span>
			<span css={[team, awayTeam]}>
				<picture css={crest}>
					<img
						srcSet="https://i.guim.co.uk/img/sport/football/crests/7531.png?width=20&amp;dpr=1&amp;s=none&amp;crop=none, https://i.guim.co.uk/img/sport/football/crests/7531.png?width=20&amp;dpr=2&amp;s=none&amp;crop=none 2x"
						src="https://i.guim.co.uk/img/sport/football/crests/7531.png?width=20&amp;dpr=1&amp;s=none&amp;crop=none"
						alt=""
					/>
				</picture>
				Bosnia-Herzegovina
			</span>
			<SvgChevronRightSingleSmall size="xsmall" />
		</a>
	</li>
);

const match = css`
	color: ${neutral[7]};
	background-color: ${sport[800]};
	& + & {
		border-top: 1px dashed ${neutral[86]};
	}
`;

// const matchLive = css`
// 	background-color: ${sport[800]};
// `;

// const matchResult = css`
// 	color: ${neutral[97]};
// 	background-color: ${sport[300]};
// `;

const wrapper = css`
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	grid-template-areas:
		'status  status  status'
		'home    score   away'
		'comment comment comment';
	align-items: center;
	padding: 6px;
	color: inherit;
	text-decoration: none;

	svg {
		grid-area: away;
		justify-self: end;
	}
`;

const status = css`
	grid-area: status;
	display: flex;
	align-items: center;
	gap: 4px;
	${from.phablet} {
		grid-area: home;
	}
`;

const team = css`
	${headlineMedium14}
	grid-area: home;
	justify-self: end;
	display: flex;
	align-items: center;
	gap: 4px;
`;

const awayTeam = css`
	grid-area: away;
	justify-self: start;
	padding-right: 16px;
`;

const crest = css`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	width: 24px;
	height: 24px;
	padding: 2px;
	border-radius: 100%;
	background-color: ${neutral[100]};
`;

const score = css`
	grid-area: score;
	min-width: 36px;
	text-align: center;
	padding: 4px;
`;

// const live = css`
// 	${textSansBold14}
// 	position: relative;
// 	color: ${sport[300]};
// 	&::before {
// 		display: inline-block;
// 		content: '';
// 		width: 11px;
// 		height: 11px;
// 		margin-right: 2px;
// 		border-radius: 100%;
// 		background-color: currentColor;
// 	}
// `;

// const comment = css`
// 	${textSansItalic12}
// 	grid-area: comment;
// 	text-align: center;
// 	color: ${neutral[86]};
// `;
