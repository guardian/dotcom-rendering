import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source/foundations';

type MatchStatProps = {
	heading: string;
	value: string;
	layout?: 'regular' | 'compact';
};

export const CricketMatchStat = ({
	heading,
	value,
	layout,
}: MatchStatProps) => {
	const compactLayout = layout === 'compact';
	return (
		<div>
			<h2>{heading}</h2>
			<span>
				<span
					css={css`
						${visuallyHidden}
					`}
				>
					{heading}
				</span>
				{value}
			</span>
		</div>
	);
};
