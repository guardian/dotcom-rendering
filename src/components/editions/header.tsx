// ----- Imports ----- //

import { css } from '@emotion/core';
import { culture, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Design, Display } from '@guardian/types';
import Byline from 'components/editions/byline';
import HeaderImage from 'components/editions/headerImage';
import Headline from 'components/editions/headline';
import Lines from 'components/editions/lines';
import Series from 'components/editions/series';
import Standfirst from 'components/editions/standfirst';
import type { Item } from 'item';
import type { FC, ReactElement } from 'react';
import type { SerializedStyles } from '@emotion/core';
// ----- Component ----- //

interface Props {
	item: Item;
	headerStyles?: SerializedStyles;
}

const reviewHeaderStyles = css`
	padding: 0 ${remSpace[3]} ${remSpace[4]};
	background-color: ${culture[800]};
	color: ${culture[300]};
`;

const headerStyles = css`r
	margin: 0;

	${from.wide} {
		margin: 0 auto;
	}

	${from.phablet} {
		margin-left: ${remSpace[24]};
	}
`;

const StandardHeader: FC<Props> = ({ item, headerStyles }) => (
	<header css={headerStyles}>
		<HeaderImage item={item} />
		<Series item={item} />
		<Headline item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} />
	</header>
);

const ShowcaseHeader: FC<Props> = ({ item }) => (
	<>
		<Series item={item} />
		<Headline item={item} />
		<HeaderImage item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} />
	</>
);

const renderArticleHeader = (item: Item): ReactElement<Props> => {
	console.log(Design.Showcase)
	switch (item.display | item.design) {
		case Design.Review:
			return <StandardHeader item={item} headerStyles={reviewHeaderStyles} />;
		case Display.Showcase:
			return <ShowcaseHeader item={item} />;
		default:
			return <StandardHeader item={item} />;
	}
};

const Header: FC<Props> = ({ item }: Props) => {
	return <header css={headerStyles}>{renderArticleHeader(item)}</header>;
};

// ----- Exports ----- //

export default Header;
