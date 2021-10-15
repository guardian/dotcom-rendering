import { css } from '@emotion/react';

import { neutral, space } from '@guardian/src-foundations';
import { timeAgo } from '@guardian/libs';

import { renderArticleElement } from '@root/src/web/lib/renderElement';
import { decidePalette } from '@root/src/web/lib/decidePalette';

import { Hide } from '@root/src/web/components/Hide';
import { ShareIcons } from '@root/src/web/components/ShareIcons';
import { headline, textSans } from '@guardian/src-foundations/typography';
import LiveBlockContainer from '@guardian/common-rendering/src/components/liveBlockContainer';

type Props = {
	format: ArticleFormat;
	block: Block;
	pageId: string;
	webTitle: string;
	adTargeting: AdTargeting;
	host?: string;
};



const Header = ({ children }: { children: React.ReactNode }) => {
	return (
		<header
			css={css`
				padding-right: ${space[3]}px;
				display: flex;
				flex-direction: column;
			`}
		>
			{children}
		</header>
	);
};


const BlockTitle = ({ title }: { title: string }) => {
	return (
		<h2
			css={css`
				${headline.xxsmall({ fontWeight: 'bold' })}
				margin-bottom: ${space[2]}px;
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
			css={css`
				display: flex;
				align-items: flex-end;
				${textSans.xxsmall()};
				color: ${neutral[46]};
			`}
		>
			<time dateTime={new Date(lastUpdated).toISOString()}>
				{`Updated at ${lastUpdatedDisplay}`}
			</time>
		</div>
	);
};

const formatTime = (time: number) => time < 10 ? `0${time}` : time;

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
			css={css`
				${textSans.xxsmall({ fontWeight: 'bold' })}
				margin-bottom: ${space[1]}px;
				padding-top: ${space[1]}px;
				display: flex;
				flex-direction: row;
				text-decoration: none;
				:hover {
					filter: brightness(30%);
				}
			`}
		>
			<time
				dateTime={publishedDate.toISOString()}
				css={css`
					color: ${neutral[46]};
					font-weight: bold;
					margin-right: ${space[2]}px;
				`}
			>
				{timeAgo(firstPublished)}
			</time>
			<span
				css={css`
					${textSans.xxsmall()};
					color: ${neutral[46]};
				`}
			>
				{`${formatTime(publishedDate.getHours())}:${formatTime(publishedDate.getMinutes())}`}
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
		<LiveBlockContainer id={block.id} borderColour={palette.border.liveBlock}>
			<Header>
				{block.blockFirstPublished && (
					<FirstPublished
						firstPublished={block.blockFirstPublished}
						blockLink={blockLink}
					/>
				)}
				{block.title && <BlockTitle title={block.title} />}
				{headerElement &&
					renderArticleElement({
						format,
						palette,
						element: headerElement,
						isMainMedia: false,
						host,
						adTargeting,
						index: 0,
						pageId,
						webTitle,
					})}
			</Header>
			{/* For each element, we decide what margins to set depending on the type */}
			{mainElements.map((element, index) => (
				<p key={`${element._type}-${index}`}>
					{renderArticleElement({
						format,
						palette,
						element,
						isMainMedia: false,
						index,
						pageId,
						webTitle,
					})}
				</p>
				)
			)}
			<div>
				<Hide when="below" breakpoint="phablet">
					<div
						css={css`
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
			</div>
		</LiveBlockContainer>
	);
};
