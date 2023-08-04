import { css } from '@emotion/react';
import { text } from '@guardian/source-foundations';
import { Eight } from './numbers/Eight.tsx';
import { Five } from './numbers/Five.tsx';
import { Four } from './numbers/Four.tsx';
import { Nine } from './numbers/Nine.tsx';
import { One } from './numbers/One.tsx';
import { Seven } from './numbers/Seven.tsx';
import { Six } from './numbers/Six.tsx';
import { Ten } from './numbers/Ten.tsx';
import { Three } from './numbers/Three.tsx';
import { Two } from './numbers/Two.tsx';
import { Zero } from './numbers/Zero.tsx';

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
