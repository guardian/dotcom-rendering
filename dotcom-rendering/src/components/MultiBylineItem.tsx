import { css } from '@emotion/react';
import { type ArticleFormat } from '@guardian/libs';
import { neutral, space, textSans14 } from '@guardian/source/foundations';
import sanitise from 'sanitize-html';
import { slugify } from '../model/enhance-H2s';
import { palette } from '../palette';
import type { MultiBylineItem as MultiBylineItemModel } from '../types/content';
import { headingLineStyles } from './KeyTakeaway';
import { subheadingStyles } from './Subheading';

const multiBylineItemStyles = css`
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

const bottomBorderStyles = css`
	border-top: 1px solid ${palette('--article-border')};
	margin-bottom: ${space[2]}px;
`;

const headingMarginStyle = css`
	margin-bottom: ${space[2]}px;
`;

interface MultiBylineItemProps {
	multiBylineItem: MultiBylineItemModel;
	format: ArticleFormat;
	children: React.ReactNode;
}

export const MultiBylineItem = ({
	multiBylineItem,
	format,
	children,
}: MultiBylineItemProps) => {
	return (
		<>
			<li css={multiBylineItemStyles} data-spacefinder-role="nested">
				<hr css={headingLineStyles} />
				<Byline
					title={multiBylineItem.title}
					byline={multiBylineItem.byline ?? ''}
					bylineHtml={multiBylineItem.bylineHtml ?? ''}
					contributors={multiBylineItem.contributors ?? []}
					format={format}
				/>
				<Bio html={multiBylineItem.bio} />
				{children}
			</li>
		</>
	);
};

type BylineProps = {
	title: string;
	bylineHtml: string;
	byline: string;
	imageOverrideUrl?: string;
	contributors: BlockContributor[];
	format: ArticleFormat;
};

const Byline = ({
	title,
	bylineHtml,
	byline,
	imageOverrideUrl,
	contributors,
	format,
}: BylineProps) => {
	const sanitizedHtml = sanitise(bylineHtml, {});

	return (
		<div>
			<div>
				<h3
					id={slugify(title)}
					css={[subheadingStyles(format), headingMarginStyle]}
				>
					{title}
				</h3>
				{bylineHtml ? (
					<h3
						css={[subheadingStyles(format), headingMarginStyle]}
						dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
					/>
				) : null}
			</div>
			{imageOverrideUrl ?? contributors[0]?.imageUrl ? (
				<img
					src={imageOverrideUrl ?? contributors[0]?.imageUrl}
					alt={byline}
				></img>
			) : null}
		</div>
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
