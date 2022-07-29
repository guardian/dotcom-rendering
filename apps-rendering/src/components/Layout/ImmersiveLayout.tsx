// ----- Imports ----- //

import { css } from '@emotion/react';
import { between, from, remSpace } from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import MainMedia, { ImmersiveCaption } from 'components/MainMedia';
import Metadata from 'components/Metadata';
import RelatedContent from 'components/RelatedContent';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import Tags from 'components/Tags';
import { grid } from 'grid/grid';
import LeftCentreBorder from 'grid/LeftCentreBorder';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';

// ----- Component ----- //

const headerStyles = css`
	${grid.container}
`;

const mainContentStyles = css`
	${grid.container}
`;

const bodyStyles = css`
	${grid.column.centre}

	${between.tablet.and.desktop} {
		${grid.span('centre-column-start', 11)}
	}

	${from.leftCol} {
		grid-row: 1 / 4;
	}
`;

const linesStyles = css`
	${grid.column.all}
	margin-top: ${remSpace[1]};

	${from.phablet} {
		${grid.column.centre}
	}

	${from.leftCol} {
		${grid.column.left}
		margin-top: 0;
	}
`;

type Props = {
	item: Item;
};

const ImmersiveLayout: FC<Props> = ({ item, children }) => (
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
					<LeftCentreBorder rows={[5, 5]} />
				</header>
				<div css={mainContentStyles}>
					<LeftCentreBorder rows={[1, 5]} />
					<StraightLines cssOverrides={linesStyles} />
					<Metadata item={item} />
					<div css={bodyStyles}>{children}</div>
					<Tags item={item} />
				</div>
			</article>
		</main>
		<RelatedContent item={item} />
		<Footer isCcpa={false} format={getFormat(item)} />
	</>
);

// ----- Exports ----- //

export default ImmersiveLayout;
