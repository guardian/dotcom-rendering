import { log } from '@guardian/libs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAudioClient } from '../lib/bridgetApi';
import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import { AppsAudioPlayButton } from './AppsAudioPlayButton';

const AUDIO_BRIDGET_VERSION = '8.9.0';
const POLLING_INTERVAL_MS = 3000;

type Props = {
	audioDuration?: string;
};

export const AppsAudioPlayer = ({ audioDuration }: Props) => {
	const [showButton, setShowButton] = useState<boolean>(false);
	const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const isBridgetCompatible = useIsBridgetCompatible(AUDIO_BRIDGET_VERSION);

	const checkIsPlaying = useCallback(() => {
		getAudioClient()
			.isPlaying()
			.then((isPlaying: boolean) => {
				setShowButton(!isPlaying);
			})
			.catch((error: Error) => {
				log('dotcom', 'Error polling isPlaying: ', error);
			});
	}, []);

	useEffect(() => {
		if (isBridgetCompatible) {
			Promise.all([
				getAudioClient().isAvailable(),
				getAudioClient().isPlaying(),
			])
				.then(([isAvailable, isPlaying]) => {
					setShowButton(isAvailable && !isPlaying);

					if (isAvailable) {
						pollingRef.current = setInterval(
							checkIsPlaying,
							POLLING_INTERVAL_MS,
						);
					}
				})
				.catch((error: Error) => {
					log('dotcom', 'Error fetching audio status: ', error);
					setShowButton(false);
				});
		}

		return () => {
			if (pollingRef.current) {
				clearInterval(pollingRef.current);
			}
		};
	}, [isBridgetCompatible, checkIsPlaying]);

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
