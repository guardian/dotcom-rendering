// ----- Imports ----- //

import { withKnobs } from '@storybook/addon-knobs';
import Footer from 'components/footer';
import type { FC } from 'react';

// ----- Stories ----- //

const WithCcpa: FC = () => <Footer isCcpa={true} />;

const Default: FC = () => <Footer isCcpa={false} />;

// ----- Exports ----- //

export default {
	component: Footer,
	title: 'AR/Footer',
	decorators: [withKnobs],
};

export { Default, WithCcpa };
