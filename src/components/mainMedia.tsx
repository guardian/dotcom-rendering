import { Image as ImageData } from 'image';
import { Video as VideoData } from 'video';
import { Option } from 'types/option';

export const enum MainMediaKind {
    Image,
    Video,
}

export type MainMedia = { kind: MainMediaKind.Image; image: Option<ImageData>; } | { kind: MainMediaKind.Video; video: Option<VideoData>; }

const headerMedia = (item: Item): JSX.Element => {
    switch(item.mainMedia.kind) {
        case MainMediaKind.Image: {
            return item.mainMedia.image.fmap(image =>
                <HeaderImage
                    image={image}
                    format={getFormat(item)}
                />
            ).withDefault(<></>)
        }
        case MainMediaKind.Video: {
            return item.mainMedia.video.fmap(video =>
                <HeaderVideo video={video}/>
            ).withDefault(<></>)
        }
        default:
            return <></>
    }
}

export default headerMedia;