import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { DocumentBlockComponent } from './DocumentBlockComponent.importable';

export default {
	component: DocumentBlockComponent,
	title: 'Components/DocumentBlockComponent',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
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
		<Wrapper>
			<p>Scribd Document</p>
			<DocumentBlockComponent
				embedUrl="https://www.scribd.com/embeds/431975393/content"
				height={613}
				width={460}
				title=""
				isTracking={false}
				isMainMedia={false}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
			/>
			<p>DocumentCloud Document</p>
			<DocumentBlockComponent
				embedUrl="https://embed.documentcloud.org/documents/20417938-test-pdf"
				height={700}
				width={990}
				title="TEST PDF (Hosted by DocumentCloud)"
				source="DocumentCloud"
				isTracking={false}
				isMainMedia={false}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
			/>
		</Wrapper>
	);
};
documentEmbed.story = { name: 'document embed' };
