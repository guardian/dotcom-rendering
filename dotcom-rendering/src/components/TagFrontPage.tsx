import { css, Global } from '@emotion/react';
import { brandAlt, focusHalo, neutral } from '@guardian/source-foundations';
import { StrictMode } from 'react';
import { TagFrontLayout } from '../layouts/TagFrontLayout.tsx';
import { buildAdTargeting } from '../lib/ad-targeting.ts';
import { filterABTestSwitches } from '../model/enhance-switches.ts';
import type { NavType } from '../model/extract-nav.ts';
import type { DCRTagFrontType } from '../types/tagFront.ts';
import { AlreadyVisited } from './AlreadyVisited.importable.tsx';
import { AnimatePulsingDots } from './AnimatePulsingDots.importable.tsx';
import { FetchCommentCounts } from './FetchCommentCounts.importable.tsx';
import { FocusStyles } from './FocusStyles.importable.tsx';
import { Island } from './Island.tsx';
import { Metrics } from './Metrics.importable.tsx';
import { SetABTests } from './SetABTests.importable.tsx';
import { SetAdTargeting } from './SetAdTargeting.importable.tsx';
import { SkipTo } from './SkipTo.tsx';

type Props = {
	tagFront: DCRTagFrontType;
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
export const TagFrontPage = ({ tagFront, NAV }: Props) => {
	const adTargeting = buildAdTargeting({
		isAdFreeUser: tagFront.isAdFreeUser,
		isSensitive: tagFront.config.isSensitive,
		edition: tagFront.config.edition,
		section: tagFront.config.section,
		sharedAdTargeting: tagFront.config.sharedAdTargeting,
		adUnit: tagFront.config.adUnit,
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
			<Island clientOnly={true} deferUntil="idle">
				<AlreadyVisited />
			</Island>
			<Island clientOnly={true} deferUntil="idle">
				<AnimatePulsingDots />
			</Island>
			<Island clientOnly={true} deferUntil="idle">
				<FocusStyles />
			</Island>
			<Island clientOnly={true} deferUntil="idle">
				<Metrics
					commercialMetricsEnabled={
						!!tagFront.config.switches.commercialMetrics
					}
				/>
			</Island>
			<Island clientOnly={true} deferUntil="idle">
				<FetchCommentCounts repeat={true} />
			</Island>
			<Island clientOnly={true}>
				<SetABTests
					abTestSwitches={filterABTestSwitches(
						tagFront.config.switches,
					)}
					pageIsSensitive={tagFront.config.isSensitive}
					isDev={!!tagFront.config.isDev}
				/>
			</Island>
			<Island clientOnly={true}>
				<SetAdTargeting adTargeting={adTargeting} />
			</Island>
			<TagFrontLayout tagFront={tagFront} NAV={NAV} />
		</StrictMode>
	);
};
