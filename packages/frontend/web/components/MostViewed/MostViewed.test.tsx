import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { MostViewed } from './MostViewed';
import { responseWithTwoTabs, responseWithOneTab } from './MostViewed.mocks';

const VISIBLE = 'display: block';
const HIDDEN = 'display: none';

const mockFetchResponse = (response: any) => ({
    ok: true,
    json: () => response,
});

describe('MostViewed', () => {
    const globalAny: any = global;
    const config: ConfigType = {
        ajaxUrl: 'https://api.nextgen.guardianapps.co.uk',
        sentryHost: '',
        sentryPublicApiKey: '',
        switches: {},
        abTests: {},
        dfpAccountId: '',
        commercialBundleUrl: '',
        revisionNumber: '',
        isDev: false,
        googletagUrl: '',
        stage: 'DEV',
        frontendAssetsFullURL: '',
        hbImpl: '',
        adUnit: '',
        isSensitive: '',
        videoDuration: 0,
        edition: '',
        section: '',
        sharedAdTargeting: {},
    };

    it('should call the api and render the response as expected', async () => {
        globalAny.fetch = jest.fn(async () =>
            mockFetchResponse(responseWithTwoTabs),
        );

        const { getByText, getAllByText, getByTestId } = render(
            <MostViewed config={config} sectionName="Section Name" />,
        );

        await waitForElement(() => getByTestId(responseWithTwoTabs[0].heading));

        // Calls api once only
        expect(globalAny.fetch).toHaveBeenCalledTimes(1);

        // Renders all 20 items
        expect(getAllByText(/LINKTEXT/).length).toBe(20);

        // First tab defaults to visible
        expect(getByTestId(responseWithTwoTabs[0].heading)).toHaveStyle(
            VISIBLE,
        );

        // Prefixes live articles correctly
        expect(getAllByText(/Live/).length).toBe(1);

        // Handles &nbsp char
        expect(getByText('Across The Guardian')).toBeInTheDocument();
    });

    it('should change the items shown when the associated tab is clicked', async () => {
        globalAny.fetch = jest.fn(async () =>
            mockFetchResponse(responseWithTwoTabs),
        );

        const { getByTestId, getByText } = render(
            <MostViewed config={config} sectionName="Section Name" />,
        );

        await waitForElement(() => getByTestId(responseWithTwoTabs[0].heading));

        const firstHeading = responseWithTwoTabs[0].heading;
        const secondHeading = responseWithTwoTabs[1].heading;

        expect(getByTestId(firstHeading)).toHaveStyle(VISIBLE);
        expect(getByTestId(secondHeading)).toHaveStyle(HIDDEN);

        fireEvent.click(getByText(secondHeading));

        expect(getByTestId(firstHeading)).toHaveStyle(HIDDEN);
        expect(getByTestId(secondHeading)).toHaveStyle(VISIBLE);

        // Hardcode this text here because the actual raw data contains $nbsp; which is removed during rendering
        fireEvent.click(getByText('Across The Guardian'));

        expect(getByTestId(firstHeading)).toHaveStyle(VISIBLE);
        expect(getByTestId(secondHeading)).toHaveStyle(HIDDEN);
    });

    it('should not show the tab menu when there is only one group of tabs', async () => {
        globalAny.fetch = jest.fn(async () =>
            mockFetchResponse(responseWithOneTab),
        );

        const { queryByText, getByTestId } = render(
            <MostViewed config={config} sectionName="Section Name" />,
        );

        await waitForElement(() => getByTestId(responseWithOneTab[0].heading));

        expect(
            queryByText(responseWithOneTab[0].heading),
        ).not.toBeInTheDocument();
    });

    // TODO: Restore this once the component has this feature added to it
    it.skip('should show a byline when this property is set to true', async () => {
        globalAny.fetch = jest.fn(async () =>
            mockFetchResponse(responseWithTwoTabs),
        );

        const { getByText, getByTestId } = render(
            <MostViewed config={config} sectionName="Section Name" />,
        );

        await waitForElement(() => getByTestId(responseWithTwoTabs[0].heading));

        expect(
            getByText(responseWithTwoTabs[0].trails[9].byline),
        ).toBeInTheDocument();
    });
});
