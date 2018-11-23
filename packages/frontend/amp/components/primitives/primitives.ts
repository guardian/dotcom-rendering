import { HTMLAttributes } from 'react';

interface AMPCommonBase {
    layout?:
        | 'nodisplay'
        | 'fixed'
        | 'responsive'
        | 'fixed-height'
        | 'fill'
        | 'container'
        | 'flex-item'
        | 'intrinsic';
    height?: string;
    width?: string;
    noloading?: true;
    on?: string;
    placeholder?: true;
    sizes?: 'string';
    fallback?: true;
}
interface Sized {
    layout: 'fixed' | 'responsive' | 'intrinsic';
    height: string;
    width: string;
}
interface FixedHeight {
    layout: 'fixed-height';
    height: string;
    width: undefined;
}
export type AMPCommon = (AMPCommonBase | Sized | FixedHeight) &
    HTMLAttributes<HTMLElement>;
