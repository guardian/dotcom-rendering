import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	background,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { headline, remSpace } from '@guardian/source-foundations';
import HeadlineByline from 'components/headlineByline';
import HeadlineTag from 'components/headlineTag';
import { headlineTextColour } from 'editorialStyles';
import type { Item } from 'item';
import { getFormat } from 'item';
import { articleWidthStyles } from 'styles';

interface Props {
	item: Item;
}

const headlineStyles = (format: ArticleFormat): SerializedStyles => {
	return css`
		color: ${text.headline(format)};
		background-color: ${background.headline(format)};
		position: relative;
		white-space: pre-wrap;
		padding: 0 ${remSpace[1]};
		display: inline;
		box-decoration-break: clone;
	`;
};

const InterviewHeadline: React.FC<Props> = ({ item }) => {
	const format = getFormat(item);

	return (
		<>
			<div css={articleWidthStyles}>
				<HeadlineTag tagText="Interview" format={format} />
			</div>
			<h1
				css={css`
					${headlineTextColour(format)}
					margin: 0;
					${articleWidthStyles}

					${headline.medium({ fontWeight: 'bold' })}
						line-height: 1.25;
				`}
			>
				<span css={headlineStyles(format)}>{item.headline}</span>
			</h1>
			<div css={articleWidthStyles}>
				<HeadlineByline bylineHtml={item.bylineHtml} format={format} />
			</div>
		</>
	);
};

export default InterviewHeadline;
