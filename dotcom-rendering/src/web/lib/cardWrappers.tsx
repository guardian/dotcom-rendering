import type { DCRContainerPalette } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { FrontCard } from '../components/FrontCard';

type TrailProps = {
	trail: TrailType;
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
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
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			headlineSize="huge"
			headlineSizeOnMobile="large"
			imageUrl={trail.image}
			imageSize="jumbo"
			imagePosition="right"
			imagePositionOnMobile="top"
			trailText={
				// Only show trail text if there is no supportContent
				trail.supportingContent === undefined ||
				trail.supportingContent.length === 0
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
 * ┃▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃
 * ┃▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃
 * ┃▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃
 * ┃                                     ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 * Card designed to take up 100% of the container, with media that takes up 75%
 *
 * Options:
 *  - Huge headline (large on mobile)
 *  - Jumbo image on the top (top on mobile)
 *  - No trail text
 *  - Up to 4 supporting content items, always aligned horizontal
 */
export const Card100Media100 = ({
	trail,
	showAge,
	containerPalette,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			headlineSize="huge"
			headlineSizeOnMobile="large"
			imageUrl={trail.image}
			imagePosition="top"
			imagePositionOnMobile="top"
			supportingContent={trail.supportingContent?.slice(0, 4)}
			supportingContentAlignment="horizontal"
		/>
	);
};

/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┱┈┈┈┈┈┈┈┈┈┐
 * ┃         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃   25%   ┊
 * ┃         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃Remaining┊
 * ┃         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃         ┊
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈┘
 * Card designed to take up 75% of the container, with media that takes up 50%
 *
 * Options:
 *  - Large headline (large on mobile)
 *  - Large image on the right (top on mobile)
 *  - Trail text
 *  - Up to 3 supporting content items, 1-2 aligned vertical, 3 aligned horizontal
 */
export const Card75Media50Right = ({
	trail,
	showAge,
	containerPalette,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			trailText={trail.trailText}
			supportingContent={trail.supportingContent?.slice(0, 3)}
			supportingContentAlignment={
				trail.supportingContent && trail.supportingContent.length > 2
					? 'horizontal'
					: 'vertical'
			}
			imagePosition="right"
			imageSize="large"
			imagePositionOnMobile="top"
			headlineSize="large"
			headlineSizeOnMobile="large"
		/>
	);
};

/**
 * ┌┈┈┈┈┈┈┈┈┈┲━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┊   25%   ┃▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒         ┃
 * ┊Remaining┃▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒         ┃
 * ┊         ┃▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒         ┃
 * └┈┈┈┈┈┈┈┈┈┺━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 * Card designed to take up 75% of the container, with media that takes up 50%
 *
 * Options:
 *  - Large headline (large on mobile)
 *  - Large image on the left (top on mobile)
 *  - Trail text
 *  - Up to 3 supporting content items, 1-2 aligned vertical, 3 aligned horizontal
 */
export const Card75Media50Left = ({
	trail,
	showAge,
	containerPalette,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			trailText={trail.trailText}
			supportingContent={trail.supportingContent?.slice(0, 3)}
			supportingContentAlignment={
				trail.supportingContent && trail.supportingContent.length > 2
					? 'horizontal'
					: 'vertical'
			}
			imagePosition="left"
			imagePositionOnMobile="top"
			imageSize="large"
			headlineSize="large"
			headlineSizeOnMobile="large"
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
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			supportingContent={trail.supportingContent?.slice(0, 2)}
			supportingContentAlignment="vertical"
			containerPalette={containerPalette}
			showAge={showAge}
			imagePosition="top"
			imagePositionOnMobile="left"
			imageSize="small"
			headlineSize="medium"
			headlineSizeOnMobile="medium"
		/>
	);
};
/**
 * ┏━━━━━━━━━┱┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┐
 * ┃▒▒▒▒▒▒▒▒▒┃                           ┊
 * ┃▒▒▒▒▒▒▒▒▒┃            75%            ┊
 * ┃         ┃         Remaining         ┊
 * ┃         ┃                           ┊
 * ┗━━━━━━━━━┹┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┘
 * Card designed to take up 25% of the container, with media that takes up 25%
 *
 * Options:
 *  - Medium headline (medium on mobile)
 *  - Small image on the top (left on mobile)
 *  - Trail text when there is no supporting content
 *  - Up to 2 supporting content items, always aligned vertical
 */
export const Card25Media25Tall = ({
	trail,
	showAge,
	containerPalette,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			imagePosition="top"
			imagePositionOnMobile="left"
			imageSize="small"
			headlineSize="medium"
			headlineSizeOnMobile="medium"
			trailText={
				trail.supportingContent === undefined ||
				trail.supportingContent.length === 0
					? trail.trailText
					: undefined
			}
			supportingContent={trail.supportingContent?.slice(0, 2)}
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
 *  - Small image on the top (top on mobile)
 *  - No trail text
 *  - Up to 3 supporting content items, always aligned horizontal
 */
export const Card50Media50 = ({
	trail,
	showAge,
	containerPalette,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			headlineSize="large"
			headlineSizeOnMobile="large"
			imageSize="small"
			imagePosition="top"
			imagePositionOnMobile="top"
			showAge={showAge}
			supportingContent={trail.supportingContent?.slice(0, 3)}
			supportingContentAlignment="horizontal"
		/>
	);
};

/**
 * ┏━━━━━━━━━━━━━━━━━━┱┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┐
 * ┃▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃                  ┊
 * ┃▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃        50%       ┊
 * ┃                  ┃     Remaining    ┊
 * ┃                  ┃                  ┊
 * ┗━━━━━━━━━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┘
 * Card designed to take up 50% of the container, with media that takes up 50%
 *
 * Options:
 *  - Large headline (large on mobile)
 *  - Small image on the top (top on mobile)
 *  - Trail text
 *  - Up to 3 supporting content items, always aligned horizontal
 */
export const Card50Media50Tall = ({
	trail,
	showAge,
	containerPalette,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			trailText={trail.trailText}
			supportingContent={trail.supportingContent?.slice(0, 3)}
			supportingContentAlignment="horizontal"
			imagePosition="top"
			imagePositionOnMobile="top"
			imageSize="small"
			headlineSize="large"
			headlineSizeOnMobile="large"
		/>
	);
};

/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━┱┈┈┈┈┈┈┈┈┈┈┈┈┐
 * ┃▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃     33%    ┊
 * ┃▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒┃  Remaining ┊
 * ┃                        ┃            ┊
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈┈┈┈┘
 * Card designed to take up 66% of the container, with media that takes up 66%
 *
 * Options:
 *  - Medium headline (medium on mobile)
 *  - Small image on the top (top on mobile)
 *  - Trail text
 *  - No supporting content
 */
export const Card66Media66 = ({
	trail,
	showAge,
	containerPalette,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			trailText={trail.trailText}
			headlineSize="medium"
			headlineSizeOnMobile="medium"
			imagePosition="top"
			imagePositionOnMobile="top"
			imageSize="small"
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
 *  - Small image on the top (left on mobile)
 *  - Trail text
 *  - No supporting content
 */
export const Card33Media33 = ({
	trail,
	showAge,
	containerPalette,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			trailText={trail.trailText}
			imageSize="small"
			imagePosition="top"
			imagePositionOnMobile="left"
			headlineSize="medium"
			headlineSizeOnMobile="medium"
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
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			imageUrl={undefined}
			headlineSize="small"
			headlineSizeOnMobile="small"
		/>
	);
};

/**
 * ┏━━━━━━━━━━━━━━━━━━┱┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┐
 * ┃ ▒▒▒▒             ┃  Any% Remaining  ┊
 * ┗━━━━━━━━━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┘
 * Card designed to take up any width of container, with small left media
 *
 * Options:
 *  - Small headline (small on mobile)
 *  - Small image on the left (none on mobile)
 *  - No trail text
 *  - No supporting content
 */
export const CardDefaultMedia = ({
	trail,
	showAge,
	containerPalette,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			imageSize="small"
			imagePosition="left"
			imagePositionOnMobile="none"
			headlineSize="small"
			headlineSizeOnMobile="small"
		/>
	);
};

/**
 * ┏━━━━━━━━━━━━━━━━━━┱┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┐
 * ┃ ▒▒▒▒             ┃  Any% Remaining  ┊
 * ┗━━━━━━━━━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┘
 * Card designed to take up any width of container, with small left media
 *
 * Options:
 *  - Small headline (small on mobile)
 *  - Small image on the left (left on mobile)
 *  - No trail text
 *  - No supporting content
 */
export const CardDefaultMediaMobile = ({
	trail,
	showAge,
	containerPalette,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			imageSize="small"
			imagePosition="left"
			imagePositionOnMobile="left"
			headlineSize="small"
			headlineSizeOnMobile="small"
		/>
	);
};
