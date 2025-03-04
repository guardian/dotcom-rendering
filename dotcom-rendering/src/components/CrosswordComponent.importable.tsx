import { css } from '@emotion/react';
import { Crossword as ReactCrossword } from '@guardian/react-crossword-next';
import type { CrosswordProps } from '@guardian/react-crossword-next';
import {
	between,
	from,
	headlineBold17,
	space,
	textSans14,
	textSansItalic12,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import type { ReactNode } from 'react';
import { memo } from 'react';
import { removeMediaRulePrefix, useMatchMedia } from '../lib/useMatchMedia';
import { palette } from '../palette';
import { AdSlot } from './AdSlot.web';

const CluesHeader = memo(({ children }: { children: ReactNode }) => {
	return (
		<div
			css={css`
				${headlineBold17};
				border-top: 1px solid
					${palette('--crossword-clues-header-border-top')};
				border-bottom: 1px dotted
					${palette('--crossword-clues-header-border-bottom')};
				height: 2em;
				margin-bottom: 0.5em;
				text-transform: capitalize;
			`}
		>
			{children}
		</div>
	);
});

const MobileBannerAdComponent = () => {
	return (
		<Hide from="phablet">
			<AdSlot position="crossword-banner-mobile" />
		</Hide>
	);
};

const Layout: CrosswordProps['Layout'] = ({
	Grid,
	Clues,
	Controls,
	SavedMessage,
	AnagramHelper,
	FocusedClue,
	gridWidth,
	MobileBannerAd,
}) => {
	const betweenTabletAndLeftCol = useMatchMedia(
		removeMediaRulePrefix(between.tablet.and.leftCol),
	);

	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				gap: ${space[4]}px;
				${from.tablet} {
					flex-direction: row;
				}
			`}
		>
			<AnagramHelper />
			<div
				css={css`
					flex-basis: ${gridWidth}px;
				`}
			>
				<FocusedClue
					additionalCss={css`
						max-width: ${gridWidth}px;
						${from.tablet} {
							display: none;
						}
					`}
				/>
				<Grid />
				<div
					data-print-layout="hide"
					css={css`
						max-width: ${gridWidth}px;
					`}
				>
					<FocusedClue
						additionalCss={css`
							${from.tablet} {
								display: none;
							}
						`}
					/>
					{typeof MobileBannerAd !== 'undefined' && (
						<MobileBannerAd />
					)}
					<Controls />
					<div
						css={css`
							${textSansItalic12};
						`}
					>
						<SavedMessage />
					</div>
				</div>
			</div>

			<div
				css={css`
					${textSans14};
					flex: 1;
					display: flex;
					flex-direction: column;
					gap: ${space[4]}px;
					${from.tablet} {
						max-height: ${gridWidth}px;
						overflow-y: scroll;
					}
					${from.desktop} {
						flex-direction: row;
					}
					${from.leftCol} {
						max-height: none;
						overflow: visible;
					}
					> * {
						flex: 1;
					}
				`}
			>
				<Clues
					direction="across"
					Header={CluesHeader}
					scrollToSelected={betweenTabletAndLeftCol}
				/>
				<Clues
					direction="down"
					Header={CluesHeader}
					scrollToSelected={betweenTabletAndLeftCol}
				/>
			</div>
		</div>
	);
};

export const CrosswordComponent = ({
	data,
	canRenderAds,
}: {
	data: CrosswordProps['data'];
	canRenderAds?: boolean;
}) => (
	<ReactCrossword
		data={data}
		Layout={Layout}
		MobileBannerAd={canRenderAds ? MobileBannerAdComponent : undefined}
	/>
);
