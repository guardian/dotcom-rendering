import {
    mockTab1,
    mockTab2,
    mockMostCommented,
    mockMostShared,
} from '@root/fixtures/mostViewed';

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

export const responseWithMissingImage = {
    tabs: [mockTab1],
    mostCommented: mockMostCommented,
    mostShared: {
        ...mockMostShared,
        image: null,
    },
};
