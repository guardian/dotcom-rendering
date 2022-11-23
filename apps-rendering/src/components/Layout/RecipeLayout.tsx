// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticlePillar } from '@guardian/libs';
import { breakpoints, from } from '@guardian/source-foundations';
import {
	DottedLines,
	StraightLines,
} from '@guardian/source-react-components-development-kitchen';
import { map, withDefault } from '@guardian/types';
import { pillarToId, themeToPillar } from 'articleFormat';
import Body from 'components/ArticleBody';
import Epic from 'components/Epic';
import FootballScores from 'components/FootballScores';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import HeadlineTag from 'components/HeadlineTag';
import Logo from 'components/Logo';
import MainMedia from 'components/MainMedia';
import Metadata from 'components/Metadata';
import RelatedContent from 'components/RelatedContent';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import Tags from 'components/Tags';
import type { MatchScores } from 'football';
import { getFormat } from 'item';
import type {
	Explainer as ExplainerItem,
	Item,
	MatchReport as MatchReportItem,
	Review as ReviewItem,
	Standard as StandardItem,
} from 'item';
import { maybeRender, pipe } from 'lib';
import { Optional } from 'optional';
import type { FC, ReactNode } from 'react';
import {
	articleWidthStyles,
	darkModeCss,
	lineStyles,
	onwardStyles,
} from 'styles';

// ----- Styles ----- //
const backgroundStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.articleContent(format)};

	${darkModeCss`
        background-color: ${background.articleContentDark(format)}
    `}
`;

const BorderStyles = css`
	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: 0 auto;
	}
`;

const decideLines = (
	item: Item,
	cssOverrides?: SerializedStyles | SerializedStyles[],
): JSX.Element => {
	const count = item.design === ArticleDesign.Comment ? 8 : 4;

	if (item.theme === ArticlePillar.Sport) {
		return <DottedLines cssOverrides={cssOverrides} count={count} />;
	}

	return <StraightLines cssOverrides={cssOverrides} count={count} />;
};

interface Props {
	item: StandardItem | ReviewItem | MatchReportItem | ExplainerItem;
	children: ReactNode[];
	isCookMode: boolean;
}

const RecipeLayout: FC<Props> = ({ item, children, isCookMode }) => {
	const format = getFormat(item);
	// client side code won't render an Epic if there's an element with this id
	const epicContainer = item.shouldHideReaderRevenue ? null : (
		<div css={articleWidthStyles}>
			<Epic />
		</div>
	);

	const commentContainer = item.commentable
		? pipe(
				item.internalShortId,
				map((id) => (
					<section
						css={onwardStyles}
						id="comments"
						data-closed={false}
						data-pillar={pipe(
							item.theme,
							themeToPillar,
							pillarToId,
						)}
						data-short-id={id}
					></section>
				)),
				withDefault(<></>),
		  )
		: null;

	return (
		<main css={backgroundStyles(format)}>
			{isCookMode ? (
				<article>
					<div className="ingredients">
						<p className="ar-jx47ik-Paragraph">
							<strong className="ar-in3yi3">
								Extra-virgin olive oil
								<br />
								45g brined capers
							</strong>
							, drained
							<br />
							<strong className="ar-in3yi3">
								40g sun-dried tomato paste
							</strong>
							<strong className="ar-in3yi3">
								<br />
								30g pine nuts
							</strong>
							<strong className="ar-in3yi3">
								<br />
								20g raisins
							</strong>
							<strong className="ar-in3yi3">
								<br />½ tsp red chilli flakes
								<br />
								Fine sea salt and black pepper
								<br />1 tsp white-wine vinegar
							</strong>
							, or to taste
							<br />
							<strong className="ar-in3yi3">
								40g dried breadcrumbs
							</strong>
							<strong className="ar-in3yi3">
								<br />1 tbsp nutritional yeast
								<br />
								200g spaghetti
							</strong>
						</p>
						<div className="closeButton">x</div>
					</div>
					<div className="method">
						<p>
							First make the sauce. Put four tablespoons of oil in
							a blender, add the capers, sun-dried tomato paste,
							pine nuts, raisins, chilli flakes and half a
							teaspoon of salt. Blend to a chunky sauce, then
							taste: it should be salty, sweet and sour. If you
							need to, add up to a teaspoon of vinegar to balance
							things out.
						</p>
						<p>
							Bring a large pan of water to a rolling boil, and
							add a teaspoon of salt for every litre of water.
						</p>
						<p>
							In the meantime, heat a tablespoon of oil in a small
							frying pan on a medium heat. Once it’s hot, add the
							breadcrumbs and fry, stirring, until the they are an
							autumn-leaf brown. Take off the heat, stir in the
							nutritional yeast, then transfer to a small bowl.
						</p>
						<p>
							Once the water pot is boiling, cook the spaghetti
							according to the packet instructions and, when it’s
							nearly done, carefully lower a mug into the cooking
							water and take some of it out. Drain the spaghetti
							well, then return it to the empty pan and add the
							blended sauce and three tablespoons of the pasta
							cooking water. Mix well to loosen up the pasta,
							adding another tablespoon of the cooking water, if
							need be, then taste a strand and adjust the
							seasoning as necessary.
						</p>
						<p>
							Distribute the spaghetti between two plates and
							sprinkle each portion with a tablespoon of the
							breadcrumb mix. Serve with the remaining breadcrumbs
							on the side, so you can help yourselves.
						</p>
					</div>
				</article>
			) : (
				<>
					<article className="js-article" css={BorderStyles}>
						<header>
							<MainMedia
								format={getFormat(item)}
								mainMedia={item.mainMedia}
							/>
							<Series item={item} />
							{item.design === ArticleDesign.Explainer && (
								<HeadlineTag
									tagText={'Explainer'}
									format={item}
								/>
							)}
							<Headline item={item} />
							<div css={articleWidthStyles}>
								<Standfirst item={item} />
							</div>
							{decideLines(item, lineStyles)}
							<section css={articleWidthStyles}>
								<Metadata item={item} />
								<Logo item={item} />
							</section>
						</header>
						<Body className={[articleWidthStyles]} format={item}>
							{children}
						</Body>
						{epicContainer}
						<section className="js-tags" css={articleWidthStyles}>
							<Tags item={item} />
						</section>
					</article>
					<section css={onwardStyles}>
						<RelatedContent item={item} />
					</section>
					{commentContainer}
					<Footer isCcpa={false} format={item} />
				</>
			)}
		</main>
	);
};

// ----- Exports ----- //

export default RecipeLayout;
