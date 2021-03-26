// ----- Imports ----- //

import { css } from '@emotion/react';
import { Lines } from '@guardian/src-ed-lines';
import { breakpoints, from } from '@guardian/src-foundations/mq';
import { background, neutral } from '@guardian/src-foundations/palette';
import { map, withDefault } from '@guardian/types';
import Footer from 'components/footer';
import Headline from 'components/headline';
import Metadata from 'components/metadata';
import Series from 'components/series';
import Body from 'components/shared/articleBody';
import RelatedContent from 'components/shared/relatedContent';
import Standfirst from 'components/standfirst';
import HeaderMedia from 'headerMedia';
import type { Item } from 'item';
import { pipe2 } from 'lib';
import type { FC, ReactNode } from 'react';
import {
	articleWidthStyles,
	darkModeCss,
	lineStyles,
	onwardStyles,
} from 'styles';
import Logo from './logo';

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

// ----- Component ----- //

interface Props {
	item: Item;
	children: ReactNode[];
}

const Labs: FC<Props> = ({ item, children }) => {
	return (
		<main css={[Styles, DarkStyles]}>
			<article css={BorderStyles}>
				<header>
					<HeaderMedia item={item} />
					<div>
						<Series item={item} />
						<Headline item={item} />
						<div css={articleWidthStyles}>
							<Standfirst item={item} />
						</div>
					</div>
					<div css={lineStyles}>
						<Lines count={4} />
					</div>
					<section css={articleWidthStyles}>
						<Metadata item={item} />
						{pipe2(
							item.logo,
							map((props) => <Logo logo={props} />),
							withDefault(<></>),
						)}
					</section>
				</header>
				<Body className={[articleWidthStyles]} format={item}>
					{children}
				</Body>
			</article>
			<section css={onwardStyles}>
				<RelatedContent content={item.relatedContent} />
			</section>
			<Footer isCcpa={false} />
		</main>
	);
};

// ----- Exports ----- //

export default Labs;
