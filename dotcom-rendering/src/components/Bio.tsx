import { css } from '@emotion/react';
import { neutral, space, textSans14 } from '@guardian/source/foundations';
import sanitise from 'sanitize-html';
import { palette } from '../palette';

/** Nesting is necessary in the bio styles because we receive a string of html from the
 * field. This can contain the following tags:
 * Blocks: p, ul, li
 * Inline: strong, em, a
 */
const bioStyles = css`
	${textSans14};
	padding: ${space[1]}px 0;
	color: ${palette('--mini-profiles-text-subdued')};
	p {
		margin-bottom: ${space[2]}px;
	}
	a {
		color: ${palette('--link-kicker-text')};
		text-underline-offset: 3px;
	}
	a:not(:hover) {
		text-decoration-color: ${neutral[86]};
	}
	a:hover {
		text-decoration: underline;
	}
	ul {
		list-style: none;
		margin: 0 0 ${space[2]}px;
		padding: 0;
	}
	ul li {
		padding-left: ${space[5]}px;
	}
	ul li p {
		display: inline-block;
		margin-bottom: 0;
	}
	ul li:before {
		display: inline-block;
		content: '';
		border-radius: 0.375rem;
		height: 10px;
		width: 10px;
		margin: 0 ${space[2]}px 0 -${space[5]}px;
		background-color: ${palette('--bullet-fill')};
	}
	strong {
		font-weight: bold;
	}
`;

const bottomBorderStyles = css`
	border-top: 1px solid ${palette('--article-border')};
	margin-bottom: ${space[2]}px;
`;

const containsText = (html: string) => {
	const htmlWithoutTags = sanitise(html, {
		allowedTags: [],
		allowedAttributes: {},
	});
	return htmlWithoutTags.length > 0;
};

export const Bio = ({ html }: { html?: string }) => {
	if (!html || !containsText(html)) return null;
	const sanitizedHtml = sanitise(html, {});
	return (
		<>
			<div
				css={bioStyles}
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
			<div css={bottomBorderStyles} />
		</>
	);
};
