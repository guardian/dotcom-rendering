import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { renderToString } from 'react-dom/server';

export const renderToStringWithEmotion = (element: React.ReactNode) => {
	const key = 'dcr';
	const cache = createCache({ key });
	const emotionServer = createEmotionServer(cache);

	const html = renderToString(
		<CacheProvider value={cache}>{element}</CacheProvider>,
	);

	const chunks = emotionServer.extractCriticalToChunks(html);
	const extractedCss = emotionServer.constructStyleTagsFromChunks(chunks);

	return { html, extractedCss };
};
