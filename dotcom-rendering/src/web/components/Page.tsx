import { StrictMode } from 'react';
import { Global, css } from '@emotion/react';
import { focusHalo } from '@guardian/source-foundations';
import { ArticleDesign } from '@guardian/libs';
import { SkipTo } from '../components/SkipTo';
import { DecideLayout } from '../layouts/DecideLayout';

type Props = {
	CAPI: CAPIType;
	NAV: NavType;
	format: ArticleFormat;
};

/**
 * @description
 * Page is a high level wrapper for pages on Dotcom. Sets strict mode and some globals
 *
 * @param {CAPIType} CAPI - The article JSON data
 * @param {NAVType} NAV - The article JSON data
 * @param {ArticleFormat} format - The format model for the article
 * */
export const Page = ({ CAPI, NAV, format }: Props) => {
	return (
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
			<DecideLayout CAPI={CAPI} NAV={NAV} format={format} />
		</StrictMode>
	);
};
