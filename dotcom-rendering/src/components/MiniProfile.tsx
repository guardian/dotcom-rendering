import { css } from '@emotion/react';
import { neutral, space, textSans14 } from '@guardian/source/foundations';
import sanitise from 'sanitize-html';
import type { ArticleFormat } from '../lib/format';
import { slugify } from '../model/enhance-H2s';
import { palette } from '../palette';
import type { MiniProfile as MiniProfileModel } from '../types/content';
import { headingLineStyles } from './KeyTakeaway';
import { subheadingStyles } from './Subheading';

const miniProfileStyles = css`
	padding-top: 8px;
`;

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

const endNoteStyles = css`
	${textSans14};
	color: ${palette('--mini-profiles-text-subdued')};
	margin-bottom: ${space[3]}px;
`;

const bottomBorderStyles = css`
	border-top: 1px solid ${palette('--article-border')};
	margin-bottom: ${space[2]}px;
`;

const headingMarginStyle = css`
	margin-bottom: ${space[2]}px;
`;

interface MiniProfileProps {
	miniProfile: MiniProfileModel;
	format: ArticleFormat;
	children: React.ReactNode;
}

export const MiniProfile = ({
	miniProfile,
	format,
	children,
}: MiniProfileProps) => {
	return (
		<>
			<li css={miniProfileStyles} data-spacefinder-role="nested">
				<hr css={headingLineStyles} />
				<h3
					id={slugify(miniProfile.title)}
					css={[subheadingStyles(format), headingMarginStyle]}
				>
					{miniProfile.title}
				</h3>
				<Bio html={miniProfile.bio} />
				{children}
				{miniProfile.endNote ? (
					<EndNote text={miniProfile.endNote} />
				) : null}
			</li>
		</>
	);
};

const Bio = ({ html }: { html?: string }) => {
	if (!html) return null;
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

const EndNote = ({ text }: { text?: string }) => {
	if (!text) return null;
	return (
		<p css={endNoteStyles}>
			<em>{text}</em>
		</p>
	);
};
