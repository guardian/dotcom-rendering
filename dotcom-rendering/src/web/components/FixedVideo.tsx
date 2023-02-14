import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { DCRContainerPalette, DCRFrontCard } from '../../types/front';
import { MediaCarousel } from './MediaCarousel.importable';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
};

export const FixedVideo = ({ trails }: Props) => {
	if (!trails[0]) return null;

	return (
		<MediaCarousel
			trails={trails}
			onwardsSource={'more-on-this-story'}
			format={{
				theme: ArticlePillar.News,
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
			}}
		/>
	);
};
