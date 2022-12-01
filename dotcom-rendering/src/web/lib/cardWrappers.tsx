import type { DCRContainerPalette } from '../../types/front';
import type { TrailType } from '../../types/trails';
import { FrontCard } from '../components/FrontCard';

type TrailProps = {
	trail: TrailType;
	showAge?: boolean;
	containerPalette?: DCRContainerPalette;
};

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
			imageSize={'jumbo'}
			imagePosition={'right'}
			imagePositionOnMobile={'top'}
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
			imagePosition={'top'}
			imagePositionOnMobile={'top'}
			supportingContent={trail.supportingContent?.slice(0, 4)}
			supportingContentAlignment={'horizontal'}
		/>
	);
};

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
		/>
	);
};

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
			imagePosition="right"
			imageSize="large"
			imagePositionOnMobile="top"
			headlineSize="large"
		/>
	);
};

export const Card25Media25 = ({
	trail,
	showAge,
	containerPalette,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			supportingContent={trail.supportingContent?.slice(0, 2)}
			containerPalette={containerPalette}
			showAge={showAge}
		/>
	);
};

export const Card25Media25Tall = ({
	trail,
	showAge,
	containerPalette,
}: TrailProps) => {
	return (
		<FrontCard
			trail={trail}
			containerPalette={containerPalette}
			imagePositionOnMobile="left"
			showAge={showAge}
			trailText={
				// Only show trail text if there is no supportContent
				trail.supportingContent === undefined ||
				trail.supportingContent.length === 0
					? trail.trailText
					: undefined
			}
			supportingContent={trail.supportingContent?.slice(0, 2)}
		/>
	);
};
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
			imagePositionOnMobile="top"
			showAge={showAge}
			supportingContent={trail.supportingContent?.slice(0, 3)}
			supportingContentAlignment={'horizontal'}
		/>
	);
};

/**
 * Card designed to take up 50% of a container, with media taking up the full card
 *
 * Card Properties:
 * - Has trail text
 * - Large Headline
 * - Up to 3 sublinks
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
			supportingContentAlignment={'horizontal'}
			imagePositionOnMobile="top"
			headlineSize="large"
		/>
	);
};
