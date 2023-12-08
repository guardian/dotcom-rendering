import { css, Global } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import {
	focusHalo,
	palette as sourcePalette,
} from '@guardian/source-foundations';
import { StrictMode } from 'react';
import { TagFrontLayout } from '../layouts/TagFrontLayout';
import { buildAdTargeting } from '../lib/ad-targeting';
import { filterABTestSwitches } from '../model/enhance-switches';
import type { NavType } from '../model/extract-nav';
import { paletteDeclarations } from '../palette';
import type { DCRTagFrontType } from '../types/tagFront';
import { FocusStyles } from './FocusStyles.importable';
import { Island } from './Island';
import { Metrics } from './Metrics.importable';
import { SetABTests } from './SetABTests.importable';
import { SetAdTargeting } from './SetAdTargeting.importable';
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
	const adTargeting = buildAdTargeting({
		isAdFreeUser: tagFront.isAdFreeUser,
		isSensitive: tagFront.config.isSensitive,
		edition: tagFront.config.edition,
		section: tagFront.config.section,
		sharedAdTargeting: tagFront.config.sharedAdTargeting,
		adUnit: tagFront.config.adUnit,
	});

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
						!!tagFront.config.switches.commercialMetrics
					}
					tests={tagFront.config.abTests}
				/>
			</Island>
			<Island priority="critical">
				<SetABTests
					abTestSwitches={filterABTestSwitches(
						tagFront.config.switches,
					)}
					pageIsSensitive={tagFront.config.isSensitive}
					isDev={!!tagFront.config.isDev}
				/>
			</Island>
			<Island priority="critical">
				<SetAdTargeting adTargeting={adTargeting} />
			</Island>
			<TagFrontLayout tagFront={tagFront} NAV={NAV} />
		</StrictMode>
	);
};
