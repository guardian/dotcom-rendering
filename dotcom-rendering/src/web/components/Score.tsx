import { css } from '@emotion/react';

import { text } from '@guardian/source-foundations';

import { Zero } from './numbers/Zero';
import { One } from './numbers/One';
import { Two } from './numbers/Two';
import { Three } from './numbers/Three';
import { Four } from './numbers/Four';
import { Five } from './numbers/Five';
import { Six } from './numbers/Six';
import { Seven } from './numbers/Seven';
import { Eight } from './numbers/Eight';
import { Nine } from './numbers/Nine';
import { Ten } from './numbers/Ten';

type Props = {
	score: number;
};

export const Score = ({ score }: Props) => {
	const ScoreStyles = ({ children }: { children: React.ReactNode }) => (
		<div
			css={css`
				position: relative;
				width: 3.75rem;
				height: 3.75rem;
				border-radius: 1.875rem;
				border: 0.0625rem solid ${text.primary};

				svg {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
				}
			`}
		>
			{children}
		</div>
	);

	switch (score) {
		case 0:
			return (
				<ScoreStyles>
					<Zero />
				</ScoreStyles>
			);
		case 1:
			return (
				<ScoreStyles>
					<One />
				</ScoreStyles>
			);
		case 2:
			return (
				<ScoreStyles>
					<Two />
				</ScoreStyles>
			);
		case 3:
			return (
				<ScoreStyles>
					<Three />
				</ScoreStyles>
			);
		case 4:
			return (
				<ScoreStyles>
					<Four />
				</ScoreStyles>
			);
		case 5:
			return (
				<ScoreStyles>
					<Five />
				</ScoreStyles>
			);
		case 6:
			return (
				<ScoreStyles>
					<Six />
				</ScoreStyles>
			);
		case 7:
			return (
				<ScoreStyles>
					<Seven />
				</ScoreStyles>
			);
		case 8:
			return (
				<ScoreStyles>
					<Eight />
				</ScoreStyles>
			);
		case 9:
			return (
				<ScoreStyles>
					<Nine />
				</ScoreStyles>
			);
		case 10:
		default:
			return (
				<ScoreStyles>
					<Ten />
				</ScoreStyles>
			);
	}
};
