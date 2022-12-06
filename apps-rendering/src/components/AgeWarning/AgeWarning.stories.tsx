// ----- Imports ----- //

import { withKnobs } from '@storybook/addon-knobs';
import type { FC } from 'react';
import { AgeWarning } from '.';

// ----- Stories ----- //

const Default: FC = () => <AgeWarning age="10 years old" />;

const SmallWarning: FC = () => <AgeWarning age="5 months old" size="small" />;

const ScreenReaderVersion: FC = () => (
	<AgeWarning age="20 million years old" isScreenReader={true} />
);

const MissingOldText: FC = () => <AgeWarning age="5 years" />;

// ----- Exports ----- //

export default {
	component: AgeWarning,
	title: 'AR/AgeWarning',
	decorators: [withKnobs],
};

export { Default, SmallWarning, ScreenReaderVersion, MissingOldText };
