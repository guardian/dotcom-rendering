import { css, Global } from '@emotion/react';
import { brandAlt, focusHalo, neutral } from '@guardian/source-foundations';
import { StrictMode } from 'react';
import { TagFrontLayout } from '../layouts/TagFrontLayout';
import { filterABTestSwitches } from '../model/enhance-switches';
import type { NavType } from '../model/extract-nav';
import type { DCRTagFrontType } from '../types/tagFront';
import { AlreadyVisited } from './AlreadyVisited.importable';
import { AnimatePulsingDots } from './AnimatePulsingDots.importable';
import { FetchCommentCounts } from './FetchCommentCounts.importable';
import { FocusStyles } from './FocusStyles.importable';
import { Island } from './Island';
import { Metrics } from './Metrics.importable';
import { SetABTests } from './SetABTests.importable';
import { ShowHideContainers } from './ShowHideContainers.importable';
import { SkipTo } from './SkipTo';

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
				<ShowHideContainers />
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
			<TagFrontLayout tagFront={tagFront} NAV={NAV} />
		</StrictMode>
	);
};
