import React from 'react';
import { css } from 'emotion';

import { Design, Special } from '@guardian/types';

import { InnerContainer } from '@root/src/amp/components/InnerContainer';
import { Elements } from '@root/src/amp/components/Elements';
import { ArticleModel } from '@root/src/amp/types/ArticleModel';
import { TopMeta } from '@root/src/amp/components/topMeta/TopMeta';
import { SubMeta } from '@root/src/amp/components/SubMeta';
import { pillarPalette } from '@root/src/lib/pillars';
import { palette } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';
import { WithAds } from '@root/src/amp/components/WithAds';
import { findAdSlots } from '@root/src/amp/lib/find-adslots';
import { getSharingUrls } from '@root/src/lib/sharing-urls';
import { buildAdTargeting } from '@root/src/lib/ad-targeting';
import { Epic } from '@root/src/amp/components/Epic';
import { decideDesign } from 'src/web/lib/decideDesign';
import { decideTheme } from 'src/web/lib/decideTheme';

const bulletStyle = (pillar: Theme) => css`
	.bullet {
		color: transparent;
		font-size: 1px;
	}

	.bullet:before {
		display: inline-block;
		content: '';
		border-radius: 6px;
		height: 12px;
		width: 12px;
		margin-right: 2px;
		background-color: ${pillarPalette[pillar].main};
		margin-left: 0px;
	}
`;

const decideBackground = (design: Design, pillar: Theme): string => {
	if (pillar === Special.Labs) return palette.neutral[86];
	switch (design) {
		case Design.Comment:
			return palette.opinion[800];
		default:
			return palette.neutral[100];
	}
};

const body = (pillar: Pillar, design: Design) => {
	return css`
		background-color: ${decideBackground(design, pillar)};
		${bulletStyle(pillar)}
	`;
};

const adStyle = css`
	float: right;
	margin: 4px 0 12px 20px;

	${until.phablet} {
		float: none;
		margin: 0 auto 12px;
	}
`;

export const Body: React.FC<{
	data: ArticleModel;
	config: ConfigType;
}> = ({ data, config }) => {
	const capiElements = data.blocks[0] ? data.blocks[0].elements : [];
	const adTargeting = buildAdTargeting(config);
	const design = decideDesign(data.format);
	const pillar = decideTheme(data.format);
	const elementsWithoutAds = Elements(
		capiElements,
		pillar,
		data.isImmersive,
		adTargeting,
	);
	const slotIndexes = findAdSlots(capiElements);
	const adInfo = {
		adUnit: config.adUnit,
		section: data.sectionName,
		edition: data.editionId,
		contentType: data.contentType,
		commercialProperties: data.commercialProperties,
		switches: {
			ampPrebid: config.switches.ampPrebid,
			permutive: config.switches.permutive,
		},
	};

	const elements = data.shouldHideAds ? (
		<>{elementsWithoutAds}</>
	) : (
		<WithAds
			items={elementsWithoutAds}
			adSlots={slotIndexes}
			adClassName={adStyle}
			adInfo={adInfo}
		/>
	);

	const epic = data.shouldHideReaderRevenue ? null : (
		<Epic webURL={data.webURL} />
	);

	return (
		<InnerContainer className={body(pillar, design)}>
			<TopMeta
				data={data}
				design={design}
				pillar={pillar}
				adTargeting={adTargeting}
			/>

			{elements}

			{epic}

			<SubMeta
				sections={data.subMetaSectionLinks}
				keywords={data.subMetaKeywordLinks}
				pillar={pillar}
				sharingURLs={getSharingUrls(data.pageId, data.webTitle)}
				pageID={data.pageId}
				isCommentable={data.isCommentable}
				guardianBaseURL={data.guardianBaseURL}
			/>
		</InnerContainer>
	);
};
