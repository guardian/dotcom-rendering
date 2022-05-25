import { AudioAtom } from '@guardian/atoms-rendering';
import {
	getConsentFor,
	onConsentChange,
} from '@guardian/consent-management-platform';
import { useEffect, useState } from 'react';

type Props = {
	id: string;
	trackUrl: string;
	kicker: string;
	title?: string | undefined;
	duration: number;
	pillar: ArticleTheme;
	contentIsNotSensitive: boolean;
	aCastisEnabled: boolean;
	readerCanBeShownAds: boolean;
};

export const AudioAtomWrapper = ({
	id,
	trackUrl,
	kicker,
	title,
	pillar,
	duration,
	contentIsNotSensitive,
	aCastisEnabled,
	readerCanBeShownAds,
}: Props) => {
	// *****************
	// *     ACast     *
	// *****************
	const [shouldUseAcast, setShouldUseAcast] = useState<boolean>(false);
	useEffect(() => {
		onConsentChange((state) => {
			// Should we use ad enabled audio? If so, then set the shouldUseAcast
			// state to true, triggering a rerender of AudioAtom using a new track url
			// (one with adverts)
			const consentGiven = getConsentFor('acast', state);
			if (
				aCastisEnabled &&
				consentGiven &&
				readerCanBeShownAds && // Eg. Not a subscriber
				contentIsNotSensitive
			) {
				setShouldUseAcast(true);
			}
		});
	}, [contentIsNotSensitive, aCastisEnabled, readerCanBeShownAds]);

	return (
		<AudioAtom
			id={id}
			trackUrl={trackUrl}
			kicker={kicker}
			title={title}
			pillar={pillar}
			duration={duration}
			shouldUseAcast={shouldUseAcast}
		/>
	);
};
