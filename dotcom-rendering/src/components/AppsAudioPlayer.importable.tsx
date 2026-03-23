import { log } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { getAudioClient } from '../lib/bridgetApi';
import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import { AppsAudioPlayButton } from './AppsAudioPlayButton';

const AUDIO_BRIDGET_VERSION = '8.7.7-2026-03-05';

type Props = {
	audioDuration?: string;
};

export const AppsAudioPlayer = ({ audioDuration }: Props) => {
	const [showButton, setShowButton] = useState<boolean>(false);

	const isBridgetCompatible = useIsBridgetCompatible(AUDIO_BRIDGET_VERSION);

	useEffect(() => {
		if (isBridgetCompatible) {
			Promise.all([
				getAudioClient().isAvailable(),
				getAudioClient().isPlaying(),
			])
				.then(([isAvailable, isPlaying]) => {
					setShowButton(isAvailable && !isPlaying);
				})
				.catch((error: Error) => {
					log('dotcom', 'Error fetching audio status: ', error);
					setShowButton(false);
				});
		}
	}, [isBridgetCompatible]);

	const playHandler = () => {
		void getAudioClient()
			.play()
			.then(() => {
				// Hide the button once audio is playing
				setShowButton(false);
			})
			.catch((error: Error) => {
				window.guardian.modules.sentry.reportError(
					error,
					'bridget-getAudioClient-play-error',
				);
				log('dotcom', 'Bridget getAudioClient.play Error:', error);
			});
	};

	return showButton ? (
		<AppsAudioPlayButton
			onClickHandler={playHandler}
			audioDuration={audioDuration}
		/>
	) : null;
};
