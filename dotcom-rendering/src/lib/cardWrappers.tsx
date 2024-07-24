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
			headlineSize="huge"
			headlineSizeOnMobile="medium"
			image={trail.image}
			imageSize="medium"
			imagePositionOnDesktop="right"
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
	isTagPage,
	absoluteServerTimes,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			absoluteServerTimes={absoluteServerTimes}
			headlineSize="huge"
			headlineSizeOnMobile="large"
			image={trail.image}
			imageSize="jumbo"
			imagePositionOnDesktop="right"
			imagePositionOnMobile="top"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
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
	isTagPage,
	absoluteServerTimes,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			absoluteServerTimes={absoluteServerTimes}
			headlineSize="huge"
			headlineSizeOnMobile="large"
			image={trail.image}
			imagePositionOnDesktop="top"
			imagePositionOnMobile="top"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
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
	isTagPage,
	absoluteServerTimes,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			absoluteServerTimes={absoluteServerTimes}
			headlineSize="medium"
			headlineSizeOnMobile="large"
			image={trail.image}
			imagePositionOnDesktop="top"
			imagePositionOnMobile="top"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
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
			supportingContent={trail.supportingContent?.slice(0, 3)}
			supportingContentAlignment={
				trail.supportingContent && trail.supportingContent.length > 2
					? 'horizontal'
					: 'vertical'
			}
			imagePositionOnDesktop="right"
			imageSize="large"
			imagePositionOnMobile="top"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
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
			supportingContent={trail.supportingContent?.slice(0, 3)}
			supportingContentAlignment={
				trail.supportingContent && trail.supportingContent.length > 2
					? 'horizontal'
					: 'vertical'
			}
			imagePositionOnDesktop="left"
			imagePositionOnMobile="top"
			imageSize="large"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
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
	isTagPage,
	absoluteServerTimes,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			absoluteServerTimes={absoluteServerTimes}
			imagePositionOnDesktop="top"
			imagePositionOnMobile="left"
			imageSize="small"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
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
	isTagPage,
	absoluteServerTimes,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			absoluteServerTimes={absoluteServerTimes}
			imagePositionOnDesktop="top"
			imagePositionOnMobile="left"
			imageSize="small"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
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
	isTagPage,
	absoluteServerTimes,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			absoluteServerTimes={absoluteServerTimes}
			imagePositionOnDesktop="top"
			imagePositionOnMobile="left"
			imageSize="small"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
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
	isTagPage,
	absoluteServerTimes,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			headlineSize="large"
			headlineSizeOnMobile="large"
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
			supportingContent={trail.supportingContent?.slice(0, 3)}
			supportingContentAlignment="horizontal"
			imagePositionOnDesktop="top"
			imagePositionOnMobile="top"
			imageSize="medium"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
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
			headlineSize="medium"
			headlineSizeOnMobile="medium"
			imagePositionOnDesktop="top"
			imagePositionOnMobile="top"
			imageSize="large"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
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
	isTagPage,
	absoluteServerTimes,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			absoluteServerTimes={absoluteServerTimes}
			imageSize="medium"
			imagePositionOnDesktop="top"
			imagePositionOnMobile="left"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
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
			imagePositionOnMobile="top"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
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
			headlineSize="small"
			isPlayableMediaCard={false}
			isTagPage={isTagPage}
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
	isTagPage,
	absoluteServerTimes,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			absoluteServerTimes={absoluteServerTimes}
			imageSize="small"
			imagePositionOnDesktop="left"
			imagePositionOnMobile="none"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
			headlineSize="small"
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
	isTagPage,
	absoluteServerTimes,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			showAge={showAge}
			absoluteServerTimes={absoluteServerTimes}
			imageSize="small"
			imagePositionOnDesktop="left"
			imagePositionOnMobile="left"
			imageLoading={imageLoading}
			isTagPage={isTagPage}
			headlineSize="small"
			isPlayableMediaCard={false}
		/>
	);
};
