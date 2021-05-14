import React from 'react';

import { Lines } from '@guardian/src-ed-lines';

export const GuardianLines = ({
	// TODO: Use palette here once we have the latest version of src-ed-lines that suppprts the color prop,
	count,
	effect,
}: {
	// eslint-disable-next-line react/no-unused-prop-types
	palette: Palette;
	count?: 4 | 8;
	effect?: 'straight' | 'squiggly' | 'dotted';
}) => <Lines count={count} effect={effect} />;
