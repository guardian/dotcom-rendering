// ----- Imports ----- //

import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import type { Format } from '@guardian/types';
import { Design, Display } from '@guardian/types';
import Byline from 'components/editions/byline';
import HeaderImage from 'components/editions/headerImage';
import Headline from 'components/editions/headline';
import Lines from 'components/editions/lines';
import Series from 'components/editions/series';
import Standfirst from 'components/editions/standfirst';
import type { Item } from 'item';
import type { FC, ReactElement } from 'react';
import {
	articleMarginStyles,
	interviewBackgroundColour,
	sidePadding,
	tabletArticleMargin,
	wideArticleMargin,
} from './styles';

// ----- Component ----- //

interface HeaderProps {
	item: Item;
}

const headerStyles = css`
	${sidePadding}
`;

const interviewHeaderStyles = (item: Format): SerializedStyles => css`
	${from.tablet} {
		padding-left: ${tabletArticleMargin}px;
	}

	${from.wide} {
		padding-left: ${wideArticleMargin}px;
	}
	background-color: ${interviewBackgroundColour(item)};
`;

const StandardHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderImage item={item} />
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
		<HeaderImage item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} shareIcon />
	</header>
);

const AnalysisHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderImage item={item} />
		<Headline item={item} />
		<Byline item={item} large />
		<Lines />
		<Standfirst item={item} shareIcon />
	</header>
);

const CommentHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderImage item={item} />
		<Headline item={item} />
		<Byline item={item} large avatar />
		<Lines />
		<Standfirst item={item} shareIcon />
	</header>
);

const InterviewHeader: FC<HeaderProps> = ({ item }) => (
	<header>
		<HeaderImage item={item} />
		<div css={interviewHeaderStyles(item)}>
			<Headline item={item} />
			<Standfirst item={item} />
		</div>
		<Lines className={articleMarginStyles} />
		<Byline item={item} shareIcon />
	</header>
);

const GalleryHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderImage item={item} />
		<Headline item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} shareIcon />
	</header>
);

const renderArticleHeader = (item: Item): ReactElement<HeaderProps> => {
	if (item.design === Design.Interview) {
		return <InterviewHeader item={item} />;
	} else if (item.display === Display.Showcase) {
		return <ShowcaseHeader item={item} />;
	} else if (item.design === Design.Analysis) {
		return <AnalysisHeader item={item} />;
	} else if (item.design === Design.Comment) {
		return <CommentHeader item={item} />;
	} else if (item.design === Design.Media) {
		return <GalleryHeader item={item} />;
	} else {
		return <StandardHeader item={item} />;
	}
};

const Container: FC<HeaderProps> = ({ item }) => {
	return <>{renderArticleHeader(item)}</>;
};

// ----- Exports ----- //

export default Container;
