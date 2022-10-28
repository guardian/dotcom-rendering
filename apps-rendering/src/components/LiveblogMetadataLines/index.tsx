import { css } from '@emotion/react';
import { from, neutral, until } from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

const linesStyles = css`
	display: none;
	${until.desktop} {
		display: block;
	}
`;

const linesDesktopStyles = css`
	display: none;
	${from.desktop} {
		display: block;
	}
	${darkModeCss`${from.desktop} {display: none;}`}
`;

const linesDarkStyles = css`
	display: none;
	${darkModeCss`${from.desktop} {display: block;}`}
`;

type Props = {
	isLive: boolean;
};

const LiveblogMetadataLines: FC<Props> = ({ isLive }) => (
	<>
		<StraightLines
			color={
				isLive ? 'rgba(255, 255, 255, 0.4)' : 'rgba(153, 153, 153, 0.4)'
			}
			cssOverrides={linesStyles}
		/>
		<StraightLines color={neutral[86]} cssOverrides={linesDesktopStyles} />
		<StraightLines
			color={isLive ? neutral[20] : 'rgba(237, 237, 237, 0.4)'}
			cssOverrides={linesDarkStyles}
		/>
	</>
);

export default LiveblogMetadataLines;
