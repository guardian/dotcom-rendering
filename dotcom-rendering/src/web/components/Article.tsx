import { StrictMode } from 'react';
import { Global, css } from '@emotion/react';
import { focusHalo, brandAlt, neutral } from '@guardian/source-foundations';
import { ArticleDesign } from '@guardian/libs';
import { filterABTestSwitches } from '../../model/enhance-switches';
import { SkipTo } from './SkipTo';
import { DecideLayout } from '../layouts/DecideLayout';
import { CommercialMetrics } from './CommercialMetrics.importable';
import { Island } from './Island';
import { FocusStyles } from './FocusStyles.importable';
import { BrazeMessaging } from './BrazeMessaging.importable';
import { ReaderRevenueDev } from './ReaderRevenueDev.importable';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { CoreVitals } from './CoreVitals.importable';
import { SetABTests } from './SetABTests.importable';

type Props = {
	CAPI: CAPIType;
	NAV: NavType;
	format: ArticleFormat;
};

/**
 * @description
 * Article is a high level wrapper for pages on Dotcom. Sets strict mode and some globals
 *
 * @param {Props} props
 * @param {CAPIType} props.CAPI - The article JSON data
 * @param {NAVType} props.NAV - The article JSON data
 * @param {ArticleFormat} props.format - The format model for the article
 * */
export const Article = ({ CAPI, NAV, format }: Props) => {
	return (
		<StrictMode>
			<Global
				styles={css`
					/* Crude but effective mechanism. Specific components may need to improve on this behaviour. */
					/* The not(.src...) selector is to work with Source's FocusStyleManager. */
					*:focus {
						${focusHalo}
					}
					::selection {
						background: ${brandAlt[400]};
						color: ${neutral[7]};
					}
				`}
			/>
			<SkipTo id="maincontent" label="Skip to main content" />
			<SkipTo id="navigation" label="Skip to navigation" />
			{(format.design === ArticleDesign.LiveBlog ||
				format.design === ArticleDesign.DeadBlog) && (
				<SkipTo id="keyevents" label="Skip to key events" />
			)}
			<Island clientOnly={true} deferUntil="idle">
				<AlreadyVisited />
			</Island>
			<Island clientOnly={true} deferUntil="idle">
				<FocusStyles />
			</Island>
			<Island clientOnly={true} deferUntil="idle">
				<CommercialMetrics
					enabled={CAPI.config.switches.commercialMetrics}
				/>
			</Island>
			<Island clientOnly={true} deferUntil="idle">
				<CoreVitals />
			</Island>
			<Island clientOnly={true} deferUntil="idle">
				<BrazeMessaging idApiUrl={CAPI.config.idApiUrl} />
			</Island>
			<Island clientOnly={true} deferUntil="idle">
				<ReaderRevenueDev
					shouldHideReaderRevenue={CAPI.shouldHideReaderRevenue}
				/>
			</Island>
			<Island clientOnly={true}>
				<SetABTests
					abTestSwitches={filterABTestSwitches(CAPI.config.switches)}
					pageIsSensitive={CAPI.config.isSensitive}
					isDev={!!CAPI.config.isDev}
				/>
			</Island>
			<DecideLayout CAPI={CAPI} NAV={NAV} format={format} />
		</StrictMode>
	);
};
