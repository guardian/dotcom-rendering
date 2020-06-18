// ----- Imports ----- //

import React, { FC } from 'react';
import { css } from '@emotion/core'
import { remSpace, neutral } from '@guardian/src-foundations';

import { darkModeCss } from 'styles';
import { Option } from 'types/option';
import { Video } from 'video';

// ----- Component ----- //

const styles = css`
    margin: 0 0 ${remSpace[2]} 0;
    position: relative;
    display: block;
    width: 100%;
    padding-bottom: 56.25%;
    background: ${neutral[97]};
    ${darkModeCss`
        background: ${neutral[20]};
    `}
`;

interface Props {
    video: Option<Video>
}

const HeaderVideo: FC<Props> = ({ video }): JSX.Element =>
    video.fmap(({
        posterUrl,
        videoId,
        duration
    }) =>
        <div
            css={styles}
            data-posterUrl={posterUrl}
            data-videoId={videoId}
            data-duration={duration}
        >
        </div>
    ).withDefault(<></>)

// ----- Exports ----- //

export default HeaderVideo;
