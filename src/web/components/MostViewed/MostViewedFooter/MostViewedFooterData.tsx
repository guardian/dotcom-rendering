import React from 'react';
import { css, cx } from 'emotion';

import { border } from '@guardian/src-foundations/palette';
import { from, Breakpoint } from '@guardian/src-foundations/mq';

import { useApi } from '@root/src/web/lib/api';
import { joinUrl } from '@root/src/web/lib/joinUrl';
import { useAB } from '@guardian/ab-react';
import { decidePillar } from '@root/src/web/lib/decidePillar';
import { MostViewedFooterGrid } from './MostViewedFooterGrid';
import { SecondTierItem } from './SecondTierItem';

type Props = {
	sectionName?: string;
	pillar: CAPIPillar;
	ajaxUrl: string;
	design: DesignType;
};

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

function buildSectionUrl(
	ajaxUrl: string,
	pillar: CAPIPillar,
	sectionName?: string,
) {
	const sectionsWithoutPopular = ['info', 'global'];
	const hasSection =
		sectionName && !sectionsWithoutPopular.includes(sectionName);
	const endpoint: string = `/most-read${
		hasSection ? `/${sectionName}` : ''
	}.json`;
	return joinUrl([ajaxUrl, `${endpoint}?dcr=true`]);
}

function buildDeeplyReadUrl(ajaxUrl: string) {
	return joinUrl([ajaxUrl, 'most-read-deeply-read', `.json`]);
}

export const MostViewedFooterData = ({
	sectionName,
	pillar,
	ajaxUrl,
	design,
}: Props) => {
	const ABTestAPI = useAB();

	const inDeeplyReadTestVariant = ABTestAPI.isUserInVariant(
		'DeeplyReadTest',
		'variant',
	);

	const url = inDeeplyReadTestVariant
		? buildDeeplyReadUrl(ajaxUrl)
		: buildSectionUrl(ajaxUrl, pillar, sectionName);
	const { data, error } = useApi<
		MostViewedFooterPayloadType | TrailTabType[]
	>(url);

	if (error) {
		window.guardian.modules.sentry.reportError(error, 'most-viewed-footer');
		return null;
	}

	if (data) {
		return (
			<div
				className={css`
					width: 100%;
				`}
			>
				<MostViewedFooterGrid
					data={'tabs' in data ? data.tabs : data}
					sectionName={sectionName}
					pillar={decidePillar({ pillar, design })}
				/>
				<div className={cx(stackBelow('tablet'), secondTierStyles)}>
					{'mostCommented' in data && (
						<SecondTierItem
							trail={data.mostCommented}
							title="Most commented"
							dataLinkName="comment | group-0 | card-@1" // To match Frontend
							showRightBorder={true}
						/>
					)}
					{'mostShared' in data && (
						<SecondTierItem
							trail={data.mostShared}
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
