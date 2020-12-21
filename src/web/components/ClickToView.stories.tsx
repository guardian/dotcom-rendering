/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
// import { css } from 'emotion';

import { ContainerLayout } from './ContainerLayout';
import { Figure } from './Figure';

import { ClickToView } from './ClickToView';

export default {
    component: ClickToView,
    title: 'Components/ClickToView',
};

export const DefaultStory = () => {
    return (
        <ContainerLayout>
            <Figure role="inline">
                <ClickToView width={620} height={400}>
                    <img src="http://placekitten.com/g/620/400" alt="" />
                </ClickToView>
            </Figure>
        </ContainerLayout>
    );
};
DefaultStory.story = { name: 'default' };

export const SmallStory = () => {
    return (
        <ContainerLayout>
            <Figure role="thumbnail">
                <ClickToView width={200} height={300}>
                    <img src="http://placekitten.com/g/200/300" alt="" />
                </ClickToView>
            </Figure>
        </ContainerLayout>
    );
};
SmallStory.story = { name: 'small' };
