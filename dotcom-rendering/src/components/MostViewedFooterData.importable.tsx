import { joinUrl, log } from '@guardian/libs';
import { abTestTest } from '../experiments/tests/ab-test-test';
import { decideTrail } from '../lib/decideTrail';
import type { EditionId } from '../lib/edition';
import { useAB } from '../lib/useAB';
import { useApi } from '../lib/useApi';
import { palette } from '../palette';
import type { FETrailTabType, TrailTabType } from '../types/trails';
import { MostViewedFooter } from './MostViewedFooter.importable';
import { Placeholder } from './Placeholder';

interface Props {
	sectionId?: string;
	ajaxUrl: string;
	edition: EditionId;
}

function buildSectionUrl(
	ajaxUrl: string,
	edition: EditionId,
	sectionId?: string,
) {
	const sectionsWithoutPopular = ['info', 'global'];
	const hasSection =
		!!sectionId && !sectionsWithoutPopular.includes(sectionId);

	const endpoint = `/most-read${
		hasSection ? `/${sectionId}` : ''
	}.json?_edition=${edition}`;

	if (sectionId?.length === 0) {
		log(
			'dotcom',
			`DCR received empty section field. Falling back to getting most viewed data from endpoint: ${endpoint}&dcr=true`,
		);
	}

	return joinUrl(ajaxUrl, `${endpoint}&dcr=true`);
}

function transformTabs(tabs: FETrailTabType[]): TrailTabType[] {
	return tabs.map((tab) => ({
		...tab,
		trails: tab.trails.map((trail) => decideTrail(trail)),
	}));
}

interface MostViewedFooterPayloadType {
	tabs: FETrailTabType[];
}

export const MostViewedFooterData = ({
	sectionId,
	ajaxUrl,
	edition,
}: Props) => {
	// Example usage of AB Tests
	// Used in the Cypress tests as smoke test of the AB tests framework integration
	const ABTestAPI = useAB()?.api;

	let abTestCypressDataAttr = 'ab-test-not-in-test';

	if (ABTestAPI?.isUserInVariant('AbTestTest', 'control')) {
		abTestCypressDataAttr = 'ab-test-control';
	}

	if (ABTestAPI?.isUserInVariant('AbTestTest', 'variant')) {
		abTestCypressDataAttr = 'ab-test-variant';
	}

	const runnableTest = ABTestAPI?.runnableTest(abTestTest);
	const variantFromRunnable = runnableTest?.variantToRun.id ?? 'not-runnable';

	const url = buildSectionUrl(ajaxUrl, edition, sectionId);
	const { data, error } = useApi<
		MostViewedFooterPayloadType | FETrailTabType[]
	>(url);

	if (error) {
		window.guardian.modules.sentry.reportError(error, 'most-viewed-footer');
		return null;
	}

	if (data) {
		const tabs = 'tabs' in data ? data.tabs : data;
		return (
			<MostViewedFooter
				tabs={transformTabs(tabs)}
				abTestCypressDataAttr={abTestCypressDataAttr}
				variantFromRunnable={variantFromRunnable}
				sectionId={sectionId}
				selectedColour={palette('--most-viewed-tab-border')}
			/>
		);
	}

	return <Placeholder height={360} />;
};
