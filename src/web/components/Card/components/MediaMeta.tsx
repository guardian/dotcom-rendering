import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';

import Audio from '@frontend/static/icons/audio.svg';
import Photo from '@frontend/static/icons/photo.svg';
import Video from '@frontend/static/icons/video.svg';

type Props = {
    mediaType: MediaType;
    pillar: Pillar;
    mediaDuration?: number;
};

const iconWrapperStyles = ({ pillar, mediaType }: Props) => css`
    width: 1.5rem;
    height: 1.4375rem;
    background-color: ${palette[pillar].main};
    border-radius: 50%;
    display: inline-block;

    > svg {
        width: 0.875rem;
        height: auto;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0.375rem;
        display: block;
        transform: ${mediaType === 'Video' ? `translateY(0.0625rem)` : ``};
    }
`;

const durationStyles = ({ pillar }: Props) => css`
    color: ${palette[pillar].main};
    font-size: 0.75rem;
    line-height: 1rem;
    ${textSans.xsmall()}
    font-weight: 600;
`;

const wrapperStyles = css`
    display: flex;
    align-items: center;
`;

export function secondsToDuration(secs?: number): string {
    if (typeof secs === `undefined` || secs === 0) {
        return ``;
    }
    const dtime = new Date(secs * 1000).toISOString();
    const duration = secs > 3600 ? dtime.substr(11, 8) : dtime.substr(14, 5);
    return /^0/.test(duration) ? duration.substr(1) : duration;
}

export const Icon = ({ mediaType }: Props) => {
    switch (mediaType) {
        case 'Photo':
            return <Photo />;
        case 'Video':
            return <Video />;
        case 'Audio':
            return <Audio />;
    }
};

export const MediaIcon = (props: Props) => (
    <span className={iconWrapperStyles(props)}>
        <Icon {...props} />
    </span>
);

export const MediaDuration = (props: Props) => (
    <p className={durationStyles(props)}>
        {secondsToDuration(props.mediaDuration)}
    </p>
);

export const MediaMeta = (props: Props) => (
    <div className={wrapperStyles}>
        <MediaIcon {...props} />
        &nbsp;
        {props.mediaDuration && <MediaDuration {...props} />}
    </div>
);
