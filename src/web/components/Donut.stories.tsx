import React from 'react';

import { Donut } from './Donut';

export default {
    component: Donut,
    title: 'Components/Donut',
};

export const Default = () => {
    return <Donut />;
};
Default.story = { name: 'default' };
