import { log } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { getListenToArticleClient } from '../lib/bridgetApi';
import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import { ListenToArticleButton } from './ListenToArticleButton';

type Props = {
	articleId: string;
};
export const ListenToArticle = ({ articleId }: Props) => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [showButton, setShowButton] = useState<boolean>(true);

	const isBridgetCompatible = useIsBridgetCompatible('8.5.1');

	useEffect(() => {
		isBridgetCompatible &&
			void getListenToArticleClient()
				.isAvailable(articleId)
				.then(setShowButton);

		void getListenToArticleClient().isPlaying(articleId).then(setIsPlaying);
	}, [articleId, isBridgetCompatible]);

	const listenToArticleHandler = () => {
		void getListenToArticleClient()
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
		showButton &&
		!isPlaying && (
			<ListenToArticleButton onClickHandler={listenToArticleHandler} />
		)
	);
};
