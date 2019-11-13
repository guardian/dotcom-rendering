import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
import { render } from '@testing-library/react';
import { MostViewedList } from './MostViewedList';
import { response } from './MostViewedList.mocks';

import { useApi as useApi_ } from '../lib/api';

const useApi: any = useApi_;

jest.mock('../lib/api', () => ({
    useApi: jest.fn(),
}));

const VISIBLE = 'display: grid';
// const HIDDEN = 'display: none';

describe('MostViewedList', () => {
    beforeEach(() => {
        useApi.mockReset();
    });
    it('should call the api and render the response as expected', async () => {
        useApi.mockReturnValue(response);

        const { getByText, getAllByText, getByTestId } = render(
            <MostViewedList />,
        );

        // Calls api once only
        expect(useApi).toHaveBeenCalledTimes(1);

        // Renders all 20 items
        expect(getAllByText(/LINKTEXT/).length).toBe(20);

        // First tab defaults to visible
        expect(getByTestId(response.data.heading)).toHaveStyle(VISIBLE);

        // Prefixes live articles correctly
        expect(getAllByText(/Live/).length).toBe(1);

        // Handles &nbsp char
        expect(getByText('Across The Guardian')).toBeInTheDocument();
    });
});
