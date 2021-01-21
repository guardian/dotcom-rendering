// ----- Imports ----- //

import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/core';
import { Display, Design } from '@guardian/types';
import Byline from 'components/editions/byline';
import HeaderImage from 'components/editions/headerImage';
import Headline from 'components/editions/headline';
import Lines from 'components/editions/lines';
import Series from 'components/editions/series';
import Standfirst from 'components/editions/standfirst';
import type { Item } from 'item';
import type { FC, ReactElement } from 'react';
import { sidePadding } from './styles';

// ----- Component ----- //

interface Props {
	item: Item;
}

interface HeaderProps {
	item: Item;
	className?: SerializedStyles;
}

const headerStyles = css`
	${sidePadding}
`;

const StandardHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderImage item={item} />
		<Series item={item} />
		<Headline item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} />
	</header>
);

const ShowcaseHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<Series item={item} />
		<Headline item={item} />
		<HeaderImage item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} />
	</header>
);

const InterviewHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderImage item={item} />
		<Headline item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} />
	</header>
);

const renderArticleHeader = (item: Item): ReactElement<Props> => {
	if (item.design === Design.Interview) {
		return <InterviewHeader item={item} />;
	} else if (item.display === Display.Showcase) {
		return <ShowcaseHeader item={item} />;
	} else {
		return <StandardHeader item={item} />;
	}
};

const Container: FC<Props> = ({ item }: Props) => {
	return <>{renderArticleHeader(item)}</>;
};

// ----- Exports ----- //

export default Container;
