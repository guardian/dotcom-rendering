// ----- Imports ----- //

import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import { palette } from '../palette';

// ----- Component ----- //

export const HeadlineExample = ({ text }: { text: string }) => {
	const styles = css`
		color: ${palette('--headline-colour')};
		background-color: ${palette('--headline-background-colour')};
		${headline.large()}
	`;
	return <h1 css={styles}>{text}</h1>;
};
