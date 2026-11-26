import { isUndefined } from '@guardian/libs';
import type { Loading } from '../components/CardPicture';
import { FrontCard } from '../components/FrontCard';
import type {
	AspectRatio,
	DCRContainerPalette,
	DCRFrontCard,
} from '../types/front';

type TrailProps = {
	trail: DCRFrontCard;
	imageLoading: Loading;
	serverTime?: number;
	containerPalette?: DCRContainerPalette;
	aspectRatio?: AspectRatio;
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
	containerPalette,
	imageLoading,
	serverTime,
	aspectRatio,
}: TrailProps) => {
	return (
		<FrontCard
			imageLoading={imageLoading}
			trail={trail}
			containerPalette={containerPalette}
			ageFormat="absolute"
			serverTime={serverTime}
			headlineSizes={{ desktop: 'medium', tablet: 'xxsmall' }}
			image={trail.image}
			mediaSize="medium"
			mediaPositionOnDesktop="right"
			mediaPositionOnMobile="top"
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
			aspectRatio={aspectRatio}
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
	containerPalette,
	imageLoading,
	serverTime,
	aspectRatio,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			ageFormat="absolute"
			serverTime={serverTime}
			headlineSizes={{ desktop: 'medium', tablet: 'xsmall' }}
			image={trail.image}
			mediaSize="xlarge"
			mediaPositionOnDesktop="right"
			mediaPositionOnMobile="top"
			imageLoading={imageLoading}
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
			aspectRatio={aspectRatio}
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
	containerPalette,
	imageLoading,
	serverTime,
	aspectRatio,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			supportingContent={trail.supportingContent?.slice(0, 2)}
			supportingContentAlignment="vertical"
			containerPalette={containerPalette}
			ageFormat="absolute"
			serverTime={serverTime}
			mediaPositionOnDesktop="top"
			mediaPositionOnMobile="left"
			mediaSize="small"
			imageLoading={imageLoading}
			headlineSizes={{ desktop: 'xsmall', tablet: 'xxsmall' }}
			canPlayInline={false}
			aspectRatio={aspectRatio}
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
	containerPalette,
	imageLoading,
	serverTime,
	aspectRatio,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			headlineSizes={{ desktop: 'small', tablet: 'xsmall' }}
			mediaSize="medium"
			mediaPositionOnDesktop="top"
			mediaPositionOnMobile="top"
			imageLoading={imageLoading}
			ageFormat="absolute"
			serverTime={serverTime}
			supportingContent={trail.supportingContent?.slice(0, 3)}
			supportingContentAlignment="horizontal"
			aspectRatio={aspectRatio}
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
	containerPalette,
	imageLoading,
	serverTime,
	aspectRatio,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			ageFormat="absolute"
			serverTime={serverTime}
			trailText={trail.trailText}
			mediaSize="medium"
			mediaPositionOnDesktop="top"
			mediaPositionOnMobile="left"
			imageLoading={imageLoading}
			headlineSizes={{ desktop: 'xsmall', tablet: 'xxsmall' }}
			aspectRatio={aspectRatio}
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
	containerPalette,
	serverTime,
	aspectRatio,
}: Omit<TrailProps, 'imageLoading'>) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			ageFormat="absolute"
			serverTime={serverTime}
			image={undefined}
			imageLoading={'lazy'}
			avatarUrl={undefined}
			headlineSizes={{ desktop: 'xxsmall' }}
			canPlayInline={false}
			aspectRatio={aspectRatio}
		/>
	);
};
