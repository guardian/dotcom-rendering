// // ----- Imports ----- //

import { css } from '@emotion/react';
import { Lines } from '@guardian/src-ed-lines';
import { background, neutral } from '@guardian/src-foundations';
import { breakpoints, from } from '@guardian/src-foundations/mq';
import Footer from 'components/footer';
import type { FC } from 'react';
import type { Liveblog } from 'item';
import RelatedContent from 'components/shared/relatedContent';
import {
	articleWidthStyles,
	darkModeCss,
	lineStyles,
	onwardStyles,
} from 'styles';
import Series from '../series';
import Headline from 'components/headline';
import Standfirst from 'components/standfirst';
import HeaderMedia from 'headerMedia';
import Metadata from 'components/metadata';
import Tags from 'components/tags';

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

const Live: FC<Props> = ({ item }) => {
	return (
		<main>
			<article className="js-article" css={BorderStyles}>
				<header>
					<Series item={item} />
					<Headline item={item} />
					<div css={articleWidthStyles}>
						<Standfirst item={item} />
					</div>
					<div css={lineStyles}>
						<Lines count={4} />
					</div>
					<div css={articleWidthStyles}>
						<Metadata item={item} />
						<HeaderMedia item={item} />
					</div>
				</header>
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
};

// // ----- Exports ----- //

export default Live;
