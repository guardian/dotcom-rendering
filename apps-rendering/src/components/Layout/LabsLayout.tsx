// ----- Imports ----- //

import { css } from '@emotion/react';
import {
	background,
	breakpoints,
	from,
	neutral,
} from '@guardian/source-foundations';
import { DottedLines } from '@guardian/source-react-components-development-kitchen';
import { map, withDefault } from '../../../vendor/@guardian/types/index';
import ArticleBody from 'components/ArticleBody';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import Logo from 'components/LabsLogo';
import MainMedia from 'components/MainMedia';
import Metadata from 'components/Metadata';
import RelatedContent from 'components/RelatedContent';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import { WithAgeWarning } from 'components/WithAgeWarning';
import { getFormat } from 'item';
import type { DeadBlog, Item, LiveBlog } from 'item';
import { pipe } from 'lib';
import type { FC } from 'react';
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
	item: Exclude<Item, LiveBlog | DeadBlog>;
}

const LabsLayout: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	return (
		<main css={[Styles, DarkStyles]}>
			<article css={BorderStyles}>
				<header>
					<MainMedia
						format={getFormat(item)}
						mainMedia={item.mainMedia}
					/>
					<div>
						<WithAgeWarning
							tags={item.tags}
							series={item.series}
							publishDate={item.publishDate}
							format={format}
						/>
						<Series item={item} />
						<Headline item={item} />
						<div css={articleWidthStyles}>
							<Standfirst item={item} />
						</div>
					</div>
					<DottedLines count={1} cssOverrides={lineStyles(format)} />
					<section css={articleWidthStyles}>
						<Metadata item={item} />
						{pipe(
							item.logo,
							map((props) => <Logo logo={props} />),
							withDefault(<></>),
						)}
					</section>
				</header>
				<ArticleBody
					className={[articleWidthStyles]}
					format={item}
					body={item.body}
					shouldHideAdverts={item.shouldHideAdverts}
				/>
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
