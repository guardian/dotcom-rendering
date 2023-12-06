// ----- Imports ----- //
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import type { Option } from '../../../vendor/@guardian/types/index';
import type { FC } from 'react';
import AnalysisByline from './AnalysisByline';
import {
	defaultAnchorStyles,
	DefaultByline,
	defaultStyles,
} from './Byline.defaults';
import CommentByline from './CommentByline';
import DeadBlogByline from './DeadBlogByline';
import GalleryByline from './GalleryByline';
import LabsByline from './LabsByline';
import LiveBlogByline from './LiveBlogByline';

// ----- Component ----- //

interface Props extends ArticleFormat {
	bylineHtml: Option<DocumentFragment>;
}

const Byline: FC<Props> = ({ bylineHtml, ...format }) => {
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
		case ArticleDesign.Comment:
			return <CommentByline bylineHtml={bylineHtml} format={format} />;
		case ArticleDesign.Analysis:
			return <AnalysisByline bylineHtml={bylineHtml} format={format} />;
		case ArticleDesign.Gallery:
			return <GalleryByline bylineHtml={bylineHtml} format={format} />;
		default:
			return (
				<DefaultByline
					bylineHtml={bylineHtml}
					styles={defaultStyles(format)}
					anchorStyles={defaultAnchorStyles(format)}
					format={format}
				/>
			);
	}
};

// ----- Exports ----- //

export default Byline;
