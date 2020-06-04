import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import { rootConfig } from '@root/fixtures/rootConfig';
import { Callout } from './Callout';

describe('Callout', () => {
    it('toggle open and close form on bitton click', async () => {
        // Note: toBeVisible cannot be used on the form as the form does
        // not have the css style hidden. We therefore use the button's
        // dissaperance as a way to check the component is working as intended
        const { queryByText } = render(
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            <Callout campaign={rootConfig.page.campaigns[0]} pillar="news" />,
        );

        const openButton = queryByText('Tell us');
        expect(openButton).toBeVisible();
        if (openButton) {
            fireEvent.click(openButton);
        }
        await waitFor(() => {
            expect(queryByText('Tell us')).not.toBeInTheDocument();
        });

        const closeButton = queryByText('Hide');
        expect(closeButton).toBeVisible();
        if (closeButton) {
            fireEvent.click(closeButton);
        }
        await waitFor(() => {
            expect(queryByText('Hide')).not.toBeInTheDocument();
        });
    });

    it.todo('submit form', async () => {
        const { queryByText } = render(
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            <Callout campaign={rootConfig.page.campaigns[0]} pillar="news" />,
        );

        const submitButton = queryByText('Share with the Guardian');
        expect(submitButton).toBeVisible();
        if (submitButton) {
            fireEvent.click(submitButton);
        }
        // TODO: should display error if form is not fulled out

        // TODO: full out form and try submit again

        // TODO: test sucess message, and that no buttons display

        // TODO: test accessibility
    });
});
