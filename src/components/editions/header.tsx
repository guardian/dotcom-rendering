// ----- Imports ----- //

import { css } from '@emotion/core';
import { Design, Display } from '@guardian/types';
import Byline from 'components/editions/byline';
import HeaderMedia from 'components/editions/headerMedia';
import Headline from 'components/editions/headline';
import Lines from 'components/editions/lines';
import Series from 'components/editions/series';
import Standfirst from 'components/editions/standfirst';
import type { Item } from 'item';
import type { FC, ReactElement } from 'react';
import { sidePadding } from './styles';

// ----- Component ----- //

interface HeaderProps {
	item: Item;
}

const headerStyles = css`
	${sidePadding}
`;

const StandardHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderMedia item={item} />
		<Series item={item} />
		<Headline item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} shareIcon />
	</header>
);

const ShowcaseHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<Series item={item} />
		<Headline item={item} />
		<HeaderMedia item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} shareIcon />
	</header>
);

const AnalysisHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderMedia item={item} />
		<Headline item={item} />
		<Byline item={item} large />
		<Lines />
		<Standfirst item={item} shareIcon />
	</header>
);

const InterviewHeader: FC<HeaderProps> = ({ item }) => (
	<header>
		<HeaderMedia item={item} />
		<Headline item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} />
	</header>
);

const renderArticleHeader = (item: Item): ReactElement<HeaderProps> => {
	if (item.design === Design.Interview) {
		return <InterviewHeader item={item} />;
	} else if (item.display === Display.Showcase) {
		return <ShowcaseHeader item={item} />;
	} else if (item.design === Design.Analysis) {
		return <AnalysisHeader item={item} />;
	} else {
		return <StandardHeader item={item} />;
	}
};

const Container: FC<HeaderProps> = ({ item }) => {
	return <>{renderArticleHeader(item)}</>;
};

// ----- Exports ----- //

export default Container;
