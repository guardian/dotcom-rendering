import { isUndefined } from '@guardian/libs';
import type { Loading } from '../components/CardPicture';
import { FrontCard } from '../components/FrontCard';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front';

type TrailProps = {
	trail: DCRFrontCard;
	imageLoading: Loading;
	absoluteServerTimes: boolean;
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
	isTagPage?: boolean;
};

/**
 * ASCII Art Guide
 * ┏━━┓
 * ┃  ┃ Empty space is where headline, trail text & sublinks go
 * ┗━━┛
 *
 * ┏━━┓
 * ┃▒▒┃ Filled space is where images / media will go
 * ┗━━┛
 *
 * ┌┈┈┐
 * ┊  ┊ Dotted / Thin lines represent the left over space in the container
 * └┈┈┘
 *
 * To get these characters you can visit:
 * https://en.wikipedia.org/wiki/Box-drawing_character
 */

/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃                  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃
 * ┃                  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃
 * ┃                  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 * Card designed to take up 100% of the container, with media that takes up 75%
 *
 * Options:
 *  - Huge headline (large on mobile)
 *  - Jumbo image on the right (top on mobile)
 *  - Trail text when there is no supporting content
 *  - Up to 4 supporting content items, 1-3 aligned vertical, 4 aligned horizontal
 */
export const Card100Media50 = ({
	trail,
	showAge,
	containerPalette,
	imageLoading,
	isTagPage,
	absoluteServerTimes,
}: TrailProps) => {
	return (
		<FrontCard
			imageLoading={imageLoading}
			isTagPage={isTagPage}
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			absoluteServerTimes={absoluteServerTimes}
			headlineSizes={{ desktop: 'medium', tablet: 'xxsmall' }}
			image={trail.image}
			imageSize="medium"
			imagePositionOnDesktop="right"
			imagePositionOnMobile="top"
			trailText={
				// Only show trail text if there is no supportContent
				isUndefined(trail.supportingContent) ||
				trail.supportingContent.length !== 3
					? trail.trailText
					: undefined
			}
			supportingContent={trail.supportingContent?.slice(0, 4)}
			supportingContentAlignment={
				trail.supportingContent && trail.supportingContent.length > 3
					? 'horizontal'
					: 'vertical'
			}
		/>
	);
};

/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃
 * ┃         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃
 * ┃         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 * Card designed to take up 100% of the container, with media that takes up 75%
 *
 * Options:
 *  - Huge headline (large on mobile)
 *  - Jumbo image on the right (top on mobile)
 *  - Trail text when there is no supporting content
 *  - Up to 4 supporting content items, 1-3 aligned vertical, 4 aligned horizontal
 */
export const Card100Media75 = ({
	trail,
	showAge,
	containerPalette,
	imageLoading,
	isTagPage,
	absoluteServerTimes,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			absoluteServerTimes={absoluteServerTimes}
			headlineSizes={{ desktop: 'medium', tablet: 'xsmall' }}
			image={trail.image}
			imageSize="jumbo"
			imagePositionOnDesktop="right"
			imagePositionOnMobile="top"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
			trailText={
				// Only show trail text if there is no supportContent
				isUndefined(trail.supportingContent) ||
				trail.supportingContent.length !== 3
					? trail.trailText
					: undefined
			}
			supportingContent={trail.supportingContent?.slice(0, 4)}
			supportingContentAlignment={
				trail.supportingContent && trail.supportingContent.length > 3
					? 'horizontal'
					: 'vertical'
			}
		/>
	);
};

/**
 * ┏━━━━━━━━━┱┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┐
 * ┃▒▒▒▒▒▒▒▒▒┃            75%            ┊
 * ┃▒▒▒▒▒▒▒▒▒┃         Remaining         ┊
 * ┃         ┃                           ┊
 * ┗━━━━━━━━━┹┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┘
 * Card designed to take up 25% of the container, with media that takes up 25%
 *
 * Options:
 *  - Medium headline (medium on mobile)
 *  - Small image on the top (left on mobile)
 *  - No trail text
 *  - Up to 2 supporting content items, always aligned vertical
 */
export const Card25Media25 = ({
	trail,
	showAge,
	containerPalette,
	imageLoading,
	isTagPage,
	absoluteServerTimes,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			supportingContent={trail.supportingContent?.slice(0, 2)}
			supportingContentAlignment="vertical"
			containerPalette={containerPalette}
			showAge={showAge}
			absoluteServerTimes={absoluteServerTimes}
			imagePositionOnDesktop="top"
			imagePositionOnMobile="left"
			imageSize="small"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
			headlineSizes={{ desktop: 'xsmall', tablet: 'xxsmall' }}
			canPlayInline={false}
		/>
	);
};
/**
 * ┏━━━━━━━━━━━━━━━━━━┱┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┐
 * ┃▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃        50%       ┊
 * ┃▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃     Remaining    ┊
 * ┃                  ┃                  ┊
 * ┗━━━━━━━━━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┘
 * Card designed to take up 50% of the container, with media that takes up 50%
 *
 * Options:
 *  - Large headline (large on mobile)
 *  - Medium image on the top (top on mobile)
 *  - No trail text
 *  - Up to 3 supporting content items, always aligned horizontal
 */
export const Card50Media50 = ({
	trail,
	showAge,
	containerPalette,
	imageLoading,
	isTagPage,
	absoluteServerTimes,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			headlineSizes={{ desktop: 'small', tablet: 'xsmall' }}
			imageSize="medium"
			imagePositionOnDesktop="top"
			imagePositionOnMobile="top"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
			showAge={showAge}
			absoluteServerTimes={absoluteServerTimes}
			supportingContent={trail.supportingContent?.slice(0, 3)}
			supportingContentAlignment="horizontal"
		/>
	);
};

/**
 * ┏━━━━━━━━━━━━┱┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┐
 * ┃▒▒▒▒▒▒▒▒▒▒▒▒┃           66%          ┊
 * ┃▒▒▒▒▒▒▒▒▒▒▒▒┃        Remaining       ┊
 * ┃            ┃                        ┊
 * ┗━━━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┘
 * Card designed to take up 33% of the container, with media that takes up 33%
 *
 * Options:
 *  - Medium headline (medium on mobile)
 *  - Medium image on the top (left on mobile)
 *  - Trail text
 *  - No supporting content
 */
export const Card33Media33 = ({
	trail,
	showAge,
	containerPalette,
	imageLoading,
	isTagPage,
	absoluteServerTimes,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			absoluteServerTimes={absoluteServerTimes}
			trailText={trail.trailText}
			imageSize="medium"
			imagePositionOnDesktop="top"
			imagePositionOnMobile="left"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
			headlineSizes={{ desktop: 'xsmall', tablet: 'xxsmall' }}
		/>
	);
};

/**
 * ┏━━━━━━━━━━━━━━━━━━┱┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┐
 * ┃                  ┃  Any% Remaining  ┊
 * ┗━━━━━━━━━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┘
 * Card designed to take up any width of container, with no media
 *
 * Options:
 *  - Small headline (small on mobile)
 *  - No image / media
 *  - No trail text
 *  - No supporting content
 */
export const CardDefault = ({
	trail,
	showAge,
	containerPalette,
	absoluteServerTimes,
	isTagPage,
}: Omit<TrailProps, 'imageLoading'>) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			absoluteServerTimes={absoluteServerTimes}
			image={undefined}
			imageLoading={'lazy'}
			avatarUrl={undefined}
			headlineSizes={{ desktop: 'xxsmall' }}
			canPlayInline={false}
			isTagPage={isTagPage}
		/>
	);
};

/**
 * Abstraction to decide whether to show padding on wrapped rows of cards.
 *
 * For three columns, We have different results with 5 or 9 cards
 *
 * @example - All but last 2
 * ```
 * ┌───┐ ┌───┐ ┌───┐
 * │Pad│ │Pad│ │Pad│
 * └───┘ └───┘ └───┘
 * ┌───┐ ┌───┐
 * │No!│ │No!│
 * └───┘ └───┘
 * ```
 * - All but last 3
 * ```
 * ┌───┐ ┌───┐ ┌───┐
 * │Pad│ │Pad│ │Pad│
 * └───┘ └───┘ └───┘
 * ┌───┐ ┌───┐ ┌───┐
 * │Pad│ │Pad│ │Pad│
 * └───┘ └───┘ └───┘
 * ┌───┐ ┌───┐ ┌───┐
 * │No!│ │No!│ │No!│
 * └───┘ └───┘ └───┘
 * ```
 *
 * @param index - Index of the current card
 * @param totalCards - Total number of cards being shown
 * @param cardsPerRow - No. of cards in each row (if full)
 */
export const shouldPadWrappableRows = (
	index: number,
	totalCards: number,
	cardsPerRow: number,
): boolean => index < totalCards - (totalCards % cardsPerRow || cardsPerRow);
