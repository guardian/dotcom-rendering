import { css, Global } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import {
	focusHalo,
	palette as sourcePalette,
} from '@guardian/source-foundations';
import { StrictMode } from 'react';
import { AllEditorialNewslettersPageLayout } from '../layouts/AllEditorialNewslettersPageLayout';
import type { NavType } from '../model/extract-nav';
import { paletteDeclarations } from '../palette';
import type { DCRNewslettersPageType } from '../types/newslettersPage';
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
	/* We use this as our "base" or default format */
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	};

	return (
		<StrictMode>
			<Global
				styles={css`
					:root {
						/* Light palette is default on all platforms */
						/* We do not support dark mode on tag pages */
						${paletteDeclarations(format, 'light')}
						body {
							color: ${sourcePalette.neutral[7]};
						}
					}
					/* Crude but effective mechanism. Specific components may need to improve on this behaviour. */
					/* The not(.src...) selector is to work with Source's FocusStyleManager. */
					*:focus {
						${focusHalo}
					}
					::selection {
						background: ${sourcePalette.brandAlt[400]};
						color: ${sourcePalette.neutral[7]};
					}
				`}
			/>
			<SkipTo id="maincontent" label="Skip to main content" />
			<SkipTo id="navigation" label="Skip to navigation" />
			<Island priority="feature" defer={{ until: 'idle' }}>
				<FocusStyles />
			</Island>
			<Island priority="critical">
				<Metrics
					commercialMetricsEnabled={
						!!newslettersPage.config.switches.commercialMetrics
					}
					tests={newslettersPage.config.abTests}
				/>
			</Island>
			<AllEditorialNewslettersPageLayout
				newslettersPage={newslettersPage}
				NAV={NAV}
			/>
		</StrictMode>
	);
};
