import { css } from '@emotion/react';
import {
	ArticleDesign as Design,
	ArticleSpecial as Special,
} from '@guardian/libs';
import {
	neutral,
	opinion,
	text,
	textSans,
	until,
} from '@guardian/source-foundations';
import React from 'react';
import { buildAdTargeting } from '../../lib/ad-targeting';
import { pillarPalette_DO_NOT_USE } from '../../lib/pillars';
import { getSharingUrls } from '../../lib/sharing-urls';
import { decideDesign } from '../../web/lib/decideDesign';
import { decideTheme } from '../../web/lib/decideTheme';
import { findAdSlots } from '../lib/find-adslots';
import type { ArticleModel } from '../types/ArticleModel';
import { Elements } from './Elements';
import { Epic } from './Epic';
import { RegionalAd } from './RegionalAd';
import { StickyAd } from './StickyAd';
import { SubMeta } from './SubMeta';
import { TopMeta } from './topMeta/TopMeta';

const innerContainerStyles = css`
	padding-left: 10px;
	padding-right: 10px;
`;

const bulletStyle = (pillar: ArticleTheme) => css`
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

const decideBackground = (design: Design, pillar: ArticleTheme): string => {
	if (pillar === Special.Labs) return neutral[86];
	switch (design) {
		case Design.Comment:
		case Design.Letter:
			return opinion[800];
		default:
			return neutral[100];
	}
};

const body = (pillar: ArticleTheme, design: Design) => {
	return css`
		background-color: ${decideBackground(design, pillar)};
		${bulletStyle(pillar)}
	`;
};

const adStyle = css`
	float: right;
	background: ${neutral[93]};
	border-top: 1px solid ${neutral[86]};
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
		/* stylelint-disable-next-line property-disallowed-list */
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
	const adTargeting: AdTargeting = buildAdTargeting({
		isAdFreeUser: data.isAdFreeUser,
		isSensitive: config.isSensitive,
		videoDuration: config.videoDuration,
		edition: config.edition,
		section: config.section,
		sharedAdTargeting: config.sharedAdTargeting,
		adUnit: config.adUnit,
	});
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
			ampAmazon: config.switches.ampAmazon,
		},
	};

	const adConfig = {
		usePrebid: adInfo.switches.ampPrebid,
		usePermutive: adInfo.switches.permutive,
		useAmazon: adInfo.switches.ampAmazon,
	};
	const elements = data.shouldHideAds ? (
		<>{elementsWithoutAds}</>
	) : (
		<>
			{elementsWithoutAds.map((item, i) => {
				if (slotIndexes.includes(i)) {
					return (
						<React.Fragment key={item.key}>
							{item}
							<div
								id={`ad-${i + 1}`}
								data-sort-time="1"
								css={adStyle}
							>
								<RegionalAd
									editionId={data.editionId}
									section={data.sectionName || ''}
									contentType={adInfo.contentType}
									config={adConfig}
									commercialProperties={
										adInfo.commercialProperties
									}
									adTargeting={adTargeting}
								/>
							</div>
						</React.Fragment>
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
				editionId={data.editionId}
				section={data.sectionName || ''}
				contentType={adInfo.contentType}
				config={adConfig}
				commercialProperties={adInfo.commercialProperties}
				adTargeting={adTargeting}
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
