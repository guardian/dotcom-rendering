import { css } from '@emotion/react';
import { Crossword as ReactCrossword } from '@guardian/react-crossword';
import type { CrosswordProps } from '@guardian/react-crossword';
import {
	between,
	from,
	headlineBold14,
	headlineBold17,
	space,
	textSans12,
	textSans14,
	textSansItalic12,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import type { ReactNode } from 'react';
import { memo, useRef } from 'react';
import { useCrosswordProgressReporting } from '../lib/puzzleProgress/useCrosswordProgressReporting';
import { removeMediaRulePrefix, useMatchMedia } from '../lib/useMatchMedia';
import { useScrollGradients } from '../lib/useScrollGradients';
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
				@media print {
					${headlineBold14};
					border: none;
					height: auto;
					margin-bottom: 0.25em;
				}
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
	const cluesRef = useRef<HTMLDivElement>(null);
	const { showTopGradient, showBottomGradient } =
		useScrollGradients(cluesRef);

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
				@media print {
					flex-direction: column;
				}
			`}
		>
			<AnagramHelper />
			<div
				css={css`
					flex-basis: ${gridWidth}px;
					@media print {
						flex-basis: auto;
						max-width: 400px;
						max-height: 400px;
					}
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
							max-width: ${gridWidth}px;
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
					position: relative;
					flex: 1;
					display: flex;
					${from.tablet} {
						max-height: ${gridWidth}px;
						::before {
							display: ${showTopGradient ? 'block' : 'none'};
							position: absolute;
							content: '';
							top: 0;
							left: 0;
							width: 100%;
							height: 64px;
							pointer-events: none;
							background-image: linear-gradient(
								180deg,
								${palette('--article-background')},
								transparent
							);
						}
						::after {
							display: ${showBottomGradient ? 'block' : 'none'};
							position: absolute;
							content: '';
							bottom: 0;
							left: 0;
							width: 100%;
							height: 64px;
							background-image: linear-gradient(
								180deg,
								transparent,
								${palette('--article-background')}
							);
						}
					}
					${from.leftCol} {
						max-height: none;
						::before,
						::after {
							background-image: none;
						}
					}
					@media print {
						max-height: none;
						::before,
						::after {
							background-image: none;
						}
					}
				`}
			>
				<div
					ref={cluesRef}
					css={css`
						${textSans14};
						flex: 1;
						display: flex;
						flex-direction: column;
						gap: ${space[4]}px;
						${from.tablet} {
							overflow-y: scroll;
						}
						${from.desktop} {
							flex-direction: row;
						}
						${from.leftCol} {
							overflow: visible;
						}
						> * {
							flex: 1;
						}
						@media print {
							flex-direction: row;
							${textSans12};
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
		</div>
	);
};

export const CrosswordComponent = ({
	data,
	canRenderAds,
}: {
	data: CrosswordProps['data'];
	canRenderAds?: boolean;
}) => {
	const onProgressChange = useCrosswordProgressReporting(data);

	return (
		<ReactCrossword
			data={data}
			Layout={Layout}
			MobileBannerAd={canRenderAds ? MobileBannerAdComponent : undefined}
			onProgressChange={onProgressChange}
			textColor={palette('--crossword-text')}
			anagramHelperBackgroundColor={palette(
				'--crossword-anagram-helper-background',
			)}
		/>
	);
};
