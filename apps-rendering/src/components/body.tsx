// ----- Imports ----- //

import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { Design, Display, partition, Special } from '@guardian/types';
import type { Format } from '@guardian/types';
import { getAdPlaceholderInserter } from 'ads';
import type { BodyElement } from 'bodyElement';
import { ElementKind } from 'bodyElement';
import Comment from 'components/comment/article';
import Interactive from 'components/interactive/article';
import Labs from 'components/labs/article';
import Media from 'components/media/article';
import Standard from 'components/standard/article';
import type { Item } from 'item';
import type { FC, ReactNode } from 'react';
import { renderAll, renderAllWithoutStyles } from 'renderer';

// ----- Functions ----- //

const renderWithAds = (shouldHide: boolean) => (
	format: Format,
	elements: BodyElement[],
): ReactNode[] =>
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

const Body: FC<Props> = ({ item, shouldHideAds }) => {
	if (item.design === Design.LiveBlog) {
		return notImplemented;
	}

	const body = partition(item.body).oks;
	const render = renderWithAds(shouldHideAds);

	if (item.theme === Special.Labs) {
		return <Labs item={item}>{render(item, body)}</Labs>;
	}

	if (
		item.design === Design.Interactive &&
		item.display === Display.Immersive
	) {
		return <Interactive>{renderAllWithoutStyles(item, body)}</Interactive>;
	}

	if (
		item.design === Design.Comment ||
		item.design === Design.Letter ||
		item.design === Design.Editorial
	) {
		return <Comment item={item}>{render(item, body)}</Comment>;
	}

	if (item.design === Design.Media) {
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
		item.design === Design.Feature ||
		item.design === Design.Analysis ||
		item.design === Design.Review ||
		item.design === Design.Article ||
		item.design === Design.Interactive ||
		item.design === Design.Quiz ||
		item.design === Design.MatchReport ||
		item.design === Design.Obituary
	) {
		return <Standard item={item}>{render(item, body)}</Standard>;
	}

	return notImplemented;
};

// ----- Exports ----- //

export default Body;
