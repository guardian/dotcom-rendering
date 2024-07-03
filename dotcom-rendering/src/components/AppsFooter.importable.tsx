import { css } from '@emotion/react';
import { remSpace, textSans15 } from '@guardian/source/foundations';
import { ButtonLink } from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import { getNavigationClient, getUserClient } from '../lib/bridgetApi';
import { palette } from '../palette';

const year = new Date().getFullYear();

const footerStyles = css`
	${textSans15}
	padding: ${remSpace[4]} ${remSpace[3]};
	background-color: ${palette('--apps-footer-background')};
`;

const linkStyles = css`
	${textSans15};
	color: ${palette('--apps-footer-links-text')};

	:active,
	:hover {
		color: ${palette('--apps-footer-links-text-hover')};
	}
`;

type PrivacySettingsProps = {
	isCcpa: boolean;
	privacyPolicyClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
	privacySettingsClickHandler: (
		e: React.MouseEvent<HTMLButtonElement>,
	) => void;
};
const PrivacySettings = ({
	isCcpa,
	privacyPolicyClickHandler,
	privacySettingsClickHandler,
}: PrivacySettingsProps) => {
	if (isCcpa) {
		return (
			<>
				<ButtonLink
					priority="secondary"
					onClick={privacyPolicyClickHandler}
					css={linkStyles}
				>
					California Residents - Do Not Sell
				</ButtonLink>
				&nbsp;&#183;&nbsp;
			</>
		);
	} else {
		return (
			<>
				<ButtonLink
					priority="secondary"
					onClick={privacySettingsClickHandler}
					css={linkStyles}
				>
					Privacy Settings
				</ButtonLink>
				&nbsp;&#183;&nbsp;
			</>
		);
	}
};

export const AppsFooter = () => {
	const [isCcpa, setIsCcpa] = useState<boolean>(false);

	useEffect(() => {
		void getUserClient()
			.doesCcpaApply()
			.then(setIsCcpa)
			.catch(() => undefined);
	}, []);

	const privacyPolicyClickHandler = (
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		e.preventDefault();
		void getNavigationClient()
			.openPrivacyPolicy()
			.catch(() => undefined);
	};
	const privacySettingsClickHandler = (
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		e.preventDefault();
		void getNavigationClient()
			.openPrivacySettings()
			.catch(() => undefined);
	};

	return (
		<div css={footerStyles}>
			&#169; {year} Guardian News and Media Limited or its affiliated
			companies. All rights reserved. (dcar)
			<br />
			<PrivacySettings
				isCcpa={isCcpa}
				privacyPolicyClickHandler={privacyPolicyClickHandler}
				privacySettingsClickHandler={privacySettingsClickHandler}
			/>
			<ButtonLink
				priority="secondary"
				onClick={privacyPolicyClickHandler}
				css={linkStyles}
			>
				Privacy Policy
			</ButtonLink>
		</div>
	);
};
