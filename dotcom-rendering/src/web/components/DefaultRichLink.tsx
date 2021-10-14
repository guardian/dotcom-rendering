import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';

import { RichLink } from '@root/src/web/components/RichLink';

type DefaultProps = {
	index: number;
	headlineText: string;
	url: string;
	isPlaceholder?: boolean;
};

const defaultImageData = {
	thumbnailUrl: '',
	altText: '',
	width: '',
	height: '',
};

export const DefaultRichLink: React.FC<DefaultProps> = ({
	index,
	headlineText,
	url,
	isPlaceholder,
}) => {
	return (
		<RichLink
			richLinkIndex={index}
			cardStyle="news"
			imageData={defaultImageData}
			headlineText={headlineText}
			contentType="article"
			url={url}
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			tags={[]}
			sponsorName=""
			isPlaceholder={isPlaceholder}
		/>
	);
};
