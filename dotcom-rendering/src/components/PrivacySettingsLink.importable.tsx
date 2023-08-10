import { css } from '@emotion/react';
import { cmp, onConsent } from '@guardian/consent-management-platform';
import type { Framework } from '@guardian/consent-management-platform/dist/types';
import { palette } from '@guardian/source-foundations';
import { useState } from 'react';
import { useOnce } from '../lib/useOnce';

const footerLink = css`
	color: inherit;
	text-decoration: none;
	padding-bottom: 12px;
	display: block;
	line-height: 19px;

	:hover {
		text-decoration: underline;
		color: ${palette.brandAlt[400]};
	}
`;

type Props = {
	extraClasses?: string;
};

export const PrivacySettingsLink = ({ extraClasses }: Props) => {
	const [framework, setFramework] = useState<Framework>();

	useOnce(() => {
		void onConsent().then((consentState) => {
			setFramework(consentState.framework ?? undefined);
		});
	}, []);

	if (!framework)
		return (
			<span css={footerLink} style={{ color: 'transparent' }}>
				…
			</span>
		);

	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid -- that’s what we currently do
		<a
			href="#"
			className={extraClasses}
			css={footerLink}
			data-link-name="privacy-settings"
			onClick={(event) => {
				event.preventDefault();
				cmp.showPrivacyManager();
			}}
		>
			{framework === 'ccpa'
				? 'California resident – Do Not Sell'
				: 'Privacy settings'}
		</a>
	);
};
