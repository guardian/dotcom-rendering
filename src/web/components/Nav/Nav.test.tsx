import React from 'react';
import { render, within } from '@testing-library/react';
import { Nav } from './Nav';
import { nav } from './Nav.mock';

// type Pillar = "news" | "opinion" | "sport" | "culture" | "lifestyle" | "labs"

describe('Nav', () => {
    it('should display pillar titles', () => {
        const { getByTestId } = render(
            <Nav pillar="news" nav={nav} display="standard" />,
        );

        const list = within(getByTestId('pillar-list'));

        expect(list.getByText('News')).toBeInTheDocument();
        expect(list.getByText('Opinion')).toBeInTheDocument();
        expect(list.getByText('Sport')).toBeInTheDocument();
        expect(list.getByText('Culture')).toBeInTheDocument();
    });

    it('should render the correct number of pillar items', () => {
        const { getByTestId } = render(
            <Nav pillar="news" nav={nav} display="standard" />,
        );

        const list = getByTestId('pillar-list');
        const listItems = list.querySelectorAll('li');

        expect(listItems.length).toEqual(nav.pillars.length);
    });

    // TODO:
    // it('should open and close the expanded menu by clicking More', () => {
    //     const { getByTestId, getByText } = render(
    //         <Nav pillar="news" nav={nav} display="standard" />,
    //     );
    //     const expandedMenu = getByTestId('expanded-menu');
    //     expect(expandedMenu).toHaveStyle('display: none');
    //     fireEvent.click(getByText('More'));
    //     expect(expandedMenu).toHaveStyle('display: block');
    //     fireEvent.click(getByText('More'));
    //     expect(expandedMenu).toHaveStyle('display: none');
    // });
});
