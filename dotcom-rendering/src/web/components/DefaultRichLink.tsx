import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';

import { RichLink } from './RichLink';

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
				// We default to SpecialReport here purely because the greys of this theme
				// look better as the defaults
				theme: ArticleSpecial.SpecialReport,
			}}
			tags={[]}
			sponsorName=""
			isPlaceholder={isPlaceholder}
		/>
	);
};
