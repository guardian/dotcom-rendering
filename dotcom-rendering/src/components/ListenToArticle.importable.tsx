import { log } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { getListenToArticleClient } from '../lib/bridgetApi';
import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import { ListenToArticleButton } from './ListenToArticleButton';

type Props = {
	articleId: string;
};
export const ListenToArticle = ({ articleId }: Props) => {
	const [showButton, setShowButton] = useState<boolean>(false);

	const isBridgetCompatible = useIsBridgetCompatible('8.5.1');

	useEffect(() => {
		if (isBridgetCompatible) {
			Promise.all([
				getListenToArticleClient().isAvailable(articleId),
				getListenToArticleClient().isPlaying(articleId),
			])
				.then(() =>
					// setShowButton(isAvailable && !isPlaying),
					setShowButton(false),
				)
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
			<ListenToArticleButton onClickHandler={listenToArticleHandler} />
		)
	);
};
