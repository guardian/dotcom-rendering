import { css } from '@emotion/react';
import {
	background,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import { from, headline, remSpace } from '@guardian/source-foundations';
import HeadlineByline from 'components/HeadlineByline';
import HeadlineTag from 'components/HeadlineTag';
import type { Item } from 'item';
import { getFormat } from 'item';
import { defaultStyles } from './Headline.defaults';

interface Props {
	item: Item;
}

const interviewStyles = css`
	${headline.small({ fontWeight: 'bold' })}
	line-height: 1.25;
	${from.tablet} {
		${headline.medium({ fontWeight: 'bold' })}
		line-height: 1.25;
	}
`;

const InterviewHeadline: React.FC<Props> = ({ item }) => {
	const format = getFormat(item);

	return (
		<div
			css={css`
				padding-left: 0;
				padding-right: ${remSpace[12]};
				position: relative;
				${from.wide} {
					margin: 0 auto;
				}
				${from.phablet} {
					width: 38.75rem;
				}
			`}
		>
			<HeadlineTag tagText="Interview" format={format} />
			<h1 css={css(defaultStyles(item), interviewStyles)}>
				<span
					css={css`
						color: ${text.headline(format)};
						background-color: ${background.headline(format)};
						position: relative;
						white-space: pre-wrap;
						padding: 0 ${remSpace[1]};
						display: inline;
						box-decoration-break: clone;
					`}
				>
					{item.headline}
				</span>
			</h1>
			<HeadlineByline bylineHtml={item.bylineHtml} format={format} />
		</div>
	);
};

export default InterviewHeadline;
