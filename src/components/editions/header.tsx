// ----- Imports ----- //

import { css } from '@emotion/core';
import { Display } from '@guardian/types';
import Byline from 'components/editions/byline';
import HeaderImage from 'components/editions/headerImage';
import Headline from 'components/editions/headline';
import Lines from 'components/editions/lines';
import Series from 'components/editions/series';
import Standfirst from 'components/editions/standfirst';
import type { Item } from 'item';
import type { FC, ReactElement } from 'react';
import { articleWidthStyles } from './styles';

// ----- Component ----- //

interface Props {
	item: Item;
}

const headerStyles = css`
	margin: 0;

	${articleWidthStyles}
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
