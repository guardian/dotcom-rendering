import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	background,
	border,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { headline, remSpace } from '@guardian/source-foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { renderStandfirstText } from 'renderer';
import { darkModeCss } from 'styles';

const darkStyles = (format: ArticleFormat): SerializedStyles => darkModeCss`
    background-color: ${background.standfirstDark(format)};
    color: ${text.standfirstDark(format)};

    a {
        color: ${text.standfirstLinkDark(format)};
		border-bottom: 0.0625rem solid ${border.standfirstLinkDark(format)};
    }
`;

export const defaultStyles = (format: ArticleFormat): SerializedStyles => css`
	${headline.xxxsmall({ fontWeight: 'bold' })}
	padding: 0;
	margin-bottom: ${remSpace[3]};
	color: ${text.standfirst(format)};

	background-color: ${background.standfirst(format)};

	p,
	ul {
		padding: ${remSpace[3]} 0 0;
		margin: 0;
	}

	address {
		font-style: normal;
	}

	a {
		text-decoration: none;
		border-bottom: 0.0625rem solid ${border.standfirstBlogLink(format)};
	}

	${darkStyles(format)}
`;

interface Props {
	item: Item;
	css: SerializedStyles;
	className?: string;
}

const DefaultStandfirst: FC<Props> = ({ item, className }) =>
	maybeRender(item.standfirst.toOption(), (standfirst) => (
			<div className={className}>
				{renderStandfirstText(standfirst, getFormat(item))}
			</div>
		),
	);

export default DefaultStandfirst;
