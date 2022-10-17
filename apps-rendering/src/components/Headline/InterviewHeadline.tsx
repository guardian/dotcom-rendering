import { css } from '@emotion/react';
import {
	background,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import { from, headline, remSpace } from '@guardian/source-foundations';
import { fromNullable, OptionKind } from '@guardian/types';
import HeadlineByline from 'components/HeadlineByline';
import HeadlineTag from 'components/HeadlineTag';
import type { Item } from 'item';
import { getFormat } from 'item';
import { darkModeCss } from 'styles';
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
	const interviewToneTag = fromNullable(
		item.tags.find((tag) => tag.id === 'tone/interview'),
	);
	const headlineTag = <HeadlineTag tagText="Interview" format={format} />;

	return (
		<div
			css={css`
				padding: ${remSpace[4]} ${remSpace[12]} 0 0;
				${from.wide} {
					margin: 0 auto;
				}
				${from.phablet} {
					width: 38.75rem;
				}
			`}
		>
			{interviewToneTag.kind === OptionKind.Some ? (
				<nav>
					<a href={interviewToneTag.value.webUrl}>{headlineTag}</a>
				</nav>
			) : (
				headlineTag
			)}
			<h1 css={css(defaultStyles(item), interviewStyles)}>
				<span
					css={css`
						color: ${text.headline(format)};
						background-color: ${background.headline(format)};
						position: relative;
						white-space: pre-wrap;
						padding: 0 ${remSpace[3]} ${remSpace[1]};
						display: inline;
						box-decoration-break: clone;
						${from.wide} {
							padding: 0 ${remSpace[2]} ${remSpace[1]};
						}
						${darkModeCss`
							background-color: ${background.headlineDark(format)};
						`};
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
