import { LinkButton, Button } from '@guardian/source-react-components';
import { css } from '@emotion/react';

import { useState } from 'react';
import { SignInGateProps } from '../types';
import {
	actionButtons,
	bodyBold,
	bodyText,
	firstParagraphOverlay,
	headingStyles,
	hideElementsCss,
	laterButton,
	registerButton,
	signInGateContainer,
} from './shared';
import { ManageWellbeingPrefs } from '../../ManageWellbeingPrefs.importable';

const container = css`
	display: flex;
	flex-direction: column;
`;

export const WellBeingGateMain = ({
	dismissGate,
	isComment,
	tags = [],
}: SignInGateProps) => {
	const [showWellbeingManage, setShowWellbeingManage] = useState(false);

	return (
		<div css={container}>
			<div css={signInGateContainer} data-cy="sign-in-gate-wellbeing">
				<style>{hideElementsCss}</style>
				<div css={firstParagraphOverlay(!!isComment)} />
				<h1 css={headingStyles}>
					You’ve asked us to hide the content on this page
				</h1>
				<p css={bodyBold}>This article has been restricted.</p>
				<p css={bodyText}>
					We’re committed to keeping our quality reporting open. But
					we understand that you may feel that some articles are too
					sensitive for you. You can choose to return to the homepage,
					or continue to read the article at your discretion.
				</p>
				<div css={actionButtons}>
					<LinkButton
						data-cy="sign-in-gate-main_register"
						data-ignore="global-link-styling"
						css={registerButton}
						priority="primary"
						size="small"
						href="/"
					>
						Return to the homepage
					</LinkButton>
					<Button
						data-cy="sign-in-gate-main_dismiss"
						data-ignore="global-link-styling"
						css={laterButton}
						priority="subdued"
						size="small"
						onClick={() => {
							dismissGate();
						}}
					>
						Show the article
					</Button>
					<Button
						data-cy="sign-in-gate-main_dismiss"
						data-ignore="global-link-styling"
						css={laterButton}
						priority="subdued"
						size="small"
						onClick={() => {
							setShowWellbeingManage(!showWellbeingManage);
						}}
					>
						Toggle preferences
					</Button>
				</div>
			</div>
			{showWellbeingManage && <ManageWellbeingPrefs tags={tags} />}
		</div>
	);
};
