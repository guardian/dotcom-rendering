import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	headlineLightItalic28,
	headlineLightItalic34,
	remSpace,
	until,
} from '@guardian/source/foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { text } from 'palette';
import { darkModeCss } from 'styles';
import { DefaultByline } from './Byline.defaults';

const styles = (format: ArticleFormat): SerializedStyles => css`
	${headlineLightItalic34};
	color: ${text.byline(format)};
	display: flex;
	flex-direction: column;

	${until.tablet} {
		${headlineLightItalic28}
	}
	padding-bottom: ${remSpace[6]};

	${darkModeCss`
		color: ${text.bylineDark(format)};
	`}
`;

const anchorStyles = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.bylineAnchor(format)};

	${darkModeCss`
	color: ${text.bylineAnchorDark(format)};
	`}

	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
`;

interface Props {
	bylineHtml: Option<DocumentFragment>;
	format: ArticleFormat;
}

const AnalysisByline = ({ format, bylineHtml }: Props) => (
	<DefaultByline
		format={format}
		bylineHtml={bylineHtml}
		styles={styles(format)}
		anchorStyles={anchorStyles(format)}
	/>
);

export default AnalysisByline;
