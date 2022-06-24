// ----- Imports ----- //
import { text } from '@guardian/common-rendering/src/editorialPalette';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import type { Option } from '@guardian/types';
import type { FC } from 'react';
import { getThemeStyles } from 'themeStyles';
import {
	defaultAnchorStyles,
	DefaultByline,
	defaultStyles,
} from './Byline.defaults';
import CommentByline from './CommentByline';
import DeadBlogByline from './DeadBlogByline';
import LabsByline from './LabsByline';
import LiveBlogByline from './LiveBlogByline';

// ----- Component ----- //

interface Props extends ArticleFormat {
	bylineHtml: Option<DocumentFragment>;
}

const Byline: FC<Props> = ({ bylineHtml, ...format }) => {
	const { kicker, inverted } = getThemeStyles(format.theme);

	if (format.theme === ArticleSpecial.Labs) {
		return <LabsByline bylineHtml={bylineHtml} format={format} />;
	}

	switch (format.design) {
		case ArticleDesign.Interview:
			return null;
		case ArticleDesign.LiveBlog:
			return <LiveBlogByline bylineHtml={bylineHtml} format={format} />;
		case ArticleDesign.DeadBlog:
			return <DeadBlogByline bylineHtml={bylineHtml} format={format} />;
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return <CommentByline bylineHtml={bylineHtml} format={format} />;
		default:
			return (
				<DefaultByline
					bylineHtml={bylineHtml}
					styles={defaultStyles(text.bylineLeftColumn(format))}
					anchorStyles={defaultAnchorStyles(kicker, inverted)}
					format={format}
				/>
			);
	}
};

// ----- Exports ----- //

export default Byline;
