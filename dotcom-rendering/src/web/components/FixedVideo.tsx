import type { DCRContainerPalette, DCRFrontCard } from '../../types/front';


type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedVideo = ({ trails, containerPalette, showAge }: Props) => {
	if (!trails[0]) return null;

	return (

	);
};
