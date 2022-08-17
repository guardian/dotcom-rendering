import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { headline, until } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { DefaultByline } from './Byline.defaults';

const blogStyles = css`
	${headline.medium({
		fontWeight: 'light',
	})}
	color: green;
	// background: yellow;
	line-height: 38px;
	display: flex;
	flex-direction: column;
	font-style: italic;

	${until.mobileMedium} {
		${headline.small({
			fontWeight: 'light',
		})}
	}
`;

const blogAnchorStyles = css`
	color: red;
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
`;

interface Props {
	bylineHtml: Option<DocumentFragment>;
	format: ArticleFormat;
}

const DeadblogByline: React.FC<Props> = ({ format, bylineHtml }) => (
	<DefaultByline
		format={format}
		bylineHtml={bylineHtml}
		styles={css(blogStyles)}
		anchorStyles={css(blogAnchorStyles)}
	/>
);

export default DeadblogByline;
