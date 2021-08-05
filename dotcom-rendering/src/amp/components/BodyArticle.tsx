import React from 'react';
import { css } from '@emotion/react';

import { Design, Special } from '@guardian/types';
import { until } from '@guardian/src-foundations/mq';
import { text } from '@guardian/src-foundations/palette';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';

import { Elements } from '@root/src/amp/components/Elements';
import { ArticleModel } from '@root/src/amp/types/ArticleModel';
import { TopMeta } from '@root/src/amp/components/topMeta/TopMeta';
import { SubMeta } from '@root/src/amp/components/SubMeta';
import { pillarPalette_DO_NOT_USE } from '@root/src/lib/pillars';
import { Ad } from '@root/src/amp/components/Ad';
import { StickyAd } from '@root/src/amp/components/StickyAd';
import { findAdSlots } from '@root/src/amp/lib/find-adslots';
import { getSharingUrls } from '@root/src/lib/sharing-urls';
import { buildAdTargeting } from '@root/src/lib/ad-targeting';
import { Epic } from '@root/src/amp/components/Epic';
import { decideDesign } from '@root/src/web/lib/decideDesign';
import { decideTheme } from '@root/src/web/lib/decideTheme';

const innerContainerStyles = css`
	padding-left: 10px;
	padding-right: 10px;
`;

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
		background-color: ${pillarPalette_DO_NOT_USE[pillar].main};
		margin-left: 0px;
	}
`;

const decideBackground = (design: Design, pillar: Theme): string => {
	if (pillar === Special.Labs) return palette.neutral[86];
	switch (design) {
		case Design.Comment:
		case Design.Letter:
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
	background: ${palette.neutral[93]};
	border-top: 1px solid ${palette.neutral[86]};
	width: min-content;
	height: min-content;
	clear: both;
	text-align: center;
	margin: 4px 0 12px 20px;

	:before {
		content: 'Advertisement';
		display: block;
		${textSans.xxsmall()};
		/* Adverts specifcally don't use the GU font branding. */
		/* stylelint-disable-next-line property-blacklist */
		font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
			sans-serif;
		padding: 3px 10px;
		color: ${text.supporting};
		text-align: right;
	}

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

	const adConfig = {
		usePrebid: adInfo.switches.ampPrebid,
		usePermutive: adInfo.switches.permutive,
	};
	const elements = data.shouldHideAds ? (
		<>{elementsWithoutAds}</>
	) : (
		<>
			{elementsWithoutAds.map((item, i) => {
				if (slotIndexes.includes(i)) {
					return (
						<>
							{item}
							<div
								id={`ad-${i + 1}`}
								data-sort-time="1"
								css={adStyle}
							>
								<Ad
									adRegion="US"
									edition={data.editionId}
									section={data.sectionName || ''}
									contentType={adInfo.contentType}
									config={adConfig}
									commercialProperties={
										adInfo.commercialProperties
									}
								/>
								<Ad
									adRegion="AU"
									edition={data.editionId}
									section={data.sectionName || ''}
									contentType={adInfo.contentType}
									config={adConfig}
									commercialProperties={
										adInfo.commercialProperties
									}
								/>
								<Ad
									adRegion="ROW"
									edition={data.editionId}
									section={data.sectionName || ''}
									contentType={adInfo.contentType}
									config={adConfig}
									commercialProperties={
										adInfo.commercialProperties
									}
								/>
							</div>
						</>
					);
				}
				return item;
			})}
			<div
				id="clean-blocks"
				data-sort-time="1"
				css={css`
					clear: both;
				`}
			/>
		</>
	);

	const epic = data.shouldHideReaderRevenue ? null : (
		<Epic webURL={data.webURL} />
	);

	return (
		<div css={[body(pillar, design), innerContainerStyles]}>
			<TopMeta
				data={data}
				design={design}
				pillar={pillar}
				adTargeting={adTargeting}
			/>

			{elements}

			{epic}

			<StickyAd
				adRegion="US"
				edition={data.editionId}
				section={data.sectionName || ''}
				contentType={adInfo.contentType}
				config={adConfig}
				commercialProperties={adInfo.commercialProperties}
			/>

			<SubMeta
				sections={data.subMetaSectionLinks}
				keywords={data.subMetaKeywordLinks}
				pillar={pillar}
				sharingURLs={getSharingUrls(data.pageId, data.webTitle)}
				pageID={data.pageId}
				isCommentable={data.isCommentable}
				guardianBaseURL={data.guardianBaseURL}
			/>
		</div>
	);
};
