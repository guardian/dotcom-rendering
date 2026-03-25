import { getConsentFor, onConsentChange } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { AudioPlayer } from './AudioPlayer/AudioPlayer';

type Props = {
	mediaId: string;
	duration?: number;
	src: string;
	contentIsNotSensitive: boolean;
	isAcastEnabled: boolean;
};

/**
 * ## Why does this need to be an Island?
 *
 * The audio player is interactive.
 * Requires consent to use audio ads.
 *
 * ---
 *
 * (No visual story exists)
 */
export const AudioPlayerWrapper = ({
	duration,
	src,
	mediaId,
	contentIsNotSensitive,
	isAcastEnabled,
}: Props) => {
	const [finalSrc, setFinalSrc] = useState<string>(src);

	useEffect(() => {
		// this is how frontend checks for whether to show ads or not,
		// and it's on the window in DCR but it's not clear how...
		// so this just carries over the existing logic
		// https://github.com/guardian/frontend/blob/ba57677baaa06f37235e8d7a983cb383d0f5c989/static/src/javascripts/projects/common/modules/audio/index.js#L25-L44
		const isPodcast = window.guardian.config.page.isPodcast;

		if (contentIsNotSensitive && isAcastEnabled && isPodcast) {
			onConsentChange((consentState) => {
				const consentForAcast = getConsentFor('acast', consentState);

				if (consentForAcast) {
					setFinalSrc(
						src.replace('https://', 'https://flex.acast.com/'),
					);
				}
			});
		}
	}, [src, contentIsNotSensitive, isAcastEnabled]);

	return <AudioPlayer src={finalSrc} mediaId={mediaId} duration={duration} />;
};
