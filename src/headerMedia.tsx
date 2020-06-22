import React from 'react';
import { Image as ImageData } from 'image';
import { Video as VideoData } from 'video';
import { Option } from 'types/option';
import HeaderImage from 'components/headerImage';
import { Item, getFormat } from 'item';
import HeaderVideo from 'components/headerVideo';

export const enum MainMediaKind {
    Image,
    Video,
}

export type MainMedia = { kind: MainMediaKind.Image; image: Option<ImageData>; } | { kind: MainMediaKind.Video; video: Option<VideoData>; }

interface HeaderMediaProps {
    item: Item;
}

const HeaderMedia = ({ item }: HeaderMediaProps): JSX.Element => {
    const format = getFormat(item);
    switch(item.mainMedia.kind) {
        case MainMediaKind.Image: {
            return item.mainMedia.image.fmap((image: ImageData) =>
                <HeaderImage
                    image={image}
                    format={format}
                />
            ).withDefault(<></>)
        }
        case MainMediaKind.Video: {
            return item.mainMedia.video.fmap((video: VideoData) =>
                <HeaderVideo video={video} format={format}/>
            ).withDefault(<></>)
        }
        default:
            return <></>
    }
}

export default HeaderMedia;