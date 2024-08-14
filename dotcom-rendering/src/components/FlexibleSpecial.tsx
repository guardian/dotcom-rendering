//mobile

import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { DCRFrontCard } from '../types/front';

type Props = { trails: DCRFrontCard[] };

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

export const FlexibleSpecial = ({ trails }: Props) => {
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
						<div>story 1</div>
						<div>story 2</div>
					</li>
				</ul>
			</div>
			<div>
				{trails.map((trail) => {
					return <li key={trail.url}>{trail.headline}</li>;
				})}
			</div>
		</div>
	);
};
