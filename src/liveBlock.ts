// ----- Imports ----- //

import { Block } from '@guardian/content-api-models/v1/block';
import { Option } from '@guardian/types/option';
import { Context } from 'types/parserContext';
import {
    Body,
    parseElements,
} from 'bodyElement';
import { maybeCapiDate } from 'capi';


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


// ----- Exports ----- //

export {
    LiveBlock,
    parseMany,
};
