import { getCookie, removeCookie, setCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';
import { type EditionId as Edition, getEditionFromPageId } from './edition';

const getBannerValueFromQueryParams = () => {
	const queryParams = new URLSearchParams(window.location.search);
	return queryParams.get('editionSwitcherBanner');
};

const addOrRemoveCookie = () => {
	const value = getBannerValueFromQueryParams();
	if (value === 'hide') {
		setCookie({
			name: 'gu_hide_edition_switcher_banner',
			value: 'true',
		});
	} else if (value === 'unhide') {
		removeCookie({ name: 'gu_hide_edition_switcher_banner' });
	}
};

const hideBannerThroughUserOverride = () => {
	const queryStringValue = getBannerValueFromQueryParams();
	const cookieValue = getCookie({
		name: 'gu_hide_edition_switcher_banner',
	});

	return (
		queryStringValue === 'hide' ||
		(cookieValue === 'true' && queryStringValue !== 'unhide')
	);
};

/**
 * Show an "Edition Switcher" banner if the user's preferred edition is different from the current edition.
 *
 * This allows a user to quickly identify that they are not on the network front
 * for their preferred edition and provides a link to switch to it.
 */
export const useEditionSwitcherBanner = (
	pageId: string,
	userEdition: Edition,
): [boolean] => {
	const pageEdition = getEditionFromPageId(pageId)?.editionId;

	const [shouldShowBanner, setShouldShowBanner] = useState(
		pageEdition !== userEdition,
	);

	useEffect(() => {
		addOrRemoveCookie();
	}, []);

	useEffect(() => {
		setShouldShowBanner(
			pageEdition !== userEdition && !hideBannerThroughUserOverride(),
		);
	}, [userEdition, pageId, pageEdition]);

	return [shouldShowBanner];
};

const key = 'edition-switcher-banner';
export const hideEditionSwitcherBanner = (): void => {
	void mutate(key, { hidden: true }, false);
};
