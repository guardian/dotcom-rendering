import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { headline, remSpace, until } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { DefaultByline } from './Byline.defaults';

const blogStyles = css`
	${headline.medium({
		fontWeight: 'light',
	})}
	color: #707070;
	line-height: 38px;
	display: flex;
	flex-direction: column;
	font-style: italic;

	${until.mobileMedium} {
		${headline.small({
			fontWeight: 'light',
		})}
	}
	padding-bottom: ${remSpace[6]};
`;

const blogAnchorStyles = css`
	color: #ab0613;
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
`;

interface Props {
	bylineHtml: Option<DocumentFragment>;
	format: ArticleFormat;
}

const AnalysisByline: React.FC<Props> = ({ format, bylineHtml }) => (
	<DefaultByline
		format={format}
		bylineHtml={bylineHtml}
		styles={css(blogStyles)}
		anchorStyles={css(blogAnchorStyles)}
	/>
);

export default AnalysisByline;
