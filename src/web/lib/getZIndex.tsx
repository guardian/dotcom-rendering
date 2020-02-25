import memoize from 'lodash.memoize';

type GroupNames = 'headerGroup' | 'bodyGroup';
type GroupObject<GroupNames extends string> = {
    [name in GroupNames]: string[];
};
type GroupLengths<GroupNames extends string> = {
    [name in GroupNames]: number;
};
type GetZIndexProps = { group: GroupNames; name: string };

// Ordering matters
// Later groups have higher z-index
// Siblings z-index, later = higher z-index
const bodyGroup = ['rightColumnArea', 'bodyArea'];
const headerGroup = ['headerWrapper', 'stickyAdWrapper'];
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

export const getZIndex = ({ group, name }: GetZIndexProps) => {
    const groupStartIndex = getGroupStartIndex(group);
    const siblingIndexInGroup = zIndexGroups[group].indexOf(name);
    const zIndex = groupStartIndex + siblingIndexInGroup;

    return `z-index: ${zIndex};`;
};
