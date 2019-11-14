import React from 'react';
import { render } from '@testing-library/react';
import { MostViewedList } from './MostViewedList';
import { response } from './MostViewedList.mocks';

import { useApi as useApi_ } from '../lib/api';

const useApi: any = useApi_;

jest.mock('../lib/api', () => ({
    useApi: jest.fn(),
}));

describe('MostViewedList', () => {
    beforeEach(() => {
        useApi.mockReset();
    });
    it('should call the api and render the response as expected', async () => {
        useApi.mockReturnValue(response);

        const { getAllByText } = render(<MostViewedList />);

        // Calls api once only
        expect(useApi).toHaveBeenCalledTimes(1);

        // Renders no more than 5 items
        expect(getAllByText(/LINKTEXT/).length).toBe(5);

        // Prefixes live articles correctly
        expect(getAllByText(/Live/).length).toBe(1);
    });

    it('should implement a limit on the number of items', async () => {
        useApi.mockReturnValue(response);

        const { getAllByText } = render(<MostViewedList limitItems={3} />);

        // Calls api once only
        expect(useApi).toHaveBeenCalledTimes(1);

        // Renders no more than 3 items
        expect(getAllByText(/LINKTEXT/).length).toBe(3);

        // Prefixes live articles correctly
        expect(getAllByText(/Live/).length).toBe(1);
    });
});
