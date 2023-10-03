import { css, Global } from '@emotion/react';
import { brandAlt, focusHalo, neutral } from '@guardian/source-foundations';
import { StrictMode } from 'react';
import { AllEditorialNewslettersPageLayout } from '../layouts/AllEditorialNewslettersPageLayout';
import type { NavType } from '../model/extract-nav';
import type { DCRNewslettersPageType } from '../types/newslettersPage';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { FocusStyles } from './FocusStyles.importable';
import { Island } from './Island';
import { Metrics } from './Metrics.importable';
import { SkipTo } from './SkipTo';

type Props = {
	newslettersPage: DCRNewslettersPageType;
	NAV: NavType;
};

/**
 * @description
 * AllEditorialNewslettersPage is a high level wrapper for the
 * editorial newsletters page on Dotcom. Sets strict mode and some globals
 *
 * @param {Props} props
 * @param {DCRNewslettersPageType} props.newslettersPage - The newsletters JSON data
 * @param {NAVType} props.NAV - The nav JSON data
 * */
export const AllEditorialNewslettersPage = ({
	newslettersPage,
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
			<Island deferUntil="idle">
				<AlreadyVisited />
			</Island>
			<Island deferUntil="idle">
				<FocusStyles />
			</Island>
			<Island deferUntil="idle">
				<Metrics
					commercialMetricsEnabled={
						!!newslettersPage.config.switches.commercialMetrics
					}
				/>
			</Island>
			<AllEditorialNewslettersPageLayout
				newslettersPage={newslettersPage}
				NAV={NAV}
			/>
		</StrictMode>
	);
};
