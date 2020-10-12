// ----- Imports ----- //

import { Block } from '@guardian/content-api-models/v1/block';
import { CapiDateTime } from '@guardian/content-api-models/v1/capiDateTime';
import { Content } from '@guardian/content-api-models/v1/content';
import { Option, andThen, map, withDefault } from '@guardian/types/option';
import { Context, DocParser } from 'types/parserContext';
import JsonSerialisable from 'types/jsonSerialisable';
import {
    Body,
    parseElements,
    toSerialisable as bodyElementToSerialisable,
    fromSerialisable as bodyElementFromSerialisable,
} from 'bodyElement';
import { maybeCapiDate } from 'capi';
import { partition, ok } from '@guardian/types/result';
import { compose, pipe3 } from 'lib';
import { fromString as dateFromString } from 'date';


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
        firstPublished,
        lastModified,
        body: partition(body).oks.map(bodyElementToSerialisable),
    });

// Disabled because the point of these functions is to convert the `any`
// provided by JSON.parse to a stricter type
/* eslint-disable
   @typescript-eslint/no-explicit-any,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-return,
   @typescript-eslint/explicit-module-boundary-types
*/
const deserialiseLiveBlock = (docParser: DocParser) => ({
    id,
    isKeyEvent,
    title,
    firstPublished,
    lastModified,
    body,
}: any): LiveBlock =>
    ({
        id,
        isKeyEvent,
        title,
        firstPublished: andThen(dateFromString)(firstPublished),
        lastModified: andThen(dateFromString)(lastModified),
        body: body.map((elem: any) => ok(bodyElementFromSerialisable(docParser)(elem))),
    });

const toSerialisable = (blocks: LiveBlock[]): JsonSerialisable =>
    blocks.map(serialiseLiveBlock);

const fromSerialisable = (docParser: DocParser) => (blocks: any): LiveBlock[] =>
    blocks.map(deserialiseLiveBlock(docParser));

/* eslint-enable
   @typescript-eslint/no-explicit-any,
   @typescript-eslint/no-unsafe-assignment,
   @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-call,
   @typescript-eslint/no-unsafe-return,
   @typescript-eslint/explicit-module-boundary-types
*/

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
    pipe3(capiDate, maybeCapiDate, map(date => date > since), withDefault<boolean>(false));

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
    recentBlocks,
    toSerialisable,
    fromSerialisable,
};
