import React from 'react';

import { ItemListLink } from './ItemListLink';

export default {
	component: ItemListLink,
	title: 'Components/ItemListLink',
};

export const Default = () => (
	<ItemListLink
		href="https://www.theguardian.com/technology/2019/oct/22/oneplus-7t-pro-review-the-best-kind-of-deja-vu"
		title="OnePlus 7T Pro review: the best kind of deja vu"
	/>
);
