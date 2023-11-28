import { css, Global } from '@emotion/react';
import { brandAlt, focusHalo, neutral } from '@guardian/source-foundations';
import { StrictMode } from 'react';
import { NewsletterDetailPageLayout } from '../layouts/NewslettersDetailPageLayout';
import type { NavType } from '../model/extract-nav';
import type { DCRNewsletterDetailPageType } from '../types/newsletterDetailPage';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { FocusStyles } from './FocusStyles.importable';
import { Island } from './Island';
import { Metrics } from './Metrics.importable';
import { SkipTo } from './SkipTo';

type Props = {
	newsletterDetailPage: DCRNewsletterDetailPageType;
	NAV: NavType;
};

/**
 * @description
 * NewslettersDetailPage is a high level wrapper for the
 * newsletter detail pages on Dotcom. Sets strict mode and some globals
 *
 * @param {Props} props
 * @param {DCRNewsletterDetailPageType} props.newsletterDetailPage - The newsletters JSON data
 * @param {NAVType} props.NAV - The nav JSON data
 * */
export const NewsletterDetailPage = ({
	newsletterDetailPage: newsletterDetailPage,
	NAV,
}: Props) => {
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
			<Island priority="feature" defer={{ until: 'idle' }}>
				<AlreadyVisited />
			</Island>
			<Island priority="feature" defer={{ until: 'idle' }}>
				<FocusStyles />
			</Island>
			<Island priority="critical">
				<Metrics
					commercialMetricsEnabled={
						!!newsletterDetailPage.config.switches.commercialMetrics
					}
					tests={newsletterDetailPage.config.abTests}
				/>
			</Island>
			<NewsletterDetailPageLayout
				newsletterDetailPage={newsletterDetailPage}
				NAV={NAV}
			/>
		</StrictMode>
	);
};
