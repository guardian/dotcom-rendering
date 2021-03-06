import React from 'react';
import { css } from 'emotion';

import { from } from '@guardian/src-foundations/mq';
import { neutral, space } from '@guardian/src-foundations';

import { ElementRenderer } from '@root/src/web/lib/ElementRenderer';
import { decidePalette } from '@root/src/web/lib/decidePalette';
import { makeRelativeDate } from '@root/src/web/lib/dateTime';

import { Hide } from '@root/src/web/components/Hide';
import { ShareIcons } from '@root/src/web/components/ShareIcons';
import { headline, textSans } from '@guardian/src-foundations/typography';

const ASIDE_WIDTH = 58;
const GUTTER = space[3];

type Props = {
	format: Format;
	block: Block;
	pageId: string;
	webTitle: string;
	abTests: CAPIType['config']['abTests'];
	adTargeting: AdTargeting;
	host?: string;
};

const Container = ({
	id,
	children,
	palette,
}: {
	id: string;
	children: React.ReactNode;
	palette: Palette;
}) => {
	return (
		<div
			id={`block-${id}`}
			className={css`
				padding-top: ${space[2]}px;
				padding-bottom: ${space[3]}px;
				margin-bottom: ${space[3]}px;
				background: ${neutral[100]};
				border-top: 1px solid ${palette.border.liveBlock};
			`}
		>
			{children}
		</div>
	);
};

const Header = ({ children }: { children: React.ReactNode }) => {
	return (
		<header
			className={css`
				padding-right: ${GUTTER}px;
				display: flex;
				flex-direction: column;
				${from.phablet} {
					flex-direction: row;
				}
			`}
		>
			{children}
		</header>
	);
};

const Footer = ({ children }: { children: React.ReactNode }) => {
	return (
		<footer
			className={css`
				margin-left: ${ASIDE_WIDTH}px;
				padding-left: ${GUTTER}px;
				padding-right: ${GUTTER}px;
			`}
		>
			{children}
		</footer>
	);
};

const BlockMedia = ({ children }: { children: React.ReactNode }) => {
	return (
		// Don't set side margins, causing content to flow to the edges (but
		// we do set margins on any figcaption)
		<div
			className={css`
				& figcaption {
					margin-left: ${ASIDE_WIDTH}px;
					padding-left: ${GUTTER}px;
					padding-right: ${GUTTER}px;
				}
			`}
		>
			{children}
		</div>
	);
};

const BlockText = ({ children }: { children: React.ReactNode }) => {
	return (
		// Set a left margin the same with as the left aside column plus
		// padding gutters on both sides
		<div
			className={css`
				margin-left: ${ASIDE_WIDTH}px;
				padding-left: ${GUTTER}px;
				padding-right: ${GUTTER}px;
			`}
		>
			{children}
		</div>
	);
};

const BlockTitle = ({ title }: { title: string }) => {
	return (
		<h2
			className={css`
				${headline.xxsmall({ fontWeight: 'bold' })}
				margin-bottom: ${space[3]}px;
			`}
		>
			{title}
		</h2>
	);
};

const LastUpdated = ({
	lastUpdatedDisplay,
	lastUpdated,
}: {
	lastUpdatedDisplay: string;
	lastUpdated: number;
}) => {
	return (
		<div
			className={css`
				display: flex;
				align-items: flex-end;
				${textSans.xsmall()};
				color: ${neutral[46]};
			`}
		>
			<time dateTime={new Date(lastUpdated).toISOString()}>
				{`Updated at ${lastUpdatedDisplay}`}
			</time>
		</div>
	);
};

const FirstPublished = ({
	firstPublished,
	blockLink,
}: {
	firstPublished: number;
	blockLink: string;
}) => {
	const publishedDate = new Date(firstPublished);
	return (
		<a
			href={blockLink}
			data-ignore="global-link-styling"
			// title={publishedDate.toLocaleString()}
			className={css`
				${textSans.xsmall({ fontWeight: 'bold' })}
				margin-bottom: ${space[1]}px;
				padding-top: ${space[1]}px;
				display: flex;
				flex-direction: row;
				${from.phablet} {
					flex-direction: column;
				}
				text-decoration: none;
				:hover {
					filter: brightness(30%);
				}
			`}
		>
			<time
				dateTime={publishedDate.toISOString()}
				className={css`
					color: ${neutral[20]};
				`}
			>
				{makeRelativeDate(firstPublished, {
					format: 'med',
				})}
			</time>
			<span
				className={css`
					${textSans.xsmall()};
					color: ${neutral[46]};
				`}
			>
				{`${publishedDate.getHours()}:${publishedDate.getMinutes()}`}
			</span>
		</a>
	);
};

const typesWeStretch: CAPIElement['_type'][] = [
	'model.dotcomrendering.pageElements.YoutubeBlockElement',
	'model.dotcomrendering.pageElements.ImageBlockElement',
	'model.dotcomrendering.pageElements.VideoBlockElement',
	'model.dotcomrendering.pageElements.VideoFacebookBlockElement',
	'model.dotcomrendering.pageElements.VideoVimeoBlockElement',
	'model.dotcomrendering.pageElements.WitnessBlockElement',
	'model.dotcomrendering.pageElements.VineBlockElement',
	'model.dotcomrendering.pageElements.MultiImageBlockElement',
	'model.dotcomrendering.pageElements.MediaAtomBlockElement',
	'model.dotcomrendering.pageElements.GuVideoBlockElement',
	'model.dotcomrendering.pageElements.EmbedBlockElement',
	'model.dotcomrendering.pageElements.VideoYoutubeBlockElement',
];

export const LiveBlock = ({
	format,
	block,
	pageId,
	webTitle,
	abTests,
	adTargeting,
	host,
}: Props) => {
	if (block.elements.length === 0) return null;
	const palette = decidePalette(format);
	const blockLink = `${pageId}#block-${block.id}`;

	// We split the array of elements into headerElement (the first one) and
	// mainElements (the rest) because we want to prevent any media elements
	// stretch left and covering the lastUpdated info
	let headerElement: CAPIElement | null = null;
	let mainElements: CAPIElement[] = [];
	if (typesWeStretch.includes(block.elements[0]._type)) {
		// The first element needs to be stretched so don't put
		// it in the header
		mainElements = block.elements;
	} else {
		[headerElement, ...mainElements] = block.elements;
	}

	// Decide if the block has been updated or not
	const showLastUpdated: boolean =
		!!block.blockLastUpdatedDisplay &&
		!!block.blockFirstPublished &&
		!!block.blockLastUpdated &&
		block.blockLastUpdated > block.blockFirstPublished;

	return (
		<Container id={block.id} palette={palette}>
			<Header>
				<aside
					className={css`
						${from.phablet} {
							/* Yes, we do need both */
							min-width: ${ASIDE_WIDTH + GUTTER}px;
							width: ${ASIDE_WIDTH + GUTTER}px;
						}
						padding-left: ${GUTTER}px;
						padding-right: ${GUTTER}px;
						padding-bottom: ${space[2]}px;
					`}
				>
					{block.blockFirstPublished && (
						<FirstPublished
							firstPublished={block.blockFirstPublished}
							blockLink={blockLink}
						/>
					)}
				</aside>
				<span>
					{block.title && <BlockTitle title={block.title} />}
					{headerElement && (
						<ElementRenderer
							isMainMedia={false}
							isLiveBlog={true}
							adTargeting={adTargeting}
							index={0}
							element={headerElement}
							format={format}
							palette={palette}
							abTests={abTests}
							host={host}
						/>
					)}
				</span>
			</Header>
			<main>
				{/* For each element, we decide what margins to set depending on the type */}
				{mainElements.map((element, index) => {
					if (typesWeStretch.includes(element._type)) {
						return (
							<BlockMedia key={`${element._type}-${index}`}>
								<ElementRenderer
									isMainMedia={false}
									isLiveBlog={true}
									adTargeting={adTargeting}
									index={index}
									element={element}
									format={format}
									palette={palette}
									abTests={abTests}
									host={host}
								/>
							</BlockMedia>
						);
					}

					return (
						<BlockText key={`${element._type}-${index}`}>
							<ElementRenderer
								isMainMedia={false}
								isLiveBlog={true}
								index={index}
								element={element}
								format={format}
								palette={palette}
								abTests={abTests}
							/>
						</BlockText>
					);
				})}
			</main>
			<Footer>
				<Hide when="below" breakpoint="phablet">
					<div
						className={css`
							display: flex;
							justify-content: space-between;
						`}
					>
						<ShareIcons
							pageId={pageId}
							webTitle={webTitle}
							displayIcons={['facebook', 'twitter']}
							palette={palette}
							size="small"
						/>
						{showLastUpdated &&
							block.blockLastUpdated &&
							block.blockLastUpdatedDisplay && (
								<LastUpdated
									lastUpdated={block.blockLastUpdated}
									lastUpdatedDisplay={
										block.blockLastUpdatedDisplay
									}
								/>
							)}
					</div>
				</Hide>
			</Footer>
		</Container>
	);
};
