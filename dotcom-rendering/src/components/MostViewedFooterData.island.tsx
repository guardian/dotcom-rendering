import { joinUrl, log } from '@guardian/libs';
import { decideTrail } from '../lib/decideTrail';
import type { EditionId } from '../lib/edition';
import { useApi } from '../lib/useApi';
import { palette } from '../palette';
import type { FETrailTabType, TrailTabType } from '../types/trails';
import { MostViewedFooter } from './MostViewedFooter.island';
import { MostViewedFooterPlaceholder } from './MostViewedFooterPlaceholder';

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
	const url = buildSectionUrl(ajaxUrl, edition, sectionId);
	const { data, loading, error } = useApi<
		MostViewedFooterPayloadType | FETrailTabType[]
	>(url);

	if (error) {
		window.guardian.modules.sentry.reportError(error, 'most-viewed-footer');
		return null;
	}

	if (loading) {
		return <MostViewedFooterPlaceholder />;
	}

	if (data) {
		const tabs = 'tabs' in data ? data.tabs : data;
		return (
			<MostViewedFooter
				tabs={transformTabs(tabs)}
				sectionId={sectionId}
				selectedColour={palette('--most-viewed-tab-border')}
			/>
		);
	}

	return null;
};
