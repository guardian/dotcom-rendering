import { joinUrl } from '@guardian/libs';
import { abTestTest } from '../experiments/tests/ab-test-test';
import { decidePalette } from '../lib/decidePalette';
import { decideTrail } from '../lib/decideTrail';
import type { EditionId } from '../lib/edition';
import { useAB } from '../lib/useAB';
import { useApi } from '../lib/useApi';
import type {
	FETrailTabType,
	FETrailType,
	TrailTabType,
} from '../types/trails';
import { MostViewedFooter } from './MostViewedFooter.importable';

interface Props {
	sectionId?: string;
	format: ArticleFormat;
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
		sectionId !== undefined && !sectionsWithoutPopular.includes(sectionId);
	const endpoint = `/most-read${
		hasSection ? `/${sectionId}` : ''
	}.json?_edition=${edition}`;
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
	mostCommented: FETrailType;
	mostShared: FETrailType;
}

export const MostViewedFooterData = ({
	sectionId,
	format,
	ajaxUrl,
	edition,
}: Props) => {
	const palette = decidePalette(format);
	// Example usage of AB Tests
	// Used in the Cypress tests as smoke test of the AB tests framework integration
	const ABTestAPI = useAB()?.api;

	const abTestCypressDataAttr =
		(ABTestAPI?.isUserInVariant('AbTestTest', 'control') &&
			'ab-test-control') ||
		(ABTestAPI?.isUserInVariant('AbTestTest', 'variant') &&
			'ab-test-variant') ||
		'ab-test-not-in-test';
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
				mostCommented={
					'mostCommented' in data
						? decideTrail(data.mostCommented)
						: undefined
				}
				mostShared={
					'mostShared' in data
						? decideTrail(data.mostShared)
						: undefined
				}
				abTestCypressDataAttr={abTestCypressDataAttr}
				variantFromRunnable={variantFromRunnable}
				sectionId={sectionId}
				selectedColour={palette.background.mostViewedTab}
			/>
		);
	}

	return null;
};
