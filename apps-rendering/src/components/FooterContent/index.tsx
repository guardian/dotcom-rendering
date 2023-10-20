// ----- Imports ----- //

import type { FC } from 'react';

// ----- Sub-components ----- //

const PrivacySettings: FC<{ isCcpa: boolean }> = ({ isCcpa }) => {
	if (isCcpa) {
		return (
			<>
				<a
					id="js-privacy-settings"
					href="https://www.theguardian.com/help/privacy-policy"
				>
					California Residents - Do Not Sell
				</a>
				&nbsp;&#183;&nbsp;
			</>
		);
	} else {
		return (
			<>
				<a
					id="js-privacy-settings"
					href="https://www.theguardian.com/help/privacy-settings"
				>
					Privacy Settings
				</a>
				&nbsp;&#183;&nbsp;
			</>
		);
	}
};

// ----- Component ----- //

interface Props {
	isCcpa: boolean;
}

const FooterContent: FC<Props> = ({ isCcpa }) => {
	const currentYear = new Date().getFullYear();

	return (
		<div id="js-footer">
			&#169; {currentYear} Guardian News and Media Limited or its
			affiliated companies. All rights reserved. (ar)
			<br />
			<PrivacySettings isCcpa={isCcpa} />
			<a
				id="js-privacy-policy"
				href="https://www.theguardian.com/help/privacy-policy"
			>
				Privacy Policy
			</a>
		</div>
	);
};

// ----- Exports ----- //

export default FooterContent;
