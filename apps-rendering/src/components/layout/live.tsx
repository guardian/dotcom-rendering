// ----- Imports ----- //

import type { KeyEvent } from '@guardian/common-rendering/src/components/keyEvents';
import KeyEvents from '@guardian/common-rendering/src/components/keyEvents';
import { OptionKind } from '@guardian/types';
import Footer from 'components/footer';
import LiveblogHeader from 'components/liveblogHeader';
import RelatedContent from 'components/shared/relatedContent';
import Tags from 'components/tags';
import type { DeadBlog, LiveBlog } from 'item';
import { convertThemeToArticleTheme } from 'lib';
import type { LiveBlock } from 'liveBlock';
import type { FC } from 'react';
import { articleWidthStyles, onwardStyles } from 'styles';

// ----- Component ----- //

const keyEvents = (blocks: LiveBlock[]): KeyEvent[] =>
	blocks.reduce<KeyEvent[]>(
		(events, block) =>
			block.isKeyEvent && block.firstPublished.kind !== OptionKind.None
				? [
						...events,
						{
							time: block.firstPublished.value.toUTCString(),
							text: block.title,
							url: `#block-${block.id}`,
						},
				  ]
				: events,
		[],
	);

interface Props {
	item: LiveBlog | DeadBlog;
}

const Live: FC<Props> = ({ item }) => (
	<div className="js-article">
		<LiveblogHeader item={item} />
		<KeyEvents
			keyEvents={keyEvents(item.blocks)}
			theme={convertThemeToArticleTheme(item.theme)}
			supportsDarkMode
		/>
		<section css={articleWidthStyles}>
			<Tags tags={item.tags} format={item} />
		</section>
		<section css={onwardStyles}>
			<RelatedContent content={item.relatedContent} />
		</section>
		<section css={articleWidthStyles}>
			<Footer isCcpa={false} />
		</section>
	</div>
);

// ----- Exports ----- //

export default Live;
