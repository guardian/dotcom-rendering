import type { Loading } from '../components/CardPicture';
import { FrontCard } from '../components/FrontCard';
import type { DCRContainerPalette, DCRFrontCard } from '../types/front';

type TrailProps = {
	trail: DCRFrontCard;
	imageLoading: Loading;
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
}: TrailProps) => {
	return (
		<FrontCard
			imageLoading={imageLoading}
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			headlineSize="huge"
			headlineSizeOnMobile="medium"
			imageUrl={trail.image}
			imageSize="medium"
			imagePosition="right"
			imagePositionOnMobile="top"
			trailText={
				// Only show trail text if there is no supportContent
				trail.supportingContent === undefined ||
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
			imageLoading={imageLoading}
			trailText={
				// Only show trail text if there is no supportContent
				trail.supportingContent === undefined ||
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
	imageLoading,
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
			imageLoading={imageLoading}
			supportingContent={trail.supportingContent?.slice(0, 4)}
			supportingContentAlignment="horizontal"
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
 *  - Medium headline (large on mobile)
 *  - Jumbo image on the top (top on mobile)
 *  - Trail text
 *  - Up to 2 supporting content items, always aligned vertically
 */

export const Card100Media100Tall = ({
	trail,
	showAge,
	containerPalette,
	imageLoading,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			headlineSize="medium"
			headlineSizeOnMobile="large"
			imageUrl={trail.image}
			imagePosition="top"
			imagePositionOnMobile="top"
			imageLoading={imageLoading}
			supportingContent={trail.supportingContent?.slice(0, 2)}
			supportingContentAlignment="vertical"
			trailText={trail.trailText}
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
	imageLoading,
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
			imageLoading={imageLoading}
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
	imageLoading,
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
			imageLoading={imageLoading}
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
	imageLoading,
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
			imageLoading={imageLoading}
			headlineSize="medium"
			headlineSizeOnMobile="medium"
			isPlayableMediaCard={false}
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
export const Card25Media25SmallHeadline = ({
	trail,
	showAge,
	containerPalette,
	imageLoading,
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
			imageLoading={imageLoading}
			headlineSize="small"
			headlineSizeOnMobile="medium"
			isPlayableMediaCard={false}
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
	imageLoading,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			imagePosition="top"
			imagePositionOnMobile="left"
			imageSize="small"
			imageLoading={imageLoading}
			headlineSize="medium"
			headlineSizeOnMobile="medium"
			trailText={
				trail.avatarUrl === undefined &&
				(trail.supportingContent === undefined ||
					trail.supportingContent.length === 0)
					? trail.trailText
					: undefined
			}
			supportingContent={trail.supportingContent?.slice(0, 2)}
			isPlayableMediaCard={false}
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
 *  - Up to 2 supporting content items, always aligned vertical
 */
export const Card25Media25TallNoTrail = ({
	trail,
	showAge,
	containerPalette,
	imageLoading,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			imagePosition="top"
			imagePositionOnMobile="left"
			imageSize="small"
			imageLoading={imageLoading}
			headlineSize="medium"
			headlineSizeOnMobile="medium"
			supportingContent={trail.supportingContent?.slice(0, 2)}
			isPlayableMediaCard={false}
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
 *  - Small headline (medium on mobile)
 *  - Small image on the top (left on mobile)
 *  - Up to 2 supporting content items, always aligned vertical
 */
export const Card25Media25TallSmallHeadline = ({
	trail,
	showAge,
	containerPalette,
	imageLoading,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			imagePosition="top"
			imagePositionOnMobile="left"
			imageSize="small"
			imageLoading={imageLoading}
			headlineSize="small"
			headlineSizeOnMobile="medium"
			supportingContent={trail.supportingContent?.slice(0, 2)}
			isPlayableMediaCard={false}
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
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			headlineSize="large"
			headlineSizeOnMobile="large"
			imageSize="medium"
			imagePosition="top"
			imagePositionOnMobile="top"
			imageLoading={imageLoading}
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
 *  - Medium image on the top (top on mobile)
 *  - Trail text
 *  - Up to 3 supporting content items, always aligned horizontal
 */
export const Card50Media50Tall = ({
	trail,
	showAge,
	containerPalette,
	imageLoading,
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
			imageSize="medium"
			imageLoading={imageLoading}
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
 *  - Large image on the top (top on mobile)
 *  - Trail text
 *  - No supporting content
 */
export const Card66Media66 = ({
	trail,
	showAge,
	containerPalette,
	imageLoading,
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
			imageSize="large"
			imageLoading={imageLoading}
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
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			trailText={trail.trailText}
			imageSize="medium"
			imagePosition="top"
			imagePositionOnMobile="left"
			imageLoading={imageLoading}
			headlineSize="medium"
			headlineSizeOnMobile="medium"
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
 *  - No trail text
 *  - Up to 2 supporting content items, always aligned vertical
 */
export const Card33Media33Tall = ({
	trail,
	showAge,
	containerPalette,
	imageLoading,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			imageSize="medium"
			imagePosition="top"
			imagePositionOnMobile="left"
			imageLoading={imageLoading}
			headlineSize="medium"
			headlineSizeOnMobile="medium"
			supportingContent={trail.supportingContent?.slice(0, 2)}
			supportingContentAlignment="vertical"
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
 *  - Medium headline (large on mobile)
 *  - Medium image at the top, including on mobile
 *  - Trail text
 *  - Up to 2 supporting content items, always aligned vertical
 */
export const Card33Media33MobileTopTall = ({
	trail,
	showAge,
	containerPalette,
	imageLoading,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			trailText={trail.trailText}
			imageSize="medium"
			imagePosition="top"
			imagePositionOnMobile="top"
			imageLoading={imageLoading}
			headlineSize="medium"
			headlineSizeOnMobile="large"
			supportingContent={trail.supportingContent?.slice(0, 2)}
			supportingContentAlignment="vertical"
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
}: Omit<TrailProps, 'imageLoading'>) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			imageUrl={undefined}
			imageLoading={'lazy'}
			avatarUrl={undefined}
			headlineSize="small"
			headlineSizeOnMobile="small"
			isPlayableMediaCard={false}
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
	imageLoading,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			imageSize="small"
			imagePosition="left"
			imagePositionOnMobile="none"
			imageLoading={imageLoading}
			headlineSize="small"
			headlineSizeOnMobile="small"
			isPlayableMediaCard={false}
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
	imageLoading,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			imageSize="small"
			imagePosition="left"
			imagePositionOnMobile="left"
			imageLoading={imageLoading}
			headlineSize="small"
			headlineSizeOnMobile="small"
			isPlayableMediaCard={false}
		/>
	);
};
