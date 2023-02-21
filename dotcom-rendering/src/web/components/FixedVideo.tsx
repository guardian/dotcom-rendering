import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { neutral } from '@guardian/source-foundations';
import type { DCRFrontCard } from '../../types/front';
import { CarouselCardProps } from './CarouselCard';
import { MediaCarousel } from './MediaCarousel.importable';
import { Section } from './Section';

type Props = {
	trails: DCRFrontCard[];
	containerName: string;
	ophanComponentLink: string;
	ophanComponentName: string;
	CarouselCard: ({
		trail,
		isFirst,
		current,
	}: CarouselCardProps) => EmotionJSX.Element;
	isDesktop: boolean;
};

export const FixedVideo = ({
	trails,
	containerName,
	ophanComponentLink,
	ophanComponentName,
	CarouselCard,
	isDesktop,
}: Props) => {
	if (!trails[0]) return null;

	return (
		<Section fullWidth={true} innerBackgroundColour={neutral[0]}>
			<MediaCarousel
				trails={trails}
				containerName={containerName}
				ophanComponentLink={ophanComponentLink}
				ophanComponentName={ophanComponentName}
				CarouselCard={CarouselCard}
				isDesktop={isDesktop}
			/>
		</Section>
	);
};
export { CarouselCardProps };
