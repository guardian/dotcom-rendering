import { useEffect, useState } from 'react';
import { ListenToAudioButton } from './ListenToArticleButton';
import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import { getListenToArticleClient } from '../lib/bridgetApi';
import { log } from '@guardian/libs';

type Props = {
	articleId: string;
};
export const ListenToArticleWrapper = ({ articleId }: Props) => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [showListenToArticleButton, setShowListenToArticleButton] =
		useState<boolean>(false);

	const isBridgetCompatible = useIsBridgetCompatible('8.5.0');

	useEffect(() => {
		void getListenToArticleClient()
			.isAvailable(articleId)
			.then((b) => {
				isBridgetCompatible && setShowListenToArticleButton(b);
			});

		void getListenToArticleClient().play(articleId).then(setIsPlaying);
	});

	const listenToArticleHander = () => {
		isPlaying
			? void getListenToArticleClient()
					.pause(articleId)
					.then((success: boolean) => {
						success && setIsPlaying(false);
					})
					.catch((error: any) => {
						window.guardian.modules.sentry.reportError(
							error,
							'bridget-getListenToArticleClient-pause-error',
						),
							log(
								'dotcom',
								'Bridget getListenToArticleClient.pause Error:',
								error,
							);
					})
			: void getListenToArticleClient()
					.play(articleId)
					.then((success: boolean) => {
						success && setIsPlaying(true);
					})
					.catch((error: any) => {
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
		showListenToArticleButton && (
			<ListenToAudioButton
				isPlaying={isPlaying}
				onClickHandler={listenToArticleHander}
			/>
		)
	);
};
