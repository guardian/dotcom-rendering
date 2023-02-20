import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import type { DCRFrontCard } from '../../types/front';
import type { CarouselCardProps } from './CarouselCard';
import { CarouselCardDesktop, CarouselCardMobile } from './CarouselCard';
import { FixedVideo } from './FixedVideo';
import { Hide } from './Hide';

type Props = {
	trails: DCRFrontCard[];
	containerName: string;
	ophanComponentLink: string;
	ophanComponentName: string;
	CarouselCard: ({ trail, isFirst }: CarouselCardProps) => EmotionJSX.Element;
};

export const FixedVideoWrapper = ({
	trails,
	containerName,
	ophanComponentLink,
	ophanComponentName,
	CarouselCard,
}: Props) => {
	return (
		<>
			<Hide when="above" breakpoint="desktop">
				<FixedVideo
					trails={trails}
					key={ophanComponentName}
					containerName={containerName}
					ophanComponentLink={ophanComponentLink}
					ophanComponentName={ophanComponentName}
					CarouselCard={(props) => <CarouselCardMobile {...props} />}
				/>
			</Hide>
			<Hide when="below" breakpoint="desktop">
				<FixedVideo
					trails={trails}
					key={ophanComponentName}
					containerName={containerName}
					ophanComponentLink={ophanComponentLink}
					ophanComponentName={ophanComponentName}
					CarouselCard={(props) => <CarouselCardDesktop {...props} />}
				/>
			</Hide>
		</>
	);
};
