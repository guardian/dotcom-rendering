import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { neutral } from '@guardian/source-foundations';
import type { DCRFrontCard } from '../../types/front';
import { CarouselCardProps } from './CarouselCard';
import { Island } from './Island';
import { MediaCarousel } from './MediaCarousel.importable';
import { Section } from './Section';

type Props = {
	trails: DCRFrontCard[];
	containerName: string;
	ophanComponentLink: string;
	ophanComponentName: string;
	CarouselCard: ({ trail, isFirst }: CarouselCardProps) => EmotionJSX.Element;
};

export const FixedVideo = ({
	trails,
	containerName,
	ophanComponentLink,
	ophanComponentName,
	CarouselCard,
}: Props) => {
	if (!trails[0]) return null;

	return (
		<Section fullWidth={true} innerBackgroundColour={neutral[0]}>
			<Island deferUntil="visible">
				<MediaCarousel
					trails={trails}
					containerName={containerName}
					ophanComponentLink={ophanComponentLink}
					ophanComponentName={ophanComponentName}
					CarouselCard={CarouselCard}
				/>
			</Island>
		</Section>
	);
};
export { CarouselCardProps };
