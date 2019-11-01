import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Nav } from './Nav';
import { nav } from './Nav.mock';

// type Pillar = "news" | "opinion" | "sport" | "culture" | "lifestyle" | "labs"

describe('Nav', () => {
    it('should display pillar titles', () => {
        const { getByText } = render(<Nav pillar="news" nav={nav} />);

        expect(getByText('News')).toBeInTheDocument();
        expect(getByText('Opinion')).toBeInTheDocument();
        expect(getByText('Sport')).toBeInTheDocument();
        expect(getByText('Culture')).toBeInTheDocument();
    });

    it('should render the correct number of pillar items', () => {
        const { container } = render(<Nav pillar="news" nav={nav} />);

        const listItems = container.querySelectorAll('li');

        expect(listItems.length).toEqual(nav.pillars.length);
    });

    it('should open and close the expanded menu by clicking More', () => {
        const { getByTestId, getByText, queryAllByRole } = render(
            <Nav pillar="news" nav={nav} />,
        );

        const expandedMenu = getByTestId('expanded-menu');

        expect(queryAllByRole('menu')).toEqual([]);
        fireEvent.click(getByText('More'));
        expect(expandedMenu).toHaveStyle('display: block');
        expect(queryAllByRole('menu').length).toBeGreaterThan(1);
        fireEvent.click(getByText('More'));
        expect(queryAllByRole('menu')).toEqual([]);
    });
});
