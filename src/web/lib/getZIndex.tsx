// The z-indexes will be applied in order from 1 -> length of the array.
// The later in the array, the higher the z-index will be
// All indexes will be adjusted when new elements are added
const indices = [
    // Body
    'rightColumnArea',
    'bodyArea',

    // Header
    'stickyAdWrapper',
    'headerWrapper',

    // Modals will go here at the top
] as const;

type ZIndex = typeof indices[number];

export const getZIndex = (zIndex: ZIndex): string =>
    `z-index: ${indices.indexOf(zIndex) + 1};`;
