// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	background,
	border,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import Byline from 'components/Byline';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import Logo from 'components/Logo';
import MainMedia, { GalleryCaption } from 'components/MainMedia';
import Metadata from 'components/Metadata';
import RelatedContent from 'components/RelatedContent';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import Tags from 'components/Tags';
import { grid } from 'grid/grid';
import type { Gallery } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import { render } from 'renderer';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const headerStyles = (format: ArticleFormat): SerializedStyles => css`
	${grid.container}
	background-color: ${background.articleContent(format)};
	border-bottom: 1px solid ${border.galleryImage(format)};

	${darkModeCss`
		background-color: ${background.articleContentDark(format)};
	`}
`;

const wrapperStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.articleContent(format)};

	${darkModeCss`
		background-color: ${background.articleContentDark(format)};
	`}
`;

const logoStyles = css`
	${grid.column.centre}
`;

type Props = {
	item: Gallery;
};

const GalleryLayout: FC<Props> = ({ item }) => {
	const format = getFormat(item);

	return (
		<>
			<main>
				<article css={wrapperStyles(format)}>
					<header css={headerStyles(format)}>
						<MainMedia mainMedia={item.mainMedia} format={format} />
						<Series item={item} />
						<Headline item={item} />
						<Standfirst item={item} />
						<Byline bylineHtml={item.bylineHtml} {...format} />
						<Metadata item={item} />
						<GalleryCaption
							mainMedia={item.mainMedia}
							format={format}
						/>
						<div css={logoStyles}>
							<Logo item={item} />
						</div>
					</header>
					{render(item.shouldHideAdverts, format, item.body)}
					<Tags item={item} />
				</article>
			</main>
			<RelatedContent item={item} />
			<Footer isCcpa={false} format={format} />
		</>
	);
};

// ----- Exports ----- //

export default GalleryLayout;
