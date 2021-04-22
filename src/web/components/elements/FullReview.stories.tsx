import React from 'react';

import { Pillar } from '@guardian/types';

import { FullReview } from './FullReview';

export default {
	component: FullReview,
	title: 'Components/FullReview',
};

export const Default = () => (
	<FullReview
		href="https://www.theguardian.com/technology/2019/oct/22/oneplus-7t-pro-review-the-best-kind-of-deja-vu"
		title="OnePlus 7T Pro review: the best kind of deja vu"
		pillar={Pillar.News}
	/>
);
