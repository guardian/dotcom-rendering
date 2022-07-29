import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { border, text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { headline, neutral, remSpace } from '@guardian/source-foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

const deadblogStyles = (format: ArticleFormat): SerializedStyles => {
	const colour = text.standfirstLink(format);

	return css`
		${headline.xxxsmall({ fontWeight: 'bold' })};
		margin-bottom: 0;
		padding-bottom: ${remSpace[3]};

		p {
			margin: 0;
			padding: 0.75rem 0;

			${darkModeCss`color: ${neutral[93]};`}
		}

		ul {
			margin-bottom: 0;

			> li::before {
				background-color: ${neutral[60]};
			}
		}

		a {
			text-decoration: none;
		}

		a:link {
			color: ${colour};
			border-bottom: 1px solid ${neutral[86]};
		}

		a:hover {
			color: ${colour};
			border-bottom: 1px solid ${colour};
		}

		${darkModeCss`
			a:link, a:hover {
				color: ${text.standfirstLinkDark(format)};
				border-bottom-color: ${border.standfirstLinkDark(format)};
			}
		`}
	`;
};

interface Props {
	item: Item;
}

const DeadBlogStandfirst: FC<Props> = ({ item }) => {
	const format = getFormat(item);

	return (
		<DefaultStandfirst
			item={item}
			css={css(defaultStyles(format), deadblogStyles(format))}
		/>
	);
};

export default DeadBlogStandfirst;
