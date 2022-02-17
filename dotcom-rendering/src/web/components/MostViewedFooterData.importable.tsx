import { css } from '@emotion/react';

import { border, from, Breakpoint } from '@guardian/source-foundations';

import { useAB } from '@guardian/ab-react';
import { useApi } from '../lib/useApi';
import { joinUrl } from '../../lib/joinUrl';
import { decideTrail } from '../lib/decideTrail';

import { MostViewedFooterGrid } from './MostViewedFooterGrid';
import { MostViewedFooterSecondTierItem } from './MostViewedFooterSecondTierItem';
import { abTestTest } from '../experiments/tests/ab-test-test';
import { WithABProvider } from './WithABProvider';

interface WithABProps {
	sectionName?: string;
	palette: Palette;
	ajaxUrl: string;
}

interface Props extends WithABProps {
	switches: Switches;
	pageIsSensitive: boolean;
	isDev?: boolean;
}

const stackBelow = (breakpoint: Breakpoint) => css`
	display: flex;
	flex-direction: column;

	${from[breakpoint]} {
		flex-direction: row;
	}
`;

const secondTierStyles = css`
	border-left: 1px solid ${border.secondary};
	border-right: 1px solid ${border.secondary};

	${from.tablet} {
		padding-top: 24px;
	}
`;

function buildSectionUrl(ajaxUrl: string, sectionName?: string) {
	const sectionsWithoutPopular = ['info', 'global'];
	const hasSection =
		sectionName && !sectionsWithoutPopular.includes(sectionName);
	const endpoint: string = `/most-read${
		hasSection ? `/${sectionName}` : ''
	}.json`;
	return joinUrl([ajaxUrl, `${endpoint}?dcr=true`]);
}

function transformTabs(tabs: CAPITrailTabType[]): TrailTabType[] {
	return tabs.map((tab) => ({
		...tab,
		trails: tab.trails.map((trail) => decideTrail(trail)),
	}));
}

const MostViewedFooterDataWithAB = ({
	sectionName,
	palette,
	ajaxUrl,
}: WithABProps) => {
	// Example usage of AB Tests
	// Used in the Cypress tests as smoke test of the AB tests framework integration
	const ABTestAPI = useAB();
	const abTestCypressDataAttr =
		(ABTestAPI.isUserInVariant('AbTestTest', 'control') &&
			'ab-test-control') ||
		(ABTestAPI.isUserInVariant('AbTestTest', 'variant') &&
			'ab-test-variant') ||
		'ab-test-not-in-test';
	const runnableTest = ABTestAPI.runnableTest(abTestTest);
	const variantFromRunnable =
		(runnableTest && runnableTest.variantToRun.id) || 'not-runnable';

	const url = buildSectionUrl(ajaxUrl, sectionName);
	const { data, error } = useApi<
		MostViewedFooterPayloadType | CAPITrailTabType[]
	>(url);

	if (error) {
		window.guardian.modules.sentry.reportError(error, 'most-viewed-footer');
		return null;
	}

	if (data) {
		const tabs = 'tabs' in data ? data.tabs : data;
		return (
			<div
				css={css`
					width: 100%;
				`}
				data-cy="mostviewed-footer"
				data-cy-ab-user-in-variant={abTestCypressDataAttr}
				data-cy-ab-runnable-test={variantFromRunnable}
			>
				<MostViewedFooterGrid
					data={transformTabs(tabs)}
					sectionName={sectionName}
					palette={palette}
				/>
				<div css={[stackBelow('tablet'), secondTierStyles]}>
					{'mostCommented' in data && (
						<MostViewedFooterSecondTierItem
							trail={decideTrail(data.mostCommented)}
							title="Most commented"
							dataLinkName="comment | group-0 | card-@1" // To match Frontend
							showRightBorder={true}
						/>
					)}
					{'mostShared' in data && (
						<MostViewedFooterSecondTierItem
							trail={decideTrail(data.mostShared)}
							dataLinkName="news | group-0 | card-@1" // To match Frontend
							title="Most shared"
						/>
					)}
				</div>
			</div>
		);
	}

	return null;
};

export const MostViewedFooterData = ({
	sectionName,
	palette,
	ajaxUrl,
	switches,
	pageIsSensitive,
	isDev,
}: Props) => (
	<WithABProvider
		abTestSwitches={switches}
		pageIsSensitive={pageIsSensitive}
		isDev={!!isDev}
	>
		<MostViewedFooterDataWithAB
			sectionName={sectionName}
			palette={palette}
			ajaxUrl={ajaxUrl}
		/>
	</WithABProvider>
);
