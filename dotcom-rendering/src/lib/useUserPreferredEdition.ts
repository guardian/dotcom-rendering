import { getCookie } from '@guardian/libs';
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

/**
 * Show the banner if the user's preferred edition is different from the current edition
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
		setShouldShowBanner(userEdition !== null && edition !== userEdition);
	}, [userEdition, edition]);

	return [shouldShowBanner, userEdition];
};

const key = 'edition-switcher-banner';
export const hideEditionSwitcherBanner = (): void => {
	void mutate(key, { hidden: true }, false);
};
