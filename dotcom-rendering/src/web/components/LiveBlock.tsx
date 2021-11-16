import { css } from '@emotion/react';

import { space } from '@guardian/src-foundations';

import { renderArticleElement } from '@root/src/web/lib/renderElement';
import { decidePalette } from '@root/src/web/lib/decidePalette';

import { Hide } from '@root/src/web/components/Hide';
import { ShareIcons } from '@root/src/web/components/ShareIcons';
import { headline } from '@guardian/src-foundations/typography';
import LiveBlockContainer from '@guardian/common-rendering/src/components/liveBlockContainer';
import { FirstPublished } from '@guardian/common-rendering/src/components/FirstPublished';
import { LastUpdated } from '@guardian/common-rendering/src/components/LastUpdated';

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

	// Decide if the block has been updated or not
	const showLastUpdated: boolean =
		!!block.blockLastUpdatedDisplay &&
		!!block.blockFirstPublished &&
		!!block.blockLastUpdated &&
		block.blockLastUpdated > block.blockFirstPublished;

	return (
		<LiveBlockContainer
			id={block.id}
			borderColour={palette.border.liveBlock}
		>
			<Header>
				{block.blockFirstPublished && (
					<FirstPublished
						firstPublished={block.blockFirstPublished}
						blockLink={blockLink}
					/>
				)}
				{block.title && <BlockTitle title={block.title} />}
			</Header>
			{block.elements.map((element, index) =>
				renderArticleElement({
					format,
					palette,
					element,
					isMainMedia: false,
					host,
					adTargeting,
					index,
					pageId,
					webTitle,
				}),
			)}
			<div>
				<Hide when="below" breakpoint="phablet">
					<footer
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
					</footer>
				</Hide>
			</div>
		</LiveBlockContainer>
	);
};
