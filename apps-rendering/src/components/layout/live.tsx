// ----- Imports ----- //

import { css } from '@emotion/react';
import type { KeyEvent } from '@guardian/common-rendering/src/components/keyEvents';
import KeyEvents from '@guardian/common-rendering/src/components/keyEvents';
import { background, neutral } from '@guardian/src-foundations';
import { breakpoints, from } from '@guardian/src-foundations/mq';
import { OptionKind } from '@guardian/types';
import Footer from 'components/footer';
import LiveblogHeader from 'components/liveblogHeader';
import RelatedContent from 'components/shared/relatedContent';
import Tags from 'components/tags';
import type { DeadBlog, LiveBlog } from 'item';
import { convertThemeToArticleTheme } from 'lib';
import type { LiveBlock } from 'liveBlock';
import type { FC } from 'react';
import { articleWidthStyles, darkModeCss, onwardStyles } from 'styles';

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

const BorderStyles = css`
	background: ${neutral[100]};
	${darkModeCss`background: ${background.inverse};`}

	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: 0 auto;
	}
`;

interface Props {
	item: LiveBlog | DeadBlog;
}

const Live: FC<Props> = ({ item }) => (
	<main>
		<article className="js-article" css={BorderStyles}>
			<LiveblogHeader item={item} />
		</article>
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
	</main>
);

// ----- Exports ----- //

export default Live;
