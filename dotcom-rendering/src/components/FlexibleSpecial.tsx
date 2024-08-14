//mobile

import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { DCRGroupedTrails } from '../types/front';

type Props = { groupedTrails: DCRGroupedTrails };

const grid = css`
	display: grid;

	${from.mobile} {
		grid-template-columns: 1fr;
		grid-template-areas:
			'splash'
			'standard-stories';
	}

	${from.tablet} {
		column-gap: 20px;
		grid-template-columns: repeat(11, 40px);
		grid-template-areas:
			'splash'
			'standard-stories';
	}
`;

//tablet and above

//desktop

export const FlexibleSpecial = ({ groupedTrails }: Props) => {
	const snaps = [...groupedTrails.snap].slice(0, 1);
	const cards = [
		...groupedTrails.snap.slice(1),
		...groupedTrails.standard,
	].slice(0, 5);

	return (
		<div css={grid}>
			<div
				css={css`
					grid-area: splash;
					grid-column: span 12;
					background-color: pink;
					height: 120px;
					border: 1px solid red;
				`}
			>
				This is the splash
			</div>
			<div
				css={css`
					grid-area: standard-stories;
					background-color: lightblue;
					height: 60px;
					border: 1px solid blue;
				`}
			>
				<ul>
					<li>
						<div>{snaps[0]?.headline}</div>
						<div>{cards[0]?.headline}</div>
					</li>
				</ul>
			</div>
		</div>
	);
};
