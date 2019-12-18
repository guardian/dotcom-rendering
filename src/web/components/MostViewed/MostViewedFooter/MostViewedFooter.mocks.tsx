import {
    mockTab1,
    mockTab2,
    mockMostCommented,
    mockMostShared,
} from '../MostViewed.mocks';

export const responseWithTwoTabs = {
    tabs: [mockTab1, mockTab2],
    mostCommented: mockMostCommented,
    mostShared: mockMostShared,
};

export const responseWithOneTab = {
    tabs: [mockTab1],
    mostCommented: mockMostCommented,
    mostShared: mockMostShared,
};
