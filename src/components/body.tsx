// ----- Imports ----- //

import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { Design, Display, partition } from '@guardian/types';
import type { Format } from '@guardian/types';
import { getAdPlaceholderInserter } from 'ads';
import type { BodyElement } from 'bodyElement';
import { ElementKind } from 'bodyElement';
import AdvertisementFeature from 'components/advertisementFeature/article';
import Comment from 'components/comment/article';
import Interactive from 'components/interactive/article';
import Media from 'components/media/article';
import Standard from 'components/standard/article';
import type { Item } from 'item';
import React from 'react';
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
			padding: 0 ${remSpace[2]};
		`}
	>
		Content format not implemented yet
	</p>
);

const Body: FC<Props> = ({ item, shouldHideAds }) => {
	if (item.design === Design.Live) {
		return notImplemented;
	}

	const body = partition(item.body).oks;
	const render = renderWithAds(shouldHideAds);

	if (
		item.design === Design.Interactive &&
		item.display === Display.Immersive
	) {
		return <Interactive>{renderAllWithoutStyles(item, body)}</Interactive>;
	}

	if (item.design === Design.Comment) {
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
		item.design === Design.Quiz
	) {
		return <Standard item={item}>{render(item, body)}</Standard>;
	}

	if (item.design === Design.AdvertisementFeature) {
		return (
			<AdvertisementFeature item={item}>
				{render(item, body)}
			</AdvertisementFeature>
		);
	}

	return notImplemented;
};

// ----- Exports ----- //

export default Body;
