// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import type { Option } from '@guardian/types';
import { withKnobs } from '@storybook/addon-knobs';
import type { ReactElement } from 'react';
import { selectPillar } from 'storybookHelpers';
import Pullquote from './index';

// ----- Setup ------ //

type Props = {
	quote: string;
	format: ArticleFormat;
	attribution: Option<string>;
};

const getInputProps = (): Props => ({
	quote: 'The anti-slaughter movement is declining due to increased surveillance and repression that criminalises Tibetan identity',
	attribution: { kind: 0, value: 'Katia Buffetrille, anthropologist' },
	format: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Analysis,
		theme: selectPillar(ArticlePillar.News),
	},
});

// ----- Stories ----- //

const Default = (): ReactElement => <Pullquote {...getInputProps()} />;

// ----- Exports ----- //

export default {
	component: Pullquote,
	title: 'AR/Editions/PullQuote',
	decorators: [withKnobs],
};

export { Default };
