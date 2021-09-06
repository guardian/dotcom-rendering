// ----- Imports ----- //

import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/src-foundations';
import { partition } from '@guardian/types';
import { getAdPlaceholderInserter } from 'ads';
import type { BodyElement } from 'bodyElement';
import { ElementKind } from 'bodyElement';
import Comment from 'components/layout/comment';
import Interactive from 'components/layout/interactive';
import Labs from 'components/layout/labs';
import Media from 'components/layout/media';
import Standard from 'components/layout/standard';
import type { Item } from 'item';
import type { FC, ReactNode } from 'react';
import { renderAll, renderAllWithoutStyles } from 'renderer';

// ----- Functions ----- //

const renderWithAds =
	(shouldHide: boolean) =>
	(format: ArticleFormat, elements: BodyElement[]): ReactNode[] =>
		getAdPlaceholderInserter(shouldHide)(renderAll(format, elements));

// ----- Component ----- //

interface Props {
	item: Item;
	shouldHideAds: boolean;
}

const notImplemented = (
	<p
		css={css`
			padding: 0 ${remSpace[3]};
		`}
	>
		Content format not implemented yet
	</p>
);

const Layout: FC<Props> = ({ item, shouldHideAds }) => {
	if (item.design === ArticleDesign.LiveBlog) {
		return notImplemented;
	}

	const body = partition(item.body).oks;
	const render = renderWithAds(shouldHideAds);

	if (item.theme === ArticleSpecial.Labs) {
		return <Labs item={item}>{render(item, body)}</Labs>;
	}

	if (
		item.design === ArticleDesign.Interactive &&
		item.display === ArticleDisplay.Immersive
	) {
		return <Interactive>{renderAllWithoutStyles(item, body)}</Interactive>;
	}

	if (
		item.design === ArticleDesign.Comment ||
		item.design === ArticleDesign.Letter ||
		item.design === ArticleDesign.Editorial
	) {
		return <Comment item={item}>{render(item, body)}</Comment>;
	}

	if (item.design === ArticleDesign.Media) {
		return (
			<Media item={item}>
				{render(
					item,
					body.filter((elem) => elem.kind === ElementKind.Image),
				)}
			</Media>
		);
	}

	if (
		item.design === ArticleDesign.Feature ||
		item.design === ArticleDesign.Analysis ||
		item.design === ArticleDesign.Review ||
		item.design === ArticleDesign.Standard ||
		item.design === ArticleDesign.Interactive ||
		item.design === ArticleDesign.Quiz ||
		item.design === ArticleDesign.MatchReport ||
		item.design === ArticleDesign.Obituary ||
		item.design === ArticleDesign.Correction
	) {
		return <Standard item={item}>{render(item, body)}</Standard>;
	}

	return notImplemented;
};

// ----- Exports ----- //

export default Layout;
