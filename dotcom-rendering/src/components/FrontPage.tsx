import { css, Global } from '@emotion/react';
import { brandAlt, focusHalo, neutral } from '@guardian/source-foundations';
import { StrictMode } from 'react';
import { FrontLayout } from '../layouts/FrontLayout';
import { buildAdTargeting } from '../lib/ad-targeting';
import { filterABTestSwitches } from '../model/enhance-switches';
import type { NavType } from '../model/extract-nav';
import type { DCRFrontType } from '../types/front';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { BrazeMessaging } from './BrazeMessaging.importable';
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
			<Island
				priority="feature"
				clientOnly={true}
				defer={{ until: 'idle' }}
			>
				<AlreadyVisited />
			</Island>
			<Island
				priority="enhancement"
				clientOnly={true}
				defer={{ until: 'idle' }}
			>
				<FocusStyles />
			</Island>
			<Island
				priority="feature"
				clientOnly={true}
				defer={{ until: 'idle' }}
			>
				<Metrics
					commercialMetricsEnabled={
						!!front.config.switches.commercialMetrics
					}
				/>
			</Island>
			<Island
				priority="enhancement"
				defer={{ until: 'idle' }}
				clientOnly={true}
			>
				<ShowHideContainers />
			</Island>
			<Island priority="critical" clientOnly={true}>
				<SetABTests
					abTestSwitches={filterABTestSwitches(front.config.switches)}
					pageIsSensitive={front.config.isSensitive}
					isDev={!!front.config.isDev}
				/>
			</Island>

			<Island priority="critical" clientOnly={true}>
				<SetAdTargeting adTargeting={adTargeting} />
			</Island>
			<Island
				priority="feature"
				clientOnly={true}
				defer={{ until: 'idle' }}
			>
				<BrazeMessaging idApiUrl={front.config.idApiUrl} />
			</Island>
			<Island
				priority="feature"
				clientOnly={true}
				defer={{ until: 'idle' }}
			>
				<ReaderRevenueDev shouldHideReaderRevenue={false} />
			</Island>
			<FrontLayout front={front} NAV={NAV} />
		</StrictMode>
	);
};
