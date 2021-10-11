// ----- Imports ----- //

import { css } from '@emotion/react';
import { news } from '@guardian/src-foundations';
import { withKnobs } from '@storybook/addon-knobs';
import type { ReactElement } from 'react';
import ToggleSwitch from './toggleSwitch';

// ----- Setup ----- //


// ----- Stories ----- //

const Default = (): ReactElement => (
	<ToggleSwitch/>
);

const IOS = (): ReactElement => (
	<ToggleSwitch
		device="ios"
	/>
);

const AndroidLabel = (): ReactElement => (
	<ToggleSwitch
		device="android"
		label={'Get alerts on this story'}
	/>
);

const IOSLabel = (): ReactElement => (
	<ToggleSwitch
		device="ios"
		label={'Get alerts on this story'}
	/>
);

const darkBackgroundStyle = css`
	width: 100%;
	height: 100%;
	background: ${news[200]}
`;

const IOSDarkBackground = (): ReactElement => (
	<div css={darkBackgroundStyle}>
		<ToggleSwitch
			isDarkBackground={true}
			device="ios"
			label={'Get alerts on this story'}
		/>
	</div>
);


const AndroidDarkBackground = (): ReactElement => (
	<div css={darkBackgroundStyle}>
		<ToggleSwitch
			isDarkBackground={true}
			device="android"
			label={'Get alerts on this story'}
		/>
	</div>
);

// ----- Exports ----- //

export default {
	component: ToggleSwitch,
	title: 'AR/Toggle Switch',
	decorators: [withKnobs],
};

export { Default, IOS, AndroidLabel, IOSLabel, IOSDarkBackground, AndroidDarkBackground};
