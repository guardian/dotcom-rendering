import React, { FC, ReactElement } from 'react';
import { css } from '@emotion/core';

export interface AudioProps {
    src: string;
    width: string;
    height: string;
}

const audioStyles = css`
    border: none;
`;

const Audio: FC<AudioProps> = ({ src, width, height }: AudioProps): ReactElement =>
    <iframe css={audioStyles} src={src} sandbox="allow-scripts" height={height} width={width} title="Audio element"/>

export default Audio;