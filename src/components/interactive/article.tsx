import FooterCcpa from 'components/shared/footer';
import type { FC, ReactNode } from 'react';

// ----- Component ----- //

interface Props {
	children: ReactNode[];
}

const Interactive: FC<Props> = ({ children }) => (
	<main>
		<article>{children}</article>
		<div id="articleFooter">
			<FooterCcpa isCcpa={false} />
		</div>
	</main>
);

// ----- Exports ----- //

export default Interactive;
