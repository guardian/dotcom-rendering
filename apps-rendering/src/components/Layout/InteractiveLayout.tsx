// ----- Imports ----- //

import Footer from 'components/Footer';
import type { Interactive } from 'item';
import { getFormat } from 'item';

import { renderWithoutStyles } from 'renderer';

// ----- Component ----- //

interface Props {
	item: Interactive;
}

const InteractiveLayout = ({ item }: Props) => (
	<main>
		<article>{renderWithoutStyles(getFormat(item), item.body)}</article>
		<Footer isCcpa={false} format={item} />
	</main>
);

// ----- Exports ----- //

export default InteractiveLayout;
