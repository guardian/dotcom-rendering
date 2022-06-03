import { renderToString } from 'react-dom/server';
import { ExtraCardsContainer } from '../components/ExtraCardsContainer';

interface DCRShowMoreContainer {
	cards: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
}
/**
 * cardsToHtml is used by the /Cards endpoint to render extra fronts cards
 *
 * @returns string (the html)
 */

export const cardsToHtml = ({
	cards,
	containerPalette,
}: DCRShowMoreContainer): string => {
	const html = renderToString(
		<ExtraCardsContainer
			trails={cards}
			containerPalette={containerPalette}
		/>,
	);

	return html;
};
