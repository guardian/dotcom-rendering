// ----- Imports ----- //

import { css } from '@emotion/react';
import { from, remSpace } from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import Headline from 'components/Headline';
import MainMedia, { ImmersiveCaption } from 'components/MainMedia';
import Metadata from 'components/Metadata';
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

const linesStyles = css`
	${grid.column.all}
	margin-top: ${remSpace[1]};

	${from.phablet} {
		${grid.column.centre}
	}

	${from.leftCol} {
		${grid.column.left}
		margin-top: ${remSpace[5]};
	}
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
					<ImmersiveCaption
						mainMedia={item.mainMedia}
						format={getFormat(item)}
					/>
					<StraightLines cssOverrides={linesStyles} />
					<Metadata item={item} />
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
