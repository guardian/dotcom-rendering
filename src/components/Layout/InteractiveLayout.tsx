// ----- Imports ----- //

import Footer from 'components/Footer';
import type { Interactive } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import { renderWithoutStyles } from 'renderer';

// ----- Component ----- //

interface Props {
	item: Interactive;
}

const InteractiveLayout: FC<Props> = ({ item }) => (
	<main>
		<article>{renderWithoutStyles(getFormat(item), item.body)}</article>
		<Footer isCcpa={false} format={item} />
	</main>
);

// ----- Exports ----- //

export default InteractiveLayout;
