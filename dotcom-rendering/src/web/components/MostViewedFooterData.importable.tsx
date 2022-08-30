import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source-foundations';
import { border, from } from '@guardian/source-foundations';
import { joinUrl } from '../../lib/joinUrl';
import type { Palette } from '../../types/palette';
import type {
	CAPITrailTabType,
	CAPITrailType,
	TrailTabType,
} from '../../types/trails';
import { abTestTest } from '../experiments/tests/ab-test-test';
import { decideTrail } from '../lib/decideTrail';
import { useAB } from '../lib/useAB';
import { useApi } from '../lib/useApi';
import { MostViewedFooterGrid } from './MostViewedFooterGrid';
import { MostViewedFooterSecondTierItem } from './MostViewedFooterSecondTierItem';

interface Props {
	sectionName?: string;
	palette: Palette;
	ajaxUrl: string;
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
	const endpoint = `/most-read${hasSection ? `/${sectionName}` : ''}.json`;
	return joinUrl([ajaxUrl, `${endpoint}?dcr=true`]);
}

function transformTabs(tabs: CAPITrailTabType[]): TrailTabType[] {
	return tabs.map((tab) => ({
		...tab,
		trails: tab.trails.map((trail) => decideTrail(trail)),
	}));
}

interface MostViewedFooterPayloadType {
	tabs: CAPITrailTabType[];
	mostCommented: CAPITrailType;
	mostShared: CAPITrailType;
}

export const MostViewedFooterData = ({
	sectionName,
	palette,
	ajaxUrl,
}: Props) => {
	// Example usage of AB Tests
	// Used in the Cypress tests as smoke test of the AB tests framework integration
	const ABTestAPI = useAB();

	const abTestCypressDataAttr =
		(ABTestAPI?.isUserInVariant('AbTestTest', 'control') &&
			'ab-test-control') ||
		(ABTestAPI?.isUserInVariant('AbTestTest', 'variant') &&
			'ab-test-variant') ||
		'ab-test-not-in-test';
	const runnableTest = ABTestAPI?.runnableTest(abTestTest);
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
							showRightBorder={true}
						/>
					)}
					{'mostShared' in data && (
						<MostViewedFooterSecondTierItem
							trail={decideTrail(data.mostShared)}
							title="Most shared"
						/>
					)}
				</div>
			</div>
		);
	}

	return null;
};
