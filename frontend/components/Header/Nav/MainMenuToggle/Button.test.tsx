import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button } from './Button';
import { Span } from './Span';

describe('Button', () => {
    let onMouseEnter: () => void;
    let onMouseLeave: () => void;

    beforeEach(() => {
        onMouseEnter = jest.fn();
        onMouseLeave = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('snapshots', () => {
        it('It should render with correct styles if inFocus is false', () => {
            const component = shallow(
                <Button
                    inFocus={false}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />,
            );

            expect(component).toMatchSnapshot();
        });

        it('It should render with correct styles if inFocus is true', () => {
            const component = shallow(
                <Button
                    inFocus={true}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />,
            );

            expect(component).toMatchSnapshot();
        });

        it('It should update when clicked', () => {
            const component = shallow(
                <Button
                    inFocus={false}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />,
            );

            component.simulate('click');

            expect(component).toMatchSnapshot();
        });
    });

    it('It should call onMouseEnter prop when mouseEnter event occurs', () => {
        const component = shallow(
            <Button
                inFocus={false}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />,
        );

        component.simulate('mouseEnter');

        expect(onMouseEnter).toHaveBeenCalled();
    });

    it('It should call onMouseLeave prop when mouseLeave event occurs', () => {
        const component = shallow(
            <Button
                inFocus={false}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />,
        );

        component.simulate('mouseLeave');

        expect(onMouseLeave).toHaveBeenCalled();
    });

    it('It should update state when clicked', () => {
        const component = shallow(
            <Button
                inFocus={false}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />,
        );

        expect(component.state('count')).toBe(0);

        component.simulate('click');

        expect(component.state('count')).toBe(1);
    });

    it('It should render child component <Span>', () => {
        const component = mount(
            <Button
                inFocus={false}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />,
        );

        expect(component.find(Span).length).toBe(1);
        expect(
            component
                .find(Span)
                .first()
                .prop('count'),
        ).toBe(0);
    });

    it('It should pass correct props child component <Span> after click', () => {
        const component = mount(
            <Button
                inFocus={false}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />,
        );

        expect(
            component
                .find(Span)
                .first()
                .prop('count'),
        ).toBe(0);

        component.simulate('click');

        expect(
            component
                .find(Span)
                .first()
                .prop('count'),
        ).toBe(1);
    });

    it('It should doSomethingToState', () => {
        const component = shallow(
            <Button
                inFocus={false}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />,
        );

        const componentInstance = component.instance() as Button;

        expect(
            component
                .find(Span)
                .first()
                .prop('count'),
        ).toBe(0);

        componentInstance.doSomethingToState();

        expect(
            component
                .find(Span)
                .first()
                .prop('count'),
        ).toBe(1);
    });
});
