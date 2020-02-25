import memoize from 'lodash.memoize';

type GroupNames = 'headerGroup' | 'bodyGroup';
type BodyGroupTuple = typeof bodyGroup; // ['rightColumnArea', 'bodyArea']
type BodyGroup = BodyGroupTuple[number]; // UnionType: 'rightColumnArea' | 'bodyArea'
type HeaderGroupTuple = typeof headerGroup;
type HeaderGroup = HeaderGroupTuple[number];

type GroupObject<GroupNames extends string> = {
    [name in GroupNames]: BodyGroupTuple | HeaderGroupTuple;
};
type GroupLengths<GroupNames extends string> = {
    [name in GroupNames]: number;
};
type GetZIndexProps = { group: GroupNames; name: BodyGroup | HeaderGroup };

// Ordering matters
// You have:
// 1. ZIndexGroups - An object of {key: groupArr} that contains all the sibling groups, in order.
// 2. Group Arrays - An ordered list of elements that require a z-index, that live in a group together.
//    Elements live together in groups - header, footer, body, modal for example.

// A group is an array of siblings.
// The array is ordered and z-index will be higher for elements
// that live later in the array.
// The array is frozen at this point as siblings must only
// be added here.
// `as const` allows us to generate a union type from the array.
const bodyGroup = ['rightColumnArea', 'bodyArea'] as const;
const headerGroup = ['headerWrapper', 'stickyAdWrapper'] as const;

// The order of the group in the object defines the z-index
// of the group's children based on the length of the previous
// group arrays.
// The util will take each group, looping the siblings of the group
// incrementally assigning a z-index to each one until the groups are
// exhausted. Phew.
const zIndexGroups: GroupObject<string> = {
    bodyGroup,
    headerGroup,
};

// Returns the start index of each group
// eg: {bodyGroup: 3, headerGroup: 4}
const getStartIndexObj = () => {
    const startIdxes: GroupLengths<string> = {};
    let currentIdx: number = 1;
    Object.keys(zIndexGroups).forEach(item => {
        startIdxes[item] = currentIdx;
        currentIdx += zIndexGroups[item].length; // Start index for next group
    });
    return startIdxes;
};

// Returns the start index of the group
const getGroupStartIndex = (group: GroupNames): number => {
    const allStartIndexes = memoize(() => getStartIndexObj()); // We only need to build this once per run
    return allStartIndexes()[group];
};

export const getZIndex = ({ group, name }: GetZIndexProps): string => {
    const groupStartIndex = getGroupStartIndex(group);
    const zIndexGroupArray: readonly string[] = zIndexGroups[group];
    const siblingIdxInGroup = zIndexGroupArray.indexOf(name);
    const zIndex = groupStartIndex + siblingIdxInGroup;

    return `z-index: ${zIndex};`;
};
