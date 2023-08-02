import { cmp } from '@guardian/consent-management-platform';
import { getPrivacyFramework } from './getPrivacyFramework';

const newPrivacyLinkName = 'privacy-settings';

export const injectPrivacySettingsLink = async (): Promise<void> => {
	const privacyLink = document.querySelector('a[data-link-name=privacy]');

	if (
		!document.querySelector(`a[data-link-name=${newPrivacyLinkName}]`) &&
		privacyLink
	) {
		const privacyLinkListItem = privacyLink.parentElement;

		if (privacyLinkListItem) {
			try {
				const framework = await getPrivacyFramework();
				const newPrivacyLink = privacyLink.cloneNode(false) as Element;

				newPrivacyLink.setAttribute(
					'data-link-name',
					newPrivacyLinkName,
				);
				newPrivacyLink.setAttribute('href', '#');
				newPrivacyLink.innerHTML = framework.ccpa
					? 'California resident – Do Not Sell'
					: 'Privacy settings';

				const newPrivacyLinkListItem = privacyLinkListItem.cloneNode(
					false,
				) as Element;

				newPrivacyLinkListItem.appendChild(newPrivacyLink);

				privacyLinkListItem.insertAdjacentElement(
					'beforebegin',
					newPrivacyLinkListItem,
				);

				newPrivacyLink.addEventListener('click', (event) => {
					event.preventDefault();
					cmp.showPrivacyManager();
				});
			} catch (e) {
				return console.error(`privacy settings - error: ${String(e)}`);
			}
		}
	}
};

// Inject privacy link when document has finished loading
export const injectPrivacySettingsLinkWhenReady = (): Promise<void> => {
	if (document.readyState === 'loading') {
		return new Promise((resolve) => {
			document.addEventListener(
				'readystatechange',
				() => {
					void injectPrivacySettingsLink().then(resolve);
				},
				{ once: true },
			);
		});
	} else {
		return injectPrivacySettingsLink();
	}
};
