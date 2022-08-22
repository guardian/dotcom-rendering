import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import {
	between,
	body,
	headline,
	space,
	textSans,
} from '@guardian/source-foundations';
import type { Palette } from '../../types/palette';
import { ArticleRenderer } from '../lib/ArticleRenderer';
import { decidePalette } from '../lib/decidePalette';
import { LiveBlogRenderer } from '../lib/LiveBlogRenderer';
import { revealStyles } from '../lib/revealStyles';

type Props = {
	format: ArticleFormat;
	blocks: Block[];
	pinnedPost?: Block;
	adTargeting: AdTargeting;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	switches: { [key: string]: boolean };
	section: string;
	shouldHideReaderRevenue: boolean;
	tags: TagType[];
	isPaidContent: boolean;
	contributionsServiceUrl: string;
	contentType: string;
	sectionName: string;
	isPreview?: boolean;
	idUrl: string;
	isSensitive: boolean;
	isDev: boolean;
	onFirstPage?: boolean;
	keyEvents?: Block[];
	filterKeyEvents?: boolean;
	availableTopics?: Topic[];
	selectedTopics?: Topic[];
};

const globalH2Styles = (display: ArticleDisplay) => css`
	h2:not([data-ignore='global-h2-styling']) {
		${display === ArticleDisplay.Immersive
			? headline.medium({ fontWeight: 'light' })
			: headline.xxsmall({ fontWeight: 'bold' })};
	}
`;

const globalOlStyles = () => css`
	ol:not([data-ignore='global-ol-styling']) {
		counter-reset: li;
		li:before {
			${body.medium({ lineHeight: 'tight' })};
			content: counter(li);
			counter-increment: li;
			margin-right: ${space[1]}px;
		}
	}
`;

const globalH3Styles = (display: ArticleDisplay) => {
	switch (display) {
		case ArticleDisplay.NumberedList:
			return css`
				h3 {
					${headline.xsmall({ fontWeight: 'bold' })};
					margin-bottom: ${space[2]}px;
				}
			`;
		default:
			return css`
				h3 {
					${body.medium({ fontWeight: 'bold' })};
					margin-bottom: ${space[4]}px;
				}
			`;
	}
};

const globalStrongStyles = css`
	strong {
		font-weight: bold;
	}
`;

const bodyPadding = css`
	${between.tablet.and.desktop} {
		padding-right: 80px;
	}
`;

const globalLinkStyles = (palette: Palette) => css`
	a:not([data-ignore='global-link-styling']) {
		text-decoration: none;
		border-bottom: 1px solid ${palette.border.articleLink};
		color: ${palette.text.articleLink};

		:hover {
			color: ${palette.text.articleLinkHover};
			border-bottom: 1px solid ${palette.border.articleLinkHover};
		}
	}
`;

export const ArticleBody = ({
	format,
	blocks,
	pinnedPost,
	adTargeting,
	host,
	pageId,
	webTitle,
	ajaxUrl,
	switches,
	isAdFreeUser,
	section,
	shouldHideReaderRevenue,
	tags,
	isPaidContent,
	contributionsServiceUrl,
	contentType,
	sectionName,
	isPreview,
	idUrl,
	isSensitive,
	isDev,
	onFirstPage,
	keyEvents,
	filterKeyEvents,
	availableTopics,
	selectedTopics,
}: Props) => {
	const isInteractive = format.design === ArticleDesign.Interactive;
	const palette = decidePalette(format);

	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
		return (
			<>
				<div
					tabIndex={0}
					id="liveblog-body"
					// This classname is used by Spacefinder as the container in which it'll attempt to insert inline ads
					className="js-liveblog-body"
					css={[
						globalStrongStyles,
						globalH2Styles(format.display),
						globalH3Styles(format.display),
						globalLinkStyles(palette),
						// revealStyles is used to animate the reveal of new blocks
						(format.design === ArticleDesign.DeadBlog ||
							format.design === ArticleDesign.LiveBlog) &&
							revealStyles,
					]}
				>
					<LiveBlogRenderer
						format={format}
						blocks={blocks}
						pinnedPost={pinnedPost}
						adTargeting={adTargeting}
						host={host}
						pageId={pageId}
						webTitle={webTitle}
						ajaxUrl={ajaxUrl}
						switches={switches}
						isAdFreeUser={isAdFreeUser}
						isSensitive={isSensitive}
						isLiveUpdate={false}
						section={section}
						shouldHideReaderRevenue={shouldHideReaderRevenue}
						tags={tags}
						isPaidContent={isPaidContent}
						contributionsServiceUrl={contributionsServiceUrl}
						onFirstPage={onFirstPage}
						keyEvents={keyEvents}
						filterKeyEvents={filterKeyEvents}
						availableTopics={availableTopics}
						selectedTopics={selectedTopics}
					/>
				</div>
			</>
		);
	}
	return (
		<div
			tabIndex={0}
			id="maincontent"
			css={[
				isInteractive ? null : bodyPadding,
				globalH2Styles(format.display),
				globalH3Styles(format.display),
				globalOlStyles(),
				globalStrongStyles,
				globalLinkStyles(palette),
			]}
		>
			<ArticleRenderer
				format={format}
				elements={blocks[0] ? blocks[0].elements : []}
				adTargeting={adTargeting}
				host={host}
				pageId={pageId}
				webTitle={webTitle}
				ajaxUrl={ajaxUrl}
				contentType={contentType}
				sectionName={sectionName}
				tags={tags}
				isPaidContent={isPaidContent}
				isPreview={isPreview}
				idUrl={idUrl}
				switches={switches}
				isDev={isDev}
				isAdFreeUser={isAdFreeUser}
				isSensitive={isSensitive}
			/>
		</div>
	);
};
