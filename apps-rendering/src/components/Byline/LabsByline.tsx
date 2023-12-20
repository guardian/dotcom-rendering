import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { labs, textSans } from '@guardian/source-foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { darkModeCss } from 'styles';
import { DefaultByline } from './Byline.defaults';

const labsStyles = css`
	${textSans.medium({ lineHeight: 'regular', fontStyle: 'italic' })}
	color: ${labs[300]};

	${darkModeCss`
        color: ${labs[400]};
    `}
`;

const labsAnchorStyles = css`
	font-weight: bold;
	color: ${labs[300]};
	font-style: normal;
	text-decoration: none;

	${darkModeCss`
        color: ${labs[400]};
    `}
`;

interface Props {
	bylineHtml: Option<DocumentFragment>;
	format: ArticleFormat;
}

const CommentByline: React.FC<Props> = ({ format, bylineHtml }) => {
	return (
		<DefaultByline
			format={format}
			bylineHtml={bylineHtml}
			styles={labsStyles}
			anchorStyles={labsAnchorStyles}
		/>
	);
};

export default CommentByline;
