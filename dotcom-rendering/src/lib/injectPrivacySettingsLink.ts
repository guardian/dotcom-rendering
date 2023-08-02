import { cmp } from '@guardian/consent-management-platform';
import { DOMContentLoaded } from './DOMContentLoaded';
import { getPrivacyFramework } from './getPrivacyFramework';

const newPrivacyLinkName = 'privacy-settings';

const isAlreadyAdded = () =>
	document.querySelector(`a[data-link-name=${newPrivacyLinkName}]`);

export const injectPrivacySettingsLink = async (): Promise<void> => {
	await DOMContentLoaded;

	const privacyLink = document.querySelector('a[data-link-name=privacy]');

	if (!isAlreadyAdded() && privacyLink) {
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
