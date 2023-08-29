import {
	getConsentFor,
	onConsentChange,
} from '@guardian/consent-management-platform';
import type { ArticleFormat } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { AudioAtom } from './AudioAtom/AudioAtom';

type Props = {
	id: string;
	trackUrl: string;
	kicker: string;
	title?: string | undefined;
	duration: number;
	format: ArticleFormat;
	contentIsNotSensitive: boolean;
	aCastisEnabled: boolean;
	readerCanBeShownAds: boolean;
};

/**
 * ## Why does this need to be an Island?
 *
 * The audio atom is interactive.
 * Requires consent to use audio ads.
 *
 * ---
 *
 * (No visual story exists)
 */
export const AudioAtomWrapper = ({
	id,
	trackUrl,
	kicker,
	title,
	format,
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
			format={format}
			duration={duration}
			shouldUseAcast={shouldUseAcast}
		/>
	);
};
