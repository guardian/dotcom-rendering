// ----- Imports ----- //

import Footer from 'components/footer';
import type { FC, ReactNode } from 'react';

// ----- Component ----- //

interface Props {
	children: ReactNode[];
}

const Interactive: FC<Props> = ({ children }) => (
	<main>
		<article>{children}</article>
		<Footer isCcpa={false} />
	</main>
);

// ----- Exports ----- //

export default Interactive;
