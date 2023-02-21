import type { DCRFrontCard } from '../../types/front';
import { CarouselCardDesktop, CarouselCardMobile } from './CarouselCard';
import { FixedVideo } from './FixedVideo';
import { Hide } from './Hide';

type Props = {
	trails: DCRFrontCard[];
	containerName: string;
	ophanComponentLink: string;
	ophanComponentName: string;
};

export const FixedVideoWrapper = ({
	trails,
	containerName,
	ophanComponentLink,
	ophanComponentName,
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
					CarouselCard={CarouselCardMobile}
				/>
			</Hide>
			<Hide when="below" breakpoint="desktop">
				<FixedVideo
					trails={trails}
					key={ophanComponentName}
					containerName={containerName}
					ophanComponentLink={ophanComponentLink}
					ophanComponentName={ophanComponentName}
					CarouselCard={CarouselCardDesktop}
				/>
			</Hide>
		</>
	);
};
