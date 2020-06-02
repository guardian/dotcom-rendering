// ----- Imports ----- //

import { createHash } from 'crypto';
import { Design } from '@guardian/types/Format';

import { BodyElement, ElementKind } from 'bodyElement';
import { partition, Result } from 'types/result';
import { Item } from 'item';
import { compose } from 'lib';


// ----- Types ----- //

interface Assets {
    scripts: string[];
    styles: string[];
}


// ----- Functions ----- //

const assetHash = (asset: string): string =>
    createHash('sha256').update(asset).digest('base64');

const extractInteractiveAssets = (elements: BodyElement[]): Assets =>
    elements.reduce<Assets>(({ scripts, styles }, elem) => {
        if (elem.kind === ElementKind.InteractiveAtom) {
            return {
                styles: [ ...styles, elem.css ],
                scripts: elem.js.fmap(js => [ ...scripts, js ]).withDefault(scripts),
            };
        }

        return { scripts, styles };
    }, { scripts: [], styles: [] });

const getElements = (item: Item): Result<string, BodyElement>[] =>
    item.design === Design.Live ? item.blocks.flatMap(block => block.body) : item.body;

const getValidElements = (item: Item): BodyElement[] =>
    partition(getElements(item)).oks;

const interactiveAssets = compose(extractInteractiveAssets, getValidElements);

const assetHashes = (assets: string[]): string =>
    assets.map(asset => `'sha256-${assetHash(asset)}'`).join(' ');

const buildCsp = ({ styles, scripts }: Assets, twitter: boolean): string => `
    default-src 'self';
    style-src ${assetHashes(styles)} https://interactive.guim.co.uk ${twitter ? 'https://platform.twitter.com' : ''};
    img-src 'self' https://i.guim.co.uk ${twitter ? 'https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com data:' : ''};
    script-src 'self' ${assetHashes(scripts)} https://interactive.guim.co.uk ${twitter ? 'https://platform.twitter.com https://cdn.syndication.twimg.com' : ''};
    frame-src ${twitter ? 'https://platform.twitter.com https://syndication.twitter.com' : ''};
    font-src 'self' https://interactive.guim.co.uk;
    connect-src 'self' https://interactive.guim.co.uk
`.trim();

function csp(item: Item, additionalAssets: Assets, twitter: boolean): string {
    const interactives = interactiveAssets(item);
    const assets = {
        styles: [ ...interactives.styles, ...additionalAssets.styles ],
        scripts: [ ...interactives.scripts, ...additionalAssets.scripts ],
    };

    return buildCsp(assets, twitter);
}


// ----- Exports ----- //

export {
    csp,
};
