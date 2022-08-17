import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	headline,
	neutral,
	remSpace,
	until,
} from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { darkModeCss } from 'styles';
import { DefaultByline } from './Byline.defaults';

const styles = css`
	${headline.medium({
		fontWeight: 'light',
	})}

	color: ${neutral[46]};
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
		styles={css(blogStyles)}
		anchorStyles={css([blogAnchorStyles(format)])}
	/>
);

export default AnalysisByline;
