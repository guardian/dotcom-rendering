import { isOneOf } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { deeplyReadRightColumn } from '../experiments/tests/deeply-read-right-column';
import { useAB } from './useAB';

const variants = [
	'deeply-read-only',
	'deeply-read-and-most-viewed',
	'most-viewed-only',
	'none',
] as const;
type Variant = (typeof variants)[number];

const isVariant = isOneOf(variants);

export const useDeeplyReadTestVariant = (): Variant => {
	const [variant, setVariant] = useState<Variant>('none');
	const ABTestAPI = useAB()?.api;

	useEffect(() => {
		const variantId =
			ABTestAPI?.runnableTest(deeplyReadRightColumn)?.variantToRun.id ??
			'none';

		if (isVariant(variantId)) {
			setVariant(variantId);
		}
	}, [ABTestAPI]);

	return variant;
};
