import { getConsentFor, onConsentChange } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { AudioPlayer } from './AudioPlayer/AudioPlayer';

type Props = {
	mediaId: string;
	duration?: number;
	src: string;
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
export const AudioPlayerWrapper = ({ duration, src, mediaId }: Props) => {
	const [finalSrc, setFinalSrc] = useState<string>(src);

	useEffect(() => {
		onConsentChange((consentState) => {
			const consentForAcast = getConsentFor('acast', consentState);
			const isAcastEnabled = window.guardian.config.switches.acast;
			const isPodcast = window.guardian.config.page.isPodcast;

			if (isAcastEnabled && isPodcast && consentForAcast) {
				setFinalSrc(src.replace('https://', 'https://flex.acast.com/'));
			}
		});
	}, [src]);

	return <AudioPlayer src={finalSrc} mediaId={mediaId} duration={duration} />;
};
