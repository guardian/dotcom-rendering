import React from 'react';
import { AMPCommon } from './primitives';

export const Img: React.SFC<ImgProps> = props => <amp-img {...props} />;

interface Props {
    alt: string;
    attribution: string;
}

interface Responsive {
    srcSet: SrcSet[];
    sizes: Size[];
}

export type ImgProps = AMPCommon & Props & (Src | Responsive);

export interface Src {
    src: string;
}
export interface SrcSet {
    src: string;
    w: string;
}
export interface Size {
    mediaQuery: string;
    width: string;
}
