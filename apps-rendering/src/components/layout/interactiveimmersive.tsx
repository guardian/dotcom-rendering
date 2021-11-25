// ----- Imports ----- //

import { css } from '@emotion/react';
import { Lines } from '@guardian/source-react-components-development-kitchen';
import { breakpoints, from } from '@guardian/src-foundations/mq';
import { background, neutral } from '@guardian/src-foundations/palette';
import Footer from 'components/footer';
import Headline from 'components/headline';
import ImmersiveCaption from 'components/immersiveCaption';
import Metadata from 'components/metadata';
import Series from 'components/series';
import Body from 'components/shared/articleBody';
import Epic from 'components/shared/epic';
import OptionalLogo from 'components/shared/logo';
import RelatedContent from 'components/shared/relatedContent';
import Standfirst from 'components/standfirst';
import Tags from 'components/tags';
import HeaderMedia from 'headerMedia';
import type {
	MatchReport as MatchReportItem,
	Review as ReviewItem,
	Standard as StandardItem,
} from 'item';
import type { FC, ReactNode } from 'react';
import {
	articleWidthStyles,
	darkModeCss,
	lineStyles,
	onwardStyles,
} from 'styles';

// ----- Styles ----- //

const Styles = css`
	background: ${neutral[97]};
`;

const DarkStyles = darkModeCss`
    background: ${background.inverse};
`;

const BorderStyles = css`
	background: ${neutral[100]};
	${darkModeCss`background: ${background.inverse};`}

	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: 0 auto;
	}
`;

interface Props {
	item: StandardItem | ReviewItem | MatchReportItem;
	children: ReactNode[];
}

const InteractiveImmersive: FC<Props> = ({ item, children }) => {
	// client side code won't render an Epic if there's an element with this id
	const epicContainer = item.shouldHideReaderRevenue ? null : (
		<div css={articleWidthStyles}>
			<Epic />
		</div>
	);

	return (
		<main css={[Styles, DarkStyles]}>
			<article className="js-article" css={BorderStyles}>
				<header>
					<HeaderMedia item={item} />
					<Series item={item} />
					<Headline item={item} />
					<div css={articleWidthStyles}>
						<Standfirst item={item} />
						<ImmersiveCaption item={item} />
					</div>
					<div css={lineStyles}>
						<Lines count={4} />
					</div>
					<section css={articleWidthStyles}>
						<Metadata item={item} />
						{OptionalLogo(item)}
					</section>
				</header>
				<Body format={item}>{children}</Body>
				{epicContainer}
				<section className="js-tags" css={articleWidthStyles}>
					<Tags tags={item.tags} format={item} />
				</section>
			</article>
			<section css={onwardStyles}>
				<RelatedContent content={item.relatedContent} />
			</section>
			<Footer isCcpa={false} />
		</main>
	);
};

// ----- Exports ----- //

export default InteractiveImmersive;
