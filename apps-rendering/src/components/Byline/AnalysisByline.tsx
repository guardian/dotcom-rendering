import { css } from '@emotion/react';
import {
	background,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { headline, remSpace, until } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { darkModeCss } from 'styles';
import { DefaultByline } from './Byline.defaults';

const styles = (format: ArticleFormat) => css`
	${headline.medium({
		fontWeight: 'light',
		fontStyle: 'italic',
		lineHeight: 'tight',
	})}

	color: ${text.byline(format)};
	display: flex;
	flex-direction: column;

	${until.mobileMedium} {
		${headline.small({
			fontWeight: 'light',
			fontStyle: 'italic',
			lineHeight: 'tight',
		})}
	}
	padding-bottom: ${remSpace[6]};
`;

const anchorStyles = (format: ArticleFormat) => css`
	color: ${background.byline(format)};

	${darkModeCss`
	color: ${background.byline(format)};
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

const AnalysisByline: React.FC<Props> = ({ format, bylineHtml }) => (
	<DefaultByline
		format={format}
		bylineHtml={bylineHtml}
		styles={styles(format)}
		anchorStyles={anchorStyles(format)}
	/>
);

export default AnalysisByline;
