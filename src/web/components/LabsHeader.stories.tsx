import React from 'react';

import { LabsHeader } from './LabsHeader';

export default {
	component: LabsHeader,
	title: 'Components/LabsHeader',
};

export const Default = () => {
	return <LabsHeader />;
};
Default.story = { name: 'Default' };
