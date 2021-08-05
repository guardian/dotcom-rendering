// ----- Imports ----- //

import { Design, Display, Pillar } from '@guardian/types';
import type { Format, Option } from '@guardian/types';
import { withKnobs } from '@storybook/addon-knobs';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Pullquote from './index';

// ----- Setup ------ //

type Props = {
	quote: string;
	format: Format;
	attribution: Option<string>;
};

const getInputProps = (): Props => ({
	quote:
		'The anti-slaughter movement is declining due to increased surveillance and repression that criminalises Tibetan identity',
	attribution: { kind: 0, value: 'Katia Buffetrille, anthropologist' },
	format: {
		display: Display.Standard,
		design: Design.Analysis,
		theme: selectPillar(Pillar.News),
	},
});

// ----- Stories ----- //

const Default = (): ReactElement => <Pullquote {...getInputProps()} />;

// ----- Exports ----- //

export default {
	component: Pullquote,
	title: 'Editions/PullQuote',
	decorators: [withKnobs],
};

export { Default };
