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
			void getListenToArticleClient()
				.isAvailable(articleId)
				.then(() => setShowButton(false));
			void getListenToArticleClient()
				.isPlaying(articleId)
				.then(() => setShowButton(false));
		}
	}, [articleId, isBridgetCompatible]);

	const listenToArticleHandler = () => {
		void getListenToArticleClient()
			.play(articleId)
			.then((success: boolean) => {
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
