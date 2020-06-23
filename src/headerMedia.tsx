import React from 'react';
import { Image as ImageData } from 'image';
import { Video as VideoData } from 'video';
import HeaderImage from 'components/headerImage';
import { Item, getFormat } from 'item';
import HeaderVideo from 'components/headerVideo';

export const enum MainMediaKind {
    Image,
    Video,
}

export type MainMedia =
    { kind: MainMediaKind.Image; image: ImageData } |
    { kind: MainMediaKind.Video; video: VideoData }

interface HeaderMediaProps {
    item: Item;
}

const HeaderMedia = ({ item }: HeaderMediaProps): JSX.Element => {
    const format = getFormat(item);
    return item.mainMedia.fmap(media => {
        if (media.kind === MainMediaKind.Image) {
            return <HeaderImage
                image={media.image}
                format={format}
            />
        } else if (media.kind === MainMediaKind.Video) {
            return <HeaderVideo video={media.video} format={format}/>
        }

        return <></>
    }).withDefault(<></>)
}

export default HeaderMedia;