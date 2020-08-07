import { cmp } from '@guardian/consent-management-platform';
import { getPrivacyFramework } from '@root/src/web/lib/getPrivacyFramework';

export const addPrivacySettingsLink = (): void => {
    if (
        'guardian' in window &&
        'config' in window.guardian &&
        'switches' in window.guardian.config &&
        'cmpUi' in window.guardian.config.switches &&
        !window.guardian.config.switches.cmpUi
    ) {
        return;
    }

    const privacyLink = document.querySelector('a[data-link-name=privacy]');

    if (privacyLink) {
        const privacyLinkListItem = privacyLink.parentElement;

        if (privacyLinkListItem) {
            getPrivacyFramework().then(({ ccpa }) => {
                const newPrivacyLink = privacyLink.cloneNode(false) as Element;

                newPrivacyLink.setAttribute(
                    'data-link-name',
                    'privacy-settings',
                );
                newPrivacyLink.setAttribute('href', '#');
                newPrivacyLink.innerHTML = ccpa
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

                newPrivacyLink.addEventListener(
                    'click',
                    cmp.showPrivacyManager,
                );
            });
        }
    }
};
