import { getCookie, removeCookie, setCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';
import {
	type EditionId as Edition,
	getEditionFromPageId,
	isNetworkFront,
} from './edition';

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
 * Show an "Edition Switcher" banner if the user is on a network front
 * which is different to their preferred or default edition.
 *
 * This allows a user to quickly identify that they are not on the network front
 * for their edition and gives them a link to switch to it.
 */
export const useEditionSwitcherBanner = (
	pageId: string,
	userEdition: Edition,
): [boolean] => {
	const pageEdition = getEditionFromPageId(pageId)?.editionId;
	const isOnWrongNetworkFront =
		isNetworkFront(pageId) && pageEdition !== userEdition;
	const [showBanner, setShowBanner] = useState(isOnWrongNetworkFront);

	useEffect(() => {
		setShowBanner(
			isOnWrongNetworkFront && !hideBannerThroughUserOverride(),
		);
	}, [isOnWrongNetworkFront]);

	useEffect(() => {
		addOrRemoveCookie();
	}, []);

	return [showBanner];
};

const key = 'edition-switcher-banner';
export const hideEditionSwitcherBanner = (): void => {
	void mutate(key, { hidden: true }, false);
};
