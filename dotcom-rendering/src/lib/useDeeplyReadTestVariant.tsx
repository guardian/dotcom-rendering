import { useEffect, useState } from 'react';
import { deeplyReadRightColumn } from '../experiments/tests/deeply-read-right-column';
import { useAB } from './useAB';

type Variant =
	| 'deeply-read-only'
	| 'deeply-read-and-most-viewed'
	| 'most-viewed-only'
	| 'none';

export const useDeeplyReadTestVariant = (): Variant => {
	const [variant, setVariant] = useState<Variant>('none');
	const ABTestAPI = useAB()?.api;

	useEffect(() => {
		const variantId =
			(ABTestAPI?.runnableTest(deeplyReadRightColumn)?.variantToRun.id as
				| Variant
				| undefined) ?? 'none';

		setVariant(variantId);
	}, [ABTestAPI]);

	return variant;
};
