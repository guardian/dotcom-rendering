// ----- Imports ----- //

import { css } from '@emotion/react';
import { headlineMedium42 } from '@guardian/source-foundations';
import { palette } from '../palette';

// ----- Component ----- //

export const HeadlineExample = ({ text }: { text: string }) => {
	const styles = css`
		color: ${palette('--headline-colour')};
		background-color: ${palette('--headline-background')};
		${headlineMedium42}
	`;
	return <h1 css={styles}>{text}</h1>;
};
