import { log } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { getListenToArticleClient } from '../lib/bridgetApi';
import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import { ListenToArticleButton } from './ListenToArticleButton';

type Props = {
	articleId: string;
};

export const formatAudioDuration = (
	durationInSeconds: number,
): string | undefined => {
	if (durationInSeconds >= 3600 || durationInSeconds <= 0) {
		return undefined;
	}
	const minutes = Math.floor((durationInSeconds % 3600) / 60);
	const seconds = durationInSeconds % 60;

	const formattedDuration = `${minutes.toString()}:${seconds
		.toString()
		.padStart(2, '0')}`;

	return formattedDuration;
};

export const ListenToArticle = ({ articleId }: Props) => {
	const [showButton, setShowButton] = useState<boolean>(false);
	const [audioDurationSeconds, setAudioDurationSeconds] = useState<
		number | undefined
	>(undefined);

	const isBridgetCompatible = useIsBridgetCompatible('8.6.0');
	useEffect(() => {
		if (isBridgetCompatible) {
			Promise.all([
				getListenToArticleClient().isAvailable(articleId),
				getListenToArticleClient().isPlaying(articleId),
				getListenToArticleClient().getAudioDurationSeconds(articleId),
			])
				.then(([isAvailable, isPlaying, durationSeconds]) => {
					setAudioDurationSeconds(
						typeof durationSeconds === 'number' &&
							durationSeconds > 0
							? durationSeconds
							: undefined,
					);
					setShowButton(isAvailable && !isPlaying);
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
					audioDurationSeconds !== undefined
						? formatAudioDuration(audioDurationSeconds)
						: undefined
				}
			/>
		)
	);
};
