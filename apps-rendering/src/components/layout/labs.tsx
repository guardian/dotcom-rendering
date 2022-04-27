// ----- Imports ----- //

import { css } from '@emotion/react';
import {
	background,
	breakpoints,
	from,
	neutral,
} from '@guardian/source-foundations';
import { Lines } from '@guardian/source-react-components-development-kitchen';
import { map, withDefault } from '@guardian/types';
import Body from 'components/articleBody';
import Footer from 'components/footer';
import Headline from 'components/headline';
import Logo from 'components/labsLogo';
import Metadata from 'components/metadata';
import RelatedContent from 'components/relatedContent';
import Series from 'components/series';
import Standfirst from 'components/standfirst';
import { getFormat } from 'item';
import type { Item } from 'item';
import { pipe } from 'lib';
import MainMedia from 'mainMedia';
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
					<MainMedia
						format={getFormat(item)}
						mainMedia={item.mainMedia}
					/>
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
						{pipe(
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
			<Footer isCcpa={false} format={item} />
		</main>
	);
};

// ----- Exports ----- //

export default Labs;
