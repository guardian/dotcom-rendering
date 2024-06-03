import { css } from '@emotion/react';
import { cmp, onConsent } from '@guardian/libs';
import type { ConsentFramework } from '@guardian/libs';
import { palette } from '@guardian/source/foundations';
import { ButtonLink } from '@guardian/source/react-components';
import { useEffect, useState } from 'react';

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

/**
 * A Link/Button that opens the privacy settings modal.
 *
 * ## Why does this need to be an Island?
 *
 * We need to respond to clicks by calling the consent management platform’s
 * privacy settings modal.
 *
 * To prevent this island from creating a distinct network request,
 * we tell webpack to eagerly load it, so it ends up in the entry chunk.
 * @see `eagerlyImportPrivacySettingsLinkIsland`
 */
export const PrivacySettingsLink = ({ extraClasses }: Props) => {
	const [framework, setFramework] = useState<ConsentFramework>();

	useEffect(() => {
		void onConsent().then((consentState) => {
			setFramework(consentState.framework ?? undefined);
		});
	}, []);

	if (!framework) {
		return (
			<span css={footerLink} style={{ color: 'transparent' }}>
				&nbsp;
			</span>
		);
	}

	return (
		<ButtonLink
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
		</ButtonLink>
	);
};
