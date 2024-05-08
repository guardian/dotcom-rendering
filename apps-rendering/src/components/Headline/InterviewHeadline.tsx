import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	headlineBold34,
	remSpace,
} from '@guardian/source-foundations';
import DesignTag from 'components/DesignTag';
import HeadlineByline from 'components/HeadlineByline';
import type { Item } from 'item';
import { getFormat } from 'item';
import { background, text } from 'palette';
import { darkModeCss } from 'styles';
import { defaultStyles } from './Headline.defaults';

interface Props {
	item: Item;
}

const interviewStyles = css`
	${headlineBold28};
	line-height: 1.25;
	${from.tablet} {
		${headlineBold34};
		line-height: 1.25;
	}
`;

const InterviewHeadline: React.FC<Props> = ({ item }) => {
	const format = getFormat(item);

	return (
		<>
			<nav>
				<a href="https://www.theguardian.com/tone/interview">
					<DesignTag format={format} />
				</a>
			</nav>
			<div
				css={css`
					padding: 0 ${remSpace[12]} 0 0;
					${from.wide} {
						margin: 0 auto;
					}
					${from.phablet} {
						width: 38.75rem;
					}
				`}
			>
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
		</>
	);
};

export default InterviewHeadline;
