import React from 'react';
import { JSDOM } from 'jsdom';
import { css } from '@emotion/react';

import { palette } from '@guardian/src-foundations';
import { body } from '@guardian/src-foundations/typography';

import { pillarPalette_DO_NOT_USE, neutralBorder } from '@root/src/lib/pillars';

export const ListStyle = (iconColour: string) => css`
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

const LinkStyle = (pillar: Theme) => css`
	a {
		color: ${pillarPalette_DO_NOT_USE[pillar].dark};
		text-decoration: none;
		border-bottom: 1px solid ${neutralBorder(pillar)};
		:hover {
			border-bottom: 1px solid ${pillarPalette_DO_NOT_USE[pillar].dark};
		}
	}
`;

const TextStyle = (pillar: Theme) => css`
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

const makeFallback = (html: string): string | null => {
	const { window } = new JSDOM(html);
	const blockquotes = window.document.getElementsByTagName('blockquote');

	if (blockquotes.length !== 1) {
		return null;
	}

	const q = blockquotes[0];
	return q.innerHTML;
};

export const TwitterBlockComponent: React.FC<{
	element: TweetBlockElement;
	pillar: Theme;
}> = ({ element, pillar }) => {
	const fallbackHTML = makeFallback(element.html);

	return (
		<amp-twitter
			width="2"
			height={element.hasMedia ? 2 : 1}
			layout="responsive"
			data-tweetid={element.id}
			data-dnt="true"
		>
			{fallbackHTML && (
				<div placeholder="" css={TextStyle(pillar)}>
					<blockquote
						dangerouslySetInnerHTML={{ __html: fallbackHTML }}
					/>
				</div>
			)}
		</amp-twitter>
	);
};
