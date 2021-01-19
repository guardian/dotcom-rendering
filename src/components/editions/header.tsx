// ----- Imports ----- //

import { css } from '@emotion/core';
import type { SerializedStyles } from '@emotion/core';
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
// ----- Component ----- //

interface Props {
	item: Item;
}

interface HeaderProps {
	item: Item;
	className?: SerializedStyles;
}

const headerStyles = css`
	padding: 0 ${remSpace[3]} ${remSpace[4]};

	${from.desktop} {
		padding: 0 ${remSpace[24]} ${remSpace[4]};
	}
`;

const reviewHeaderStyles = css`
	background-color: ${culture[800]};
	color: ${culture[300]};
`;

const showcaseHeaderStyles = css`
	padding: 0 ${remSpace[2]};
	margin: 0;

	${from.wide} {
		margin: 0 auto;
	}

	${from.phablet} {
		padding-left: 0;
		padding-right: 0;
		margin-left: ${remSpace[24]};
	}
`;

const StandardHeader: FC<HeaderProps> = ({ item, className }) => (
	<header css={[headerStyles, className]}>
		<HeaderImage item={item} />
		<Series item={item} />
		<Headline item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} />
	</header>
);

const ShowcaseHeader: FC<HeaderProps> = ({ item }) => (
	<header css={showcaseHeaderStyles}>
		<Series item={item} />
		<Headline item={item} />
		<HeaderImage item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} />
	</header>
);

const renderArticleHeader = (item: Item): ReactElement<Props> => {
	if (item.display === Display.Showcase) {
		return <ShowcaseHeader item={item} />;
	} else if (item.design === Design.Review) {
		return <StandardHeader item={item} className={reviewHeaderStyles} />;
	} else {
		return <StandardHeader item={item} />;
	}
};

const Container: FC<Props> = ({ item }: Props) => {
	return <>{renderArticleHeader(item)}</>;
};

// ----- Exports ----- //

export default Container;
