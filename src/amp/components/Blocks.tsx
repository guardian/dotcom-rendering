import React from 'react';
import { css } from '@emotion/react';

import { text } from '@guardian/src-foundations/palette';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';

import { Elements } from '@root/src/amp/components/Elements';
import { pillarPalette_DO_NOT_USE } from '@root/src/lib/pillars';
import { blockLink } from '@root/src/amp/lib/block-link';
import { findBlockAdSlots } from '@root/src/amp/lib/find-adslots';
import { Ad } from '@root/src/amp/components/Ad';

const adStyle = css`
	background: ${palette.neutral[93]};
	border-top: 1px solid ${palette.neutral[86]};
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
		/* stylelint-disable-next-line property-blacklist */
		font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
			sans-serif;
		padding: 3px 10px;
		color: ${text.supporting};
		text-align: right;
	}
`;

const blockStyle = (pillar: Theme) => css`
	padding: 6px 10px 12px;
	background-color: ${palette.neutral[100]};
	border-top: 1px solid ${pillarPalette_DO_NOT_USE[pillar].dark};
	border-bottom: 1px solid ${palette.neutral[93]};
	margin-bottom: 12px;
`;

const firstPublishedStyle = css`
	color: ${palette.neutral[7]};
	margin-bottom: 10px;
	text-decoration: none;
	font-weight: bold;
	${textSans.xxsmall()};
`;

const lastUpdatedStyle = css`
	${textSans.xxsmall()};
	color: ${palette.neutral[60]};
	text-align: right;
	padding-right: 15px;
`;

const clearBoth = css`
	clear: both;
`;

// TODO ad handling (currently done in elements, which is wrong, so let's lift
// that out and have an Ad element type we match against
export const Blocks: React.FunctionComponent<{
	blocks: Block[];
	pillar: Theme;
	edition: Edition;
	section?: string;
	contentType: string;
	switches: Switches;
	commercialProperties: CommercialProperties;
	url: string;
	shouldHideAds: boolean;
}> = ({
	blocks,
	pillar,
	edition,
	section,
	contentType,
	switches,
	commercialProperties,
	url,
	shouldHideAds,
}) => {
	// TODO add last updated for blocks to show here
	const liveBlogBlocks = blocks.map((block) => {
		return (
			<div
				id={block.id}
				data-sort-time={block.blockFirstPublished}
				key={block.id}
				css={blockStyle(pillar)}
			>
				{block.blockFirstPublishedDisplay && (
					<a
						css={firstPublishedStyle}
						href={blockLink(url, block.id)}
					>
						{block.blockFirstPublishedDisplay}
					</a>
				)}
				{block.title && <h2>{block.title}</h2>}
				{Elements(block.elements, pillar, false)}
				{/* Some elements float (e.g. rich links) */}
				<div css={clearBoth} />{' '}
				{block.blockLastUpdatedDisplay && (
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

	const slotIndexes = findBlockAdSlots(liveBlogBlocks);
	const adInfo = {
		section,
		edition,
		contentType,
		commercialProperties,
		switches: {
			ampPrebid: switches.ampPrebid,
			permutive: switches.permutive,
		},
	};

	const adConfig = {
		usePrebid: adInfo.switches.ampPrebid,
		usePermutive: adInfo.switches.permutive,
	};
	return (
		<>
			{liveBlogBlocks.map((item, i) => {
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
									edition={edition}
									section={section || ''}
									contentType={contentType}
									config={adConfig}
									commercialProperties={commercialProperties}
								/>
								<Ad
									adRegion="AU"
									edition={edition}
									section={section || ''}
									contentType={contentType}
									config={adConfig}
									commercialProperties={commercialProperties}
								/>
								<Ad
									adRegion="ROW"
									edition={edition}
									section={section || ''}
									contentType={contentType}
									config={adConfig}
									commercialProperties={commercialProperties}
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
