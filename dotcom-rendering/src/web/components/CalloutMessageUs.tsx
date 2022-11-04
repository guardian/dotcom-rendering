import { css } from '@emotion/react';

export const CalloutMessageUs = () => {
	const styles = css`
		background-color: red;
		display: inline-block;
		width: 200px;
		height: 200px;
	`;

	return <div css={styles}>Message us</div>;
};
