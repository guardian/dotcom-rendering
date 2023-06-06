// ----- Imports ----- //

import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer.importable';

// ----- Meta ----- //

type Story = StoryObj<typeof Footer>;

const meta: Meta<typeof Footer> = {
    component: Footer,
    title: 'Components/Footer/Apps'
};

export default meta;

// ----- Stories ----- //

export const Default: Story = {
    args: {
        year: 2023,
    }
};
