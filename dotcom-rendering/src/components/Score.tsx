import { css } from '@emotion/react';
import { palette } from '../palette';
import { Eight } from './numbers/Eight';
import { Five } from './numbers/Five';
import { Four } from './numbers/Four';
import { Nine } from './numbers/Nine';
import { One } from './numbers/One';
import { Seven } from './numbers/Seven';
import { Six } from './numbers/Six';
import { Ten } from './numbers/Ten';
import { Three } from './numbers/Three';
import { Two } from './numbers/Two';
import { Zero } from './numbers/Zero';

const ScoreStyles = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			position: relative;
			width: 3.75rem;
			height: 3.75rem;
			border-radius: 1.875rem;
			border: 0.0625rem solid ${palette('--football-score-border')};
			display: flex;
			align-items: center;
			justify-content: center;
		`}
	>
		{children}
	</div>
);

type Props = {
	score: number;
};

const ScoreNumber = ({ score }: Props) => {
	if (Number.isNaN(score)) {
		return null;
	}

	switch (score) {
		case 0:
			return <Zero />;
		case 1:
			return <One />;
		case 2:
			return <Two />;
		case 3:
			return <Three />;
		case 4:
			return <Four />;
		case 5:
			return <Five />;
		case 6:
			return <Six />;
		case 7:
			return <Seven />;
		case 8:
			return <Eight />;
		case 9:
			return <Nine />;
		case 10:
			return <Ten />;
		default:
			return (
				<>
					<ScoreNumber score={Number(score.toString()[0])} />
					<ScoreNumber score={Number(score.toString().slice(1))} />
				</>
			);
	}
};

export const Score = ({ score }: Props) => {
	return (
		<ScoreStyles>
			<ScoreNumber score={score} />
		</ScoreStyles>
	);
};
