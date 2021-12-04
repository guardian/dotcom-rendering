import React, { StrictMode } from 'react';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider, Global, css } from '@emotion/react';
import { focusHalo } from '@guardian/source-foundations';
import { SkipTo } from '../components/SkipTo';
import { ArticleDesign } from '@guardian/libs';

type Props = {
	children: React.ReactNode;
	cache: EmotionCache;
	format: ArticleFormat;
};

/**
 * @description
 * Page is a high level wrapper for pages on Dotcom. Sets strict mode, some globals
 * and the Emotion cache
 *
 * @param {ReactNode} children - What gets rendered on the page
 * @param {EmotionCache} cache - Provides the Emotion cache
 * @param {ArticleFormat} format - The format model for the article
 * */
export const Page = ({ children, cache, format }: Props) => {
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
				<SkipTo id="maincontent" label="Skip to main content" />
				<SkipTo id="navigation" label="Skip to navigation" />
				{format.design === ArticleDesign.LiveBlog ||
					(format.design === ArticleDesign.DeadBlog && (
						<SkipTo id="keyevents" label="Skip to key events" />
					))}
				<div id="react-root"></div>
				{children}
			</StrictMode>
		</CacheProvider>
	);
};
