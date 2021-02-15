import { css } from '@emotion/react';

import { DocumentBlockComponent } from './DocumentBlockComponent';

export default {
	component: DocumentBlockComponent,
	title: 'Components/DocumentBlockComponent',
};

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			max-width: 620px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);

export const documentEmbed = () => {
	return (
		<Container>
			<p>abc</p>
			<DocumentBlockComponent
				embedUrl="https://www.scribd.com/embeds/431975393/content"
				height={613}
				width={460}
				title=""
			/>
			<p>abc</p>
		</Container>
	);
};
documentEmbed.story = { name: 'document embed' };
