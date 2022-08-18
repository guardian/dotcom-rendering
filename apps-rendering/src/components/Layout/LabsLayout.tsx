// ----- Imports ----- //

import { css } from '@emotion/react';
import {
	background,
	breakpoints,
	from,
	neutral,
} from '@guardian/source-foundations';
import { DottedLines } from '@guardian/source-react-components-development-kitchen';
import { map, withDefault } from '@guardian/types';
import Body from 'components/ArticleBody';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import Logo from 'components/LabsLogo';
import MainMedia from 'components/MainMedia';
import Metadata from 'components/Metadata';
import RelatedContent from 'components/RelatedContent';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import { getFormat } from 'item';
import type { Item } from 'item';
import { pipe } from 'lib';
import type { FC, ReactNode } from 'react';
import {
	articleWidthStyles,
	darkModeCss,
	lineStyles,
	onwardStyles,
} from 'styles';
import { Edition } from '@guardian/apps-rendering-api-models/edition';

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
	edition: Edition;
}

const LabsLayout: FC<Props> = ({ item, children, edition }) => {
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
					<DottedLines count={1} cssOverrides={lineStyles} />
					<section css={articleWidthStyles}>
						<Metadata item={item} edition={edition} />
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
				<RelatedContent item={item} />
			</section>
			<Footer isCcpa={false} format={item} />
		</main>
	);
};

// ----- Exports ----- //

export default LabsLayout;
