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

    // TODO: fix test
    // As the Nav bar now is rendered in NoJS we should be using `toHaveStyle`
    // to determin if the css display variable is hidden or not.
    // However, JSDOM (which is used to render the componet in @testing-library/react)
    // defaults to a very small width. On a smaller window size the Nav bar always displays
    // and instead uses a property called transform to jump into that page.
    // I have been unable to `toHaveStyle` to extract this changing property
    // nor have I been able to increase the width of the JSDOM being used to render

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
