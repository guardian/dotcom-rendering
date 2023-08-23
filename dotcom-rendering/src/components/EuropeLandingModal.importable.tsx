import { Button } from '@guardian/source-react-components';
import { css } from '@emotion/react';
import { headline, body, space, palette } from '@guardian/source-foundations';

// todo change z index
const dialogStyles = css`
	top: 0;
	position: fixed;
	border: none;
	width: 100vw;
	height: 100vh;
	z-index: 1000;
	background: rgba(0, 0, 0, 0.45);
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${palette.brand[300]};
`;
const styles = css`
	width: 400px;
	background: white;
	padding: ${space[4]}px;
`;

const headlineStyles = css`
	${headline.medium()};
`;
const bodyStyles = css`
	${body.medium()};
	margin-top: ${space[3]}px;
`;
export const EuropeLandingModal = () => {
	return (
		<dialog css={dialogStyles} open={true}>
			<div css={styles}>
				<h1 css={headlineStyles}>
					We've switched you to the new Europe edition of the Guardian
				</h1>
				<p css={bodyStyles}>
					You're now getting more coverage tailored for readers in
					Europe
				</p>
				<Button> OK, Thanks </Button>{' '}
				<Button priority={'subdued'}> Switch Edition </Button>
			</div>
		</dialog>
	);
};
