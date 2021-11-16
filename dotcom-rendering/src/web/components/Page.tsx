import React, { StrictMode } from 'react';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider, Global, css } from '@emotion/react';
import { focusHalo } from '@guardian/source-foundations';

type Props = {
	children: React.ReactNode;
	cache: EmotionCache;
};

/**
 * @description
 * Page is a high level wrapper for pages on Dotcom. Sets strict mode, some globals
 * and the Emotion cache
 *
 * @param {ReactNode} children - What gets rendered on the page
 * @param {EmotionCache} cache - Provides the Emotion cache
 * */
export const Page = ({ children, cache }: Props) => {
	return (
		<CacheProvider value={cache}>
			<StrictMode>
				<Global
					styles={css`
						/* Crude but effective mechanism. Specific components may need to improve on this behaviour. */
						/* The not(.src...) selector is to work with Source's FocusStyleManager. */
						*:focus {
							${focusHalo}
						}
					`}
				/>
				{children}
			</StrictMode>
		</CacheProvider>
	);
};
