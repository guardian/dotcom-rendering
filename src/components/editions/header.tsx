// ----- Imports ----- //

import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Display } from '@guardian/types';
import Byline from 'components/editions/byline';
import HeaderImage from 'components/editions/headerImage';
import Headline from 'components/editions/headline';
import Lines from 'components/editions/lines';
import Series from 'components/editions/series';
import Standfirst from 'components/editions/standfirst';
import type { Item } from 'item';
import type { FC, ReactElement } from 'react';

// ----- Component ----- //

interface Props {
	item: Item;
}

const headerStyles = css`
	margin: 0;

	${from.wide} {
		margin: 0 auto;
	}

	${from.phablet} {
		margin-left: ${remSpace[24]};
	}
`;

const StandardHeader: FC<Props> = ({ item }) => (
	<>
		<HeaderImage item={item} />
		<Series item={item} />
		<Headline item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} />
	</>
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
	switch (item.display) {
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
