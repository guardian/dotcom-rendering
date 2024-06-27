import { getCookie, removeCookie, setCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';
import { type EditionId as Edition, isEditionId } from './edition';

const PathnameToEditionMap: { [key: string]: string } = {
	'/uk': 'UK',
	'/us': 'US',
	'/au': 'AU',
	'/international': 'INT',
	'/europe': 'EUR',
};

const hasUserSelectedEdition = (preferredEdition: string | null): boolean => {
	return preferredEdition !== null && isEditionId(preferredEdition);
};

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
 * If the user has arrived on the page by clicking the edition switcher dropdown in the
 * top-right of the page, then the URL will contain a query parameter `INTCMP=CE_..`.
 * When this happens, we can assume the user knows they are on a
 * particular edition and we do notneed to show them the banner.
 */
const didUserClickEditionDropdown = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const value = queryParams.get('INTCMP');

	return value?.substring(0, 3) === 'CE_';
};

/**
 * Show an "Edition Switcher" banner if the user's preferred edition is different from the current edition.
 *
 * This allows a user to quickly identify that they are not on the network front
 * for their preferred edition and provides a link to switch to it.
 */
export const useEditionSwitcherBanner = (
	edition: Edition,
): [boolean, Edition | null] => {
	const [userEdition, setUserEdition] = useState<Edition | null>(null);
	const [shouldShowBanner, setShouldShowBanner] = useState(false);

	useEffect(() => {
		const preferredEdition = getCookie({
			name: 'GU_EDITION',
		});

		if (hasUserSelectedEdition(preferredEdition)) {
			setUserEdition(preferredEdition as Edition);
		} else {
			const pathname = window.location.pathname;
			const editionFromLocation = PathnameToEditionMap[pathname];
			if (editionFromLocation && isEditionId(editionFromLocation)) {
				setUserEdition(editionFromLocation);
			}
		}
	}, [userEdition]);

	useEffect(() => {
		addOrRemoveCookie();
	}, []);

	useEffect(() => {
		setShouldShowBanner(
			userEdition !== null &&
				edition !== userEdition &&
				!hideBannerThroughUserOverride() &&
				!didUserClickEditionDropdown(),
		);
	}, [userEdition, edition]);

	return [shouldShowBanner, userEdition];
};

const key = 'edition-switcher-banner';
export const hideEditionSwitcherBanner = (): void => {
	void mutate(key, { hidden: true }, false);
};
