import { joinUrl } from '../../lib/joinUrl';
import type { Palette } from '../../types/palette';
import type { CAPITrailTabType, CAPITrailType } from '../../types/trails';
import { abTestTest } from '../experiments/tests/ab-test-test';
import { useAB } from '../lib/useAB';
import { useApi } from '../lib/useApi';
import { MostViewedFooter } from './MostViewedFooter';

interface Props {
	sectionName?: string;
	palette: Palette;
	ajaxUrl: string;
}

function buildSectionUrl(ajaxUrl: string, sectionName?: string) {
	const sectionsWithoutPopular = ['info', 'global'];
	const hasSection =
		sectionName && !sectionsWithoutPopular.includes(sectionName);
	const endpoint = `/most-read${hasSection ? `/${sectionName}` : ''}.json`;
	return joinUrl([ajaxUrl, `${endpoint}?dcr=true`]);
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
	const variantFromRunnable = runnableTest?.variantToRun.id || 'not-runnable';

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
			<MostViewedFooter
				tabs={tabs}
				mostCommented={
					'mostCommented' in data ? data.mostCommented : undefined
				}
				mostShared={'mostShared' in data ? data.mostShared : undefined}
				abTestCypressDataAttr={abTestCypressDataAttr}
				variantFromRunnable={variantFromRunnable}
				sectionName={sectionName}
				palette={palette}
			/>
		);
	}

	return null;
};
