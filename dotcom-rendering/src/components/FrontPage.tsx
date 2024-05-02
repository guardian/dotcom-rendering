import { css, Global } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import {
	focusHalo,
	palette as sourcePalette,
} from '@guardian/source-foundations';
import { StrictMode } from 'react';
import { FrontLayout } from '../layouts/FrontLayout';
import { buildAdTargeting } from '../lib/ad-targeting';
import { filterABTestSwitches } from '../model/enhance-switches';
import type { NavType } from '../model/extract-nav';
import { paletteDeclarations } from '../palette';
import type { DCRFrontType } from '../types/front';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { BrazeMessaging } from './BrazeMessaging.importable';
import { DarkModeMessage } from './DarkModeMessage';
import { FocusStyles } from './FocusStyles.importable';
import { Island } from './Island';
import { Metrics } from './Metrics.importable';
import { ReaderRevenueDev } from './ReaderRevenueDev.importable';
import { SetABTests } from './SetABTests.importable';
import { SetAdTargeting } from './SetAdTargeting.importable';
import { ShowHideContainers } from './ShowHideContainers.importable';
import { SkipTo } from './SkipTo';

type Props = {
	front: DCRFrontType;
	NAV: NavType;
};

/**
 * @description
 * FrontPage is a high level wrapper for front pages on Dotcom. Sets strict mode and some globals
 *
 * @param {Props} props
 * @param {DCRFrontType} props.front - The article JSON data
 * @param {NAVType} props.NAV - The article JSON data
 * */
export const FrontPage = ({ front, NAV }: Props) => {
	const adTargeting = buildAdTargeting({
		isAdFreeUser: front.isAdFreeUser,
		isSensitive: front.config.isSensitive,
		edition: front.config.edition,
		section: front.config.section,
		sharedAdTargeting: front.config.sharedAdTargeting,
		adUnit: front.config.adUnit,
	});

	/* We use this as our "base" or default format */
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	};

	const darkModeAvailable =
		front.config.abTests.darkModeWebVariant === 'variant';

	return (
		<StrictMode>
			<Global
				styles={css`
					:root {
						/* Light palette is default on all platforms */
						/* We do not support dark mode on front pages */
						${paletteDeclarations(format, 'light')}
						body {
							color: ${sourcePalette.neutral[7]};
						}
						/* Dark palette only if supported */
						${darkModeAvailable
							? css`
									@media (prefers-color-scheme: dark) {
										${paletteDeclarations(format, 'dark')}
										body {
											color: ${sourcePalette.neutral[86]};
										}
									}
							  `
							: ''}
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
				<AlreadyVisited />
			</Island>
			<Island priority="enhancement" defer={{ until: 'idle' }}>
				<FocusStyles />
			</Island>
			<Island priority="critical">
				<Metrics
					commercialMetricsEnabled={
						!!front.config.switches.commercialMetrics
					}
					tests={front.config.abTests}
				/>
			</Island>
			<Island priority="enhancement" defer={{ until: 'idle' }}>
				<ShowHideContainers />
			</Island>
			<Island priority="critical">
				<SetABTests
					abTestSwitches={filterABTestSwitches(front.config.switches)}
					pageIsSensitive={front.config.isSensitive}
					isDev={!!front.config.isDev}
					serverSideTests={front.config.abTests}
				/>
			</Island>

			<Island priority="critical">
				<SetAdTargeting adTargeting={adTargeting} />
			</Island>
			<Island priority="feature" defer={{ until: 'idle' }}>
				<BrazeMessaging idApiUrl={front.config.idApiUrl} />
			</Island>
			<Island priority="feature" defer={{ until: 'idle' }}>
				<ReaderRevenueDev shouldHideReaderRevenue={false} />
			</Island>
			{darkModeAvailable && (
				<DarkModeMessage>
					Dark mode is a work-in-progress.
					<br />
					You can{' '}
					<a
						style={{ color: 'inherit' }}
						href="theguardian.com/opt/out/dark-mode-web"
					>
						opt out anytime
					</a>{' '}
					if anything is unreadable or odd.
				</DarkModeMessage>
			)}
			<FrontLayout front={front} NAV={NAV} />
		</StrictMode>
	);
};
