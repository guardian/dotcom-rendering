// // ----- Imports ----- //

import { css } from '@emotion/react';
import { background, neutral } from '@guardian/src-foundations';
import { breakpoints, from } from '@guardian/src-foundations/mq';
import Footer from 'components/footer';
import LiveblogHeader from 'components/liveblogHeader';
import RelatedContent from 'components/shared/relatedContent';
import Tags from 'components/tags';
import type { Liveblog } from 'item';
import type { FC } from 'react';
import { articleWidthStyles, darkModeCss, onwardStyles } from 'styles';

// // ----- Styles ----- //

const BorderStyles = css`
	background: ${neutral[100]};
	${darkModeCss`background: ${background.inverse};`}

	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: 0 auto;
	}
`;
interface Props {
	item: Liveblog;
}

const Live: FC<Props> = ({ item }) => (
	<main>
		<article className="js-article" css={BorderStyles}>
			<LiveblogHeader item={item} />
		</article>
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

// // ----- Exports ----- //

export default Live;
