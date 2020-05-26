// ----- Imports ----- //

import { IBlock as Block } from 'mapiThriftModels/Block';
import { ICapiDateTime as CapiDateTime } from 'mapiThriftModels/CapiDateTime';
import { IContent as Content } from 'mapiThriftModels/Content';
import { Option, toSerialisable as optionToSerialisable } from 'types/option';
import { Context } from 'types/parserContext';
import JsonSerialisable from 'types/jsonSerialisable';
import {
    Body,
    parseElements,
    toSerialisable as bodyElementToSerialisable,
} from 'bodyElement';
import { maybeCapiDate } from 'capi';
import { partition } from 'types/result';
import { compose } from 'lib';


// ----- Types ----- //

type LiveBlock = {
    id: string;
    isKeyEvent: boolean;
    title: string;
    firstPublished: Option<Date>;
    lastModified: Option<Date>;
    body: Body;
}


// ----- Functions ----- //

const serialiseLiveBlock = ({
    id,
    isKeyEvent,
    title,
    firstPublished,
    lastModified,
    body,
}: LiveBlock): JsonSerialisable =>
    ({
        id,
        isKeyEvent,
        title,
        firstPublished: optionToSerialisable(firstPublished),
        lastModified: optionToSerialisable(lastModified),
        body: partition(body).oks.map(bodyElementToSerialisable),
    });

const toSerialisable = (blocks: LiveBlock[]): JsonSerialisable =>
    blocks.map(serialiseLiveBlock);

const parse = (context: Context) => (block: Block): LiveBlock =>
    ({
        id: block.id,
        isKeyEvent: block?.attributes?.keyEvent ?? false,
        title: block?.title ?? "",
        firstPublished: maybeCapiDate(block?.firstPublishedDate),
        lastModified: maybeCapiDate(block?.lastModifiedDate),
        body: parseElements(context)(block.elements),
    })

const parseMany = (blocks: Block[]): (context: Context) => LiveBlock[] =>
    (context: Context): LiveBlock[] => blocks.map(parse(context));

const moreRecentThan = (since: Date) => (capiDate: CapiDateTime | undefined): boolean =>
    maybeCapiDate(capiDate).fmap(date => date > since).withDefault(false);

const filterBlocks = (filterFunc: (block: Block) => boolean) => (content: Content): Block[] =>
    content.blocks?.body?.filter(filterFunc) ?? [];

const blocksSince =
    (getDate: (block: Block) => CapiDateTime | undefined) =>
    (since: Date): (content: Content) => (context: Context) => LiveBlock[] =>
{
    const isRecent = compose(moreRecentThan(since), getDate);

    return compose(parseMany, filterBlocks(isRecent));
}

const newBlocksSince = blocksSince(block => block.firstPublishedDate);
const updatedBlocksSince = blocksSince(block => block.lastModifiedDate);

const recentBlocks = (num: number) => (content: Content): (context: Context) => LiveBlock[] =>
    parseMany((content.blocks?.body ?? []).slice(0, num));


// ----- Exports ----- //

export {
    LiveBlock,
    parseMany,
    newBlocksSince,
    updatedBlocksSince,
    toSerialisable,
    recentBlocks,
};
