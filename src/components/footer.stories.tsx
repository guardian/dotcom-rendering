// ----- Imports ----- //
import FooterCcpa from 'components/shared/footer';
import { withKnobs } from '@storybook/addon-knobs';
import type { FC, ReactElement } from 'react';
import React from 'react';
import { footerContents } from './shared/footer';

const FooterCcpa = (): ReactElement => {
	return <div>{footerContents(true)}</div>;
};

// ----- Stories ----- //

const Default: FC = (): ReactElement => {
	return <FooterCcpa />;
};

export default {
	component: FooterCcpa,
	title: 'Footer',
	decorators: [withKnobs],
};

export { Default };
