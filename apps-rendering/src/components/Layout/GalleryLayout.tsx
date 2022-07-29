// ----- Imports ----- //
import { css } from '@emotion/react';
import { from, neutral } from '@guardian/source-foundations';
import { map, withDefault } from '@guardian/types';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import MainMedia, { GalleryCaption } from 'components/MainMedia';
import Metadata from 'components/Metadata';
import RelatedContent from 'components/RelatedContent';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import Tags from 'components/Tags';
import { grid } from 'grid/grid';
import type { Item } from 'item';
import { getFormat } from 'item';
import { pipe } from 'lib';
import type { FC } from 'react';
import { themeToPillarString } from 'themeStyles';

// ----- Component ----- //

const headerStyles = css`
	${grid.container}
	background-color: ${neutral[7]};
	border-bottom: 1px solid ${neutral[20]};
`;

const wrapperStyles = css`
	background-color: ${neutral[7]};
`;

export const onwardStyles = css`
	background: ${neutral[97]};
`;

type Props = {
	item: Item;
};

const GalleryLayout: FC<Props> = ({ item, children }) => {
	const commentContainer = item.commentable
		? pipe(
				item.internalShortId,
				map((id) => (
					<section
						css={onwardStyles}
						id="comments"
						data-closed={false}
						data-pillar={themeToPillarString(item.theme)}
						data-short-id={id}
					></section>
				)),
				withDefault(<></>),
		  )
		: null;

	return (
		<main>
			<article css={wrapperStyles}>
				<header css={headerStyles}>
					<MainMedia
						mainMedia={item.mainMedia}
						format={getFormat(item)}
					/>
					<Series item={item} />
					<Headline item={item} />
					<Standfirst item={item} />
					<Metadata item={item} />
					<GalleryCaption
						mainMedia={item.mainMedia}
						format={getFormat(item)}
					/>
				</header>
				{children}
				<Tags item={item} />
			</article>
			<section css={onwardStyles}>
				<RelatedContent item={item} />
			</section>
			{commentContainer}
			<Footer isCcpa={false} format={item} />
		</main>
	);
};

// ----- Exports ----- //

export default GalleryLayout;
