// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { border, from, neutral, remSpace } from '@guardian/source-foundations';
import Byline from 'components/editions/byline';
import HeaderMedia from 'components/editions/headerMedia';
import Headline from 'components/editions/headline';
import Lines from 'components/editions/lines';
import Series from 'components/editions/series';
import Standfirst from 'components/editions/standfirst';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import type { FC, ReactElement } from 'react';
import {
	articleMarginStyles,
	articlePaddingStyles,
	headerBackgroundColour,
	interviewBackgroundColour,
	sidePadding,
	tabletContentWidth,
	tabletImmersiveWidth,
	wideContentWidth,
	wideImmersiveWidth,
} from '../styles';

const wide = wideContentWidth + 12;
const tablet = tabletContentWidth + 12;

// ----- Component ----- //

interface HeaderProps {
	item: Item;
}

const headerStyles = css`
	${sidePadding}
`;

const galleryInnerHeaderStyles = css`
	${sidePadding}
	${articlePaddingStyles}
`;

const galleryHeaderStyles = css`
	border-bottom: 1px solid ${neutral[100]};
	${from.tablet} {
		border: none;
	}
`;

const pictureHeaderStyles = css`
	border: none;
`;

const galleryLinesStyles = css`
	${from.tablet} {
		margin-left: 0;
	}

	${from.desktop} {
		margin-left: 0;
	}

	${from.wide} {
		margin-left: 0;
	}
`;

const galleryHeaderBorderStyles = css`
	${from.tablet} {
		border-bottom: 1px solid ${neutral[100]};
		border-right: 1px solid ${neutral[100]};
		box-sizing: border-box;
		width: ${tablet}px;
		${from.desktop} {
			width: ${wide}px;
		}
	}
`;

const interviewStyles = (item: Item): SerializedStyles => {
	const backgroundColour = interviewBackgroundColour(item);

	return css`
		${articlePaddingStyles}
		background-color: ${backgroundColour};
	`;
};

const immersiveHeadlineStyles = (item: Item): SerializedStyles => {
	const backgroundColour = headerBackgroundColour(item);

	return css`
		position: relative;
		margin-top: -3.3125rem;
		margin-right: 3.625rem;
		z-index: 2;

		${from.tablet} {
			margin-top: -4.625rem;
			width: ${tabletImmersiveWidth}px;
		}

		${from.desktop} {
			width: ${wideImmersiveWidth}px;
		}

		${articlePaddingStyles}
		background-color: ${backgroundColour};
	`;
};

const immersiveStandfirstStyles = css`
	padding-left: ${remSpace[3]};
	padding-right: ${remSpace[3]};

	${from.tablet} {
		padding: 0;
	}

	${articleMarginStyles}
`;

const linesBorderStyles = css`
	${articleMarginStyles}

	${from.tablet} {
		border-right: 1px solid ${border.secondary};
	}
`;

const StandardHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderMedia item={item} />
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
		<HeaderMedia item={item} />
		<Standfirst item={item} />
		<Lines />
		<Byline item={item} />
	</header>
);

const AnalysisHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderMedia item={item} />
		<Series item={item} />
		<Headline item={item} />
		<Byline item={item} />
		<Lines />
		<Standfirst item={item} shareIcon />
	</header>
);

const CommentHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderMedia item={item} />
		<Headline item={item} />
		<Byline item={item} />
		<Lines />
		<Standfirst item={item} shareIcon />
	</header>
);

const InterviewHeader: FC<HeaderProps> = ({ item }) => (
	<header>
		<HeaderMedia item={item} />
		<div css={interviewStyles(item)}>
			<Headline item={item} />
			<Standfirst item={item} />
		</div>
		<Lines className={linesBorderStyles} />
		<Byline item={item} />
	</header>
);

const GalleryHeader: FC<HeaderProps> = ({ item }) => (
	<header css={galleryHeaderStyles}>
		<HeaderMedia item={item} />
		<div css={galleryInnerHeaderStyles}>
			<Series item={item} />
			<Headline item={item} />
			<div css={galleryHeaderBorderStyles}>
				<Standfirst item={item} />
				<Lines className={galleryLinesStyles} />
				<Byline item={item} />
			</div>
		</div>
	</header>
);

const PictureHeader: FC<HeaderProps> = ({ item }) => (
	<header css={pictureHeaderStyles}>
		<div css={galleryInnerHeaderStyles}>
			<div css={galleryHeaderBorderStyles}>
				<Headline item={item} />
				<Standfirst item={item} />
				<Lines className={galleryLinesStyles} />
				<Byline item={item} />
			</div>
		</div>
		<HeaderMedia item={item} />
	</header>
);

const ImmersiveHeader: FC<HeaderProps> = ({ item }) => (
	<header>
		<HeaderMedia item={item} />
		<div css={immersiveHeadlineStyles(item)}>
			<Headline item={item} />
		</div>
		<div css={immersiveStandfirstStyles}>
			<Standfirst item={item} />
			<Lines />
			<Byline item={item} />
		</div>
	</header>
);

const LetterHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderMedia item={item} />
		<Series item={item} />
		<Headline item={item} />
		{maybeRender(item.bylineHtml, (byline) => {
			if (byline.textContent === 'Letters') {
				return null;
			}

			return <Byline item={item} shareIcon={false} />;
		})}
		<Lines />
		<Standfirst item={item} shareIcon />
	</header>
);

const CorrectionsHeader: FC<HeaderProps> = ({ item }) => (
	<header css={headerStyles}>
		<HeaderMedia item={item} />
		<Series item={item} />
		<Headline item={item} />
		<Standfirst item={item} />
	</header>
);

const renderArticleHeader = (item: Item): ReactElement<HeaderProps> => {
	// ArticleDisplay.Immersive needs to come before ArticleDesign.Interview
	if (item.display === ArticleDisplay.Immersive) {
		return <ImmersiveHeader item={item} />;
	} else if (item.design === ArticleDesign.Editorial) {
		return <StandardHeader item={item} />;
	} else if (item.design === ArticleDesign.Letter) {
		return <LetterHeader item={item} />;
	} else if (item.design === ArticleDesign.Interview) {
		return <InterviewHeader item={item} />;
	} else if (item.design === ArticleDesign.Comment) {
		return <CommentHeader item={item} />;
	} else if (item.display === ArticleDisplay.Showcase) {
		return <ShowcaseHeader item={item} />;
	} else if (item.design === ArticleDesign.Analysis) {
		return <AnalysisHeader item={item} />;
	} else if (item.design === ArticleDesign.Correction) {
		return <CorrectionsHeader item={item} />;
	} else if (
		item.design === ArticleDesign.Gallery ||
		item.design === ArticleDesign.Audio ||
		item.design === ArticleDesign.Video
	) {
		return <GalleryHeader item={item} />;
	} else if (item.design === ArticleDesign.Picture) {
		return <PictureHeader item={item} />;
	} else {
		return <StandardHeader item={item} />;
	}
};

const Container: FC<HeaderProps> = ({ item }) => {
	return <>{renderArticleHeader(item)}</>;
};

// ----- Exports ----- //

export default Container;
