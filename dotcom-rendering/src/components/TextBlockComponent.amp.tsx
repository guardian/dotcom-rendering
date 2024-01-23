import { css } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import { body, palette, textSans } from '@guardian/source-foundations';
import sanitise from 'sanitize-html';
import { neutralBorder, pillarPalette_DO_NOT_USE } from '../lib/pillars';

// Note, this should only apply basic text styling. It is a case where we want
// to re-use styling, but generally we should avoid this as it couples
// components.

const ListStyle = (iconColour: string) => css`
	li {
		margin-bottom: 6px;
		padding-left: 20px;
		p {
			display: inline;
		}
	}

	li:before {
		display: inline-block;
		content: '';
		border-radius: 6px;
		height: 12px;
		width: 12px;
		margin-right: 8px;
		background-color: ${iconColour};
		margin-left: -20px;
	}
`;

const LinkStyle = (pillar: ArticleTheme) => css`
	a {
		color: ${pillarPalette_DO_NOT_USE[pillar].dark};
		text-decoration: none;
		border-bottom: 1px solid ${neutralBorder(pillar)};
		:hover {
			border-bottom: 1px solid ${pillarPalette_DO_NOT_USE[pillar].dark};
		}
	}
`;

const TextStyle = (pillar: ArticleTheme) => css`
	strong {
		font-weight: 700;
	}
	p {
		padding: 0 0 12px;
		${body.medium()};
		font-weight: 300;
		word-wrap: break-word;
		color: ${palette.neutral[7]};
	}

	blockquote {
		margin-left: 20px;
		font-style: italic;
	}

	${body.medium()};

	${LinkStyle(pillar)};
	${ListStyle(neutralBorder(pillar))};
`;

// Labs paid content only
const textStyleLabs = css`
	p {
		${textSans.large()}
	}
`;

type Props = {
	html: string;
	pillar: ArticleTheme;
};

export const TextBlockComponent = ({ html, pillar }: Props) => (
	<span
		css={
			pillar === ArticleSpecial.Labs
				? [TextStyle(pillar), textStyleLabs]
				: TextStyle(pillar)
		}
		dangerouslySetInnerHTML={{
			__html: sanitise(html),
		}}
	/>
);
