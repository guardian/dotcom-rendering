// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { Design, Format, Display } from '@guardian/types/Format';
import { remSpace } from '@guardian/src-foundations';
import { css } from '@emotion/core';

import { Item } from 'item';
import { renderAll, renderAllWithoutStyles } from 'renderer';
import Standard from 'components/standard/article';
import AdvertisementFeature from 'components/advertisementFeature/article';
import Comment from 'components/comment/article';
import Media from 'components/media/article';
import Interactive from 'components/interactive/article';
import { partition } from '@guardian/types/result';
import { getAdPlaceholderInserter } from 'ads';
import { ElementKind, BodyElement } from 'bodyElement';


// ----- Functions ----- //

const renderWithAds =
    (shouldHide: boolean) =>
        (format: Format, elements: BodyElement[]): ReactNode[] =>
            getAdPlaceholderInserter(shouldHide)(renderAll(format, elements));


// ----- Component ----- //

interface Props {
    item: Item;
    shouldHideAds: boolean;
}

const notImplemented =
    <p css={css`padding: 0 ${remSpace[2]}`}>Content format not implemented yet</p>;

const Body: FC<Props> = ({ item, shouldHideAds }) => {
    if (item.design === Design.Live) {
        return notImplemented;
    }

    const body = partition(item.body).oks;
    const render = renderWithAds(shouldHideAds);

    if (item.design === Design.Interactive && item.display === Display.Immersive) {
        return <Interactive>{renderAllWithoutStyles(item, body)}</Interactive>;
    }

    if (item.design === Design.Comment) {
        return <Comment item={item}>{render(item, body)}</Comment>;
    }

    if (item.design === Design.Media) {
        return (
            <Media item={item}>
                {render(item, body.filter(elem => elem.kind === ElementKind.Image))}
            </Media>
        );
    }

    if (
        item.design === Design.Feature ||
        item.design === Design.Analysis ||
        item.design === Design.Review ||
        item.design === Design.Article ||
        item.design === Design.Interactive
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
}


// ----- Exports ----- //

export default Body;
