import { neutral } from '@guardian/source-foundations';
import type { DCRContainerPalette, DCRFrontCard } from '../../types/front';
import { Island } from './Island';
import { MediaCarousel } from './MediaCarousel.importable';
import { Section } from './Section';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	containerName: string;
	ophanComponentLink: string;
	ophanComponentName: string;
};

export const FixedVideo = ({
	trails,
	containerName,
	ophanComponentLink,
	ophanComponentName,
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
				/>
			</Island>
		</Section>
	);
};
