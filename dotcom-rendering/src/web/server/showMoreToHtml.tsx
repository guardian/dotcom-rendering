import { renderToString } from 'react-dom/server';
import type { DCRContainerPalette, DCRFrontCard } from 'src/types/front';
import { ExtraCardsContainer } from '../components/ExtraCardsContainer';

interface DCRShowMoreContainerType {
	cards: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
}
/**
 * showMoreToHtml is used by the /Cards endpoint to render extra fronts cards
 *
 * @returns string (the html)
 */

export const showMoreToHtml = ({
	cards,
	containerPalette,
}: DCRShowMoreContainerType): string => {
	const html = renderToString(
		<ExtraCardsContainer
			trails={cards}
			containerPalette={containerPalette}
			isShowMoreContainer={true}
		/>,
	);

	return html;
};
