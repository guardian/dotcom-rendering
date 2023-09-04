import { css } from '@emotion/react';
import { neutral, text, textSans } from '@guardian/source-foundations';
import { blockLink } from '../lib/block-link.amp';
import type { EditionId } from '../lib/edition';
import { findBlockAdSlots } from '../lib/find-adslots.amp';
import { pillarPalette_DO_NOT_USE } from '../lib/pillars';
import type { CommercialProperties } from '../types/commercial';
import type { Switches } from '../types/config';
import { Elements } from './Elements.amp';
import { InlineAd } from './InlineAd.amp';

const adStyle = css`
	background: ${neutral[93]};
	border-top: 1px solid ${neutral[86]};
	width: min-content;
	height: min-content;
	clear: both;
	text-align: center;
	margin: 0 auto 12px;

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
`;

const blockStyle = (pillar: ArticleTheme) => css`
	padding: 6px 10px 12px;
	background-color: ${neutral[100]};
	border-top: 1px solid ${pillarPalette_DO_NOT_USE[pillar].dark};
	border-bottom: 1px solid ${neutral[93]};
	margin-bottom: 12px;
`;

const firstPublishedStyle = css`
	color: ${neutral[7]};
	margin-bottom: 10px;
	text-decoration: none;
	font-weight: bold;
	${textSans.xxsmall()};
`;

const lastUpdatedStyle = css`
	${textSans.xxsmall()};
	color: ${neutral[60]};
	text-align: right;
	padding-right: 15px;
`;

const clearBoth = css`
	clear: both;
`;

type Props = {
	blocks: Block[];
	pillar: ArticleTheme;
	editionId: EditionId;
	section?: string;
	contentType: string;
	switches: Switches;
	commercialProperties: CommercialProperties;
	url: string;
	shouldHideAds: boolean;
	adTargeting: AdTargeting;
	pageId: string;
};

// TODO ad handling (currently done in elements, which is wrong, so let's lift
// that out and have an Ad element type we match against
export const Blocks = ({
	blocks,
	pillar,
	editionId,
	section,
	contentType,
	switches,
	commercialProperties,
	url,
	shouldHideAds,
	adTargeting,
	pageId,
}: Props) => {
	// TODO add last updated for blocks to show here
	const liveBlogBlocks = blocks.map((block) => {
		return (
			<div
				id={block.id}
				data-sort-time={block.blockFirstPublished}
				key={block.id}
				css={blockStyle(pillar)}
			>
				{!!block.blockFirstPublishedDisplay && (
					<a
						css={firstPublishedStyle}
						href={blockLink(url, block.id)}
					>
						{block.blockFirstPublishedDisplay}
					</a>
				)}
				{!!block.title && <h2>{block.title}</h2>}
				{Elements(block.elements, pillar, false)}
				{/* Some elements float (e.g. rich links) */}
				<div css={clearBoth} />{' '}
				{!!block.blockLastUpdatedDisplay && (
					<div css={lastUpdatedStyle}>
						Updated at {block.blockLastUpdatedDisplay}
					</div>
				)}
			</div>
		);
	});

	if (shouldHideAds) {
		return <>{liveBlogBlocks}</>;
	}

	const insertSlotsAfter = findBlockAdSlots(liveBlogBlocks);
	const adInfo = {
		section,
		editionId,
		contentType,
		commercialProperties,
		switches: {
			ampPrebidPubmatic: !!switches.ampPrebidPubmatic,
			ampPrebidCriteo: !!switches.ampPrebidCriteo,
			ampPrebidOzone: !!switches.ampPrebidOzone,
			permutive: !!switches.permutive,
			ampAmazon: !!switches.ampAmazon,
		},
	};

	const adConfig = {
		usePubmaticPrebid: adInfo.switches.ampPrebidPubmatic,
		useCriteoPrebid: adInfo.switches.ampPrebidCriteo,
		useOzonePrebid: adInfo.switches.ampPrebidOzone,
		usePermutive: adInfo.switches.permutive,
		useAmazon: adInfo.switches.ampAmazon,
	};
	return (
		<>
			{liveBlogBlocks.map((item, blockIndex) => {
				if (insertSlotsAfter.includes(blockIndex)) {
					const slotIndex = insertSlotsAfter.indexOf(blockIndex);
					const adSlotId = `ad-${slotIndex + 1}` as const;
					return (
						<>
							{item}
							<div id={adSlotId} data-sort-time="1" css={adStyle}>
								<InlineAd
									id={adSlotId}
									editionId={editionId}
									section={section ?? ''}
									contentType={contentType}
									config={adConfig}
									commercialProperties={commercialProperties}
									adTargeting={adTargeting}
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
};
