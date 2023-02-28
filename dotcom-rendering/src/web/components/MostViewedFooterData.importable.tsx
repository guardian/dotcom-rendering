import { joinUrl } from '@guardian/libs';
import type {
	FETrailTabType,
	FETrailType,
	TrailTabType,
} from '../../types/trails';
import { abTestTest } from '../experiments/tests/ab-test-test';
import { decidePalette } from '../lib/decidePalette';
import { decideTrail } from '../lib/decideTrail';
import type { EditionId } from '../lib/edition';
import { useAB } from '../lib/useAB';
import { useApi } from '../lib/useApi';
import { MostViewedFooter } from './MostViewedFooter.importable';

interface Props {
	sectionName?: string;
	format: ArticleFormat;
	ajaxUrl: string;
	edition: EditionId;
}

function buildSectionUrl(
	ajaxUrl: string,
	sectionName?: string,
	edition?: EditionId,
) {
	const sectionsWithoutPopular = ['info', 'global'];
	const hasSection =
		sectionName !== undefined &&
		!sectionsWithoutPopular.includes(sectionName);
	const hasEdition = edition && `/${edition.toLowerCase()}`;
	const endpoint = `/most-read${hasEdition ? hasEdition : ''}${
		hasSection ? `/${sectionName}` : ''
	}.json`;
	return joinUrl(ajaxUrl, `${endpoint}?dcr=true`);
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
	sectionName,
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

	const editionUrl = buildSectionUrl(ajaxUrl, edition);
	const editionResponse = useApi<
		MostViewedFooterPayloadType | FETrailTabType[]
	>(editionUrl);

	const sectionUrl = buildSectionUrl(ajaxUrl, sectionName);
	const sectionResponse = useApi<
		MostViewedFooterPayloadType | FETrailTabType[]
	>(sectionUrl);

	if (sectionResponse.error) {
		window.guardian.modules.sentry.reportError(
			sectionResponse.error,
			'most-viewed-footer',
		);
		return null;
	}

	if (editionResponse.error) {
		window.guardian.modules.sentry.reportError(
			editionResponse.error,
			'most-viewed-footer',
		);
		return null;
	}

	if (editionResponse.data && sectionResponse.data) {
		const editionTabs =
			'tabs' in editionResponse.data
				? editionResponse.data.tabs
				: editionResponse.data;
		const sectionTabs =
			'tabs' in sectionResponse.data
				? sectionResponse.data.tabs
				: sectionResponse.data;
		const tabs =
			editionTabs[0] !== undefined && sectionTabs[1] !== undefined
				? [editionTabs[0], sectionTabs[1]]
				: sectionTabs;
		return (
			<MostViewedFooter
				tabs={transformTabs(tabs)}
				mostCommented={
					'mostCommented' in editionResponse.data
						? decideTrail(editionResponse.data.mostCommented)
						: undefined
				}
				mostShared={
					'mostShared' in editionResponse.data
						? decideTrail(editionResponse.data.mostShared)
						: undefined
				}
				abTestCypressDataAttr={abTestCypressDataAttr}
				variantFromRunnable={variantFromRunnable}
				sectionName={sectionName}
				selectedColour={palette.background.mostViewedTab}
			/>
		);
	}
	return null;
};
