import { log } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { getListenToArticleClient } from '../lib/bridgetApi';
import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import { ListenToArticleButton } from './ListenToArticleButton';

type Props = {
	articleId: string;
};

export const formatAudioDuration = (durationInSeconds: number): string => {
	const hours = Math.floor(durationInSeconds / 3600);
	const minutes = Math.floor((durationInSeconds % 3600) / 60);
	const seconds = durationInSeconds % 60;

	if (hours > 3) {
		return '';
	}

	const formattedDuration = `${
		hours > 0 ? `${hours.toString().padStart(2, '0')}:` : ''
	}${minutes > 0 ? minutes.toString().padStart(2, '0') : '00'}:${
		seconds > 0 ? seconds.toString().padStart(2, '0') : '00'
	}`;

	return formattedDuration;
};

export const ListenToArticle = ({ articleId }: Props) => {
	const [showButton, setShowButton] = useState<boolean>(false);
	const [audioDuration, setAudioDuration] = useState<number | undefined>(
		undefined,
	);

	const isBridgetCompatible = useIsBridgetCompatible('8.5.1'); // todo update for bridget version

	useEffect(() => {
		if (isBridgetCompatible) {
			Promise.all([
				getListenToArticleClient().isAvailable(articleId),
				getListenToArticleClient().isPlaying(articleId),
				getListenToArticleClient().getAudioDuration(articleId),
			])
				.then(() => {
					// .then(({ isAvailable, isPlaying, audioDurationSeconds }) => {
					// setAudioDuration(
					// 	audioDurationSeconds ? audioDurationSeconds : undefined,
					// );
					// setShowButton(isAvailable && !isPlaying);
					setAudioDuration(0);
					setShowButton(false);
				})
				.catch((error) => {
					console.error(
						'Error fetching article audio status: ',
						error,
					);

					setShowButton(false);
				});
		}
	}, [articleId, isBridgetCompatible]);

	const listenToArticleHandler = () => {
		void getListenToArticleClient()
			.play(articleId)
			.then((success: boolean) => {
				// hide the audio button once audio is playing until we can
				// manage play state syncronisation across the native miniplayer and web layer
				success && setShowButton(false);
			})
			.catch((error: Error) => {
				window.guardian.modules.sentry.reportError(
					error,
					'bridget-getListenToArticleClient-play-error',
				),
					log(
						'dotcom',
						'Bridget getListenToArticleClient.play Error:',
						error,
					);
			});
	};
	return (
		showButton && (
			<ListenToArticleButton
				onClickHandler={listenToArticleHandler}
				audioDuration={
					audioDuration !== undefined
						? formatAudioDuration(audioDuration)
						: undefined
				}
			/>
		)
	);
};
