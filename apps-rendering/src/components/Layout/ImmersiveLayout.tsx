// ----- Imports ----- //

import { css } from '@emotion/react';
import Headline from 'components/Headline';
import MainMedia, { immersiveCaptionId } from 'components/MainMedia';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import { grid } from 'grid/grid';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';

// ----- Component ----- //

const headerStyles = css`
	${grid.container}
`;

const bodyStyles = css`
	${grid.container}
`;

type Props = {
	item: Item;
};

const ImmersiveLayout: FC<Props> = ({ item }) => (
	<>
		<main>
			<article>
				<header css={headerStyles}>
					<MainMedia
						mainMedia={item.mainMedia}
						format={getFormat(item)}
					/>
					<Series item={item} />
					<Headline item={item} />
					<Standfirst item={item} />
					<p id={immersiveCaptionId}>Immersive caption</p>
					<div>Metadata</div>
				</header>
				<div css={bodyStyles}>
					Body
					<section>Tags</section>
				</div>
			</article>
		</main>
		<aside>Related content</aside>
		<aside>Comments</aside>
		<footer>Footer</footer>
	</>
);

// ----- Exports ----- //

export default ImmersiveLayout;
