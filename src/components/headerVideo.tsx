// ----- Imports ----- //

import React, { FC } from 'react';
import { css } from '@emotion/core'
import { remSpace, neutral } from '@guardian/src-foundations';

import { darkModeCss, wideContentWidth } from 'styles';
import { Video } from 'video';
import { from } from '@guardian/src-foundations/mq';
import { Format, Design } from '@guardian/types/Format';

// ----- Component ----- //

const videoHeight = wideContentWidth * 0.5625;

const marginAuto = `
    margin-left: auto;
    margin-right: auto;
`;

const styles = (format: Format) => css`
    margin: 0 0 ${remSpace[2]} 0;
    position: relative;
    display: block;
    width: 100%;
    padding-bottom: 56.25%;
    background: ${neutral[97]};
    ${darkModeCss`
        background: ${neutral[20]};
    `}

    ${from.wide} {
        padding-bottom: ${videoHeight}px;
        width: ${wideContentWidth}px;
        ${format.design !== Design.Live ? marginAuto : null }
    }
`;

interface Props {
    video: Video;
    format: Format;
}

const HeaderVideo: FC<Props> = ({ video, format }): JSX.Element =>
    <div
        css={styles(format)}
        data-posterUrl={video.posterUrl}
        data-videoId={video.videoId}
        data-duration={video.duration}
    >
    </div>

// ----- Exports ----- //

export default HeaderVideo;
