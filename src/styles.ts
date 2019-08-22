import { css } from '@emotion/core'

const BASE_PADDING = 8;

const baseMultiply = (value: number) : number => value * BASE_PADDING;

// We should try to standardise these with Design, Android and iOS
export const colours = {
    black: '#121212',
    white: '#ffffff',
    yellow: '#ffe500'
}

export const news = {

}

export const basePx = (...values: Array<number>): string => values.map(baseMultiply).join("px ") + "px"

export const sideMargins = {
    margin: basePx(0, 1)
};
