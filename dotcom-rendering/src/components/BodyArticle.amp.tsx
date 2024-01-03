import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDesign as Design,
	ArticleSpecial as Special,
} from '@guardian/libs';
import {
	neutral,
	opinion,
	palette,
	text,
	textSans,
	until,
} from '@guardian/source-foundations';
import React from 'react';
import { buildAdTargeting } from '../lib/ad-targeting';
import { decideDesign } from '../lib/decideDesign';
import { decideTheme } from '../lib/decideTheme';
import { findAdSlots } from '../lib/find-adslots.amp';
import { pillarPalette_DO_NOT_USE } from '../lib/pillars';
import { getSharingUrls } from '../lib/sharing-urls';
import type { AMPArticleModel } from '../types/article.amp';
import type { ConfigType } from '../types/config';
import { Elements } from './Elements.amp';
import { Epic } from './Epic.amp';
import { InlineAd } from './InlineAd.amp';
import { StickyAd } from './StickyAd.amp';
import { SubMeta } from './SubMeta.amp';
import { TextBlockComponent } from './TextBlockComponent.amp';
import { TopMeta } from './TopMeta.amp';

const getNewsletterSignupDefaultHTML = (webURL: string): string =>
	`<p><strong>No sign-up button?</strong> Users viewing this page via Google Amp may experience a technical fault. <a href="${webURL}">Please click here to reload the page on theguardian.com</a> which should correct the problem.</p>`;

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
	if (pillar === Special.Labs) return palette.neutral[86];
	switch (design) {
		case Design.Comment:
		case Design.Letter:
			return palette.opinion[800];
		default:
			return palette.neutral[100];
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

type Props = {
	data: AMPArticleModel;
	config: ConfigType;
};

export const Body = ({ data, config }: Props) => {
	const bodyElements = data.blocks[0] ? data.blocks[0].elements : [];
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
		bodyElements,
		pillar,
		data.isImmersive,
		adTargeting,
	);
	const insertSlotsAfter = findAdSlots(bodyElements);
	const adInfo = {
		adUnit: config.adUnit,
		section: data.sectionName,
		edition: data.editionId,
		contentType: data.contentType,
		commercialProperties: data.commercialProperties,
		switches: {
			ampPrebidPubmatic: !!config.switches.ampPrebidPubmatic,
			ampPrebidCriteo: !!config.switches.ampPrebidCriteo,
			ampPrebidOzone: !!config.switches.ampPrebidOzone,
			permutive: !!config.switches.permutive,
			ampAmazon: !!config.switches.ampAmazon,
		},
	};

	const adConfig = {
		usePubmaticPrebid: adInfo.switches.ampPrebidPubmatic,
		useCriteoPrebid: adInfo.switches.ampPrebidCriteo,
		useOzonePrebid: adInfo.switches.ampPrebidOzone,
		usePermutive: adInfo.switches.permutive,
		useAmazon: adInfo.switches.ampAmazon,
	};
	const elements = data.shouldHideAds ? (
		<>{elementsWithoutAds}</>
	) : (
		<>
			{elementsWithoutAds.map((item, elementIndex) => {
				if (insertSlotsAfter.includes(elementIndex)) {
					// Ad slot ids take the form: `ad-1`, `ad-2`, `ad-3`, ...
					// Looking up the element index in the array of ad insertion points
					// gives us the slot indexes
					const slotIndex = insertSlotsAfter.indexOf(elementIndex);
					const adSlotId = `ad-${slotIndex + 1}` as const;
					return (
						<React.Fragment key={item.key}>
							{item}
							<div id={adSlotId} data-sort-time="1" css={adStyle}>
								<InlineAd
									id={adSlotId}
									editionId={data.editionId}
									section={data.sectionName ?? ''}
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

	const epic =
		data.shouldHideReaderRevenue ||
		data.tags.some(
			(tag) => tag.id === 'us-news/series/cotton-capital',
		) ? null : (
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

			{
				/** For newsletter sign up articles, replace body with link straight back to web URL */
				design === ArticleDesign.NewsletterSignup ? (
					<TextBlockComponent
						html={getNewsletterSignupDefaultHTML(data.webURL)}
						pillar={pillar}
					/>
				) : (
					elements
				)
			}

			{epic}

			<StickyAd
				id="ad-sticky"
				editionId={data.editionId}
				section={data.sectionName ?? ''}
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
