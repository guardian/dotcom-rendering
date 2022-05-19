// ----- Imports ----- //

import type { ArticleFormat } from '@guardian/libs';
import Footer from 'components/Footer';
import type { FC, ReactNode } from 'react';

// ----- Component ----- //

interface Props {
	children: ReactNode[];
	item: ArticleFormat;
}

const Interactive: FC<Props> = ({ children, item }) => (
	<main>
		<article>{children}</article>
		<Footer isCcpa={false} format={item} />
	</main>
);

// ----- Exports ----- //

export default Interactive;
