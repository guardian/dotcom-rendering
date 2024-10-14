// ----- Imports ----- //

import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	Pillar,
} from '../../../articleFormat';
import type { Option } from '../../../../vendor/@guardian/types/index';
import type { ReactElement } from 'react';
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
		theme: Pillar.News,
	},
});

// ----- Stories ----- //

const Default = (): ReactElement => <Pullquote {...getInputProps()} />;

// ----- Exports ----- //

export default {
	component: Pullquote,
	title: 'AR/Editions/PullQuote',
};

export { Default };
