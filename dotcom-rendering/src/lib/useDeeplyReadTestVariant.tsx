import { useEffect, useState } from 'react';
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
		if (
			ABTestAPI?.isUserInVariant(
				'DeeplyReadRightColumn',
				'deeply-read-only',
			)
		) {
			setVariant('deeply-read-only');
		} else if (
			ABTestAPI?.isUserInVariant(
				'DeeplyReadRightColumn',
				'deeply-read-and-most-viewed',
			)
		) {
			setVariant('deeply-read-and-most-viewed');
		} else if (
			ABTestAPI?.isUserInVariant(
				'DeeplyReadRightColumn',
				'most-viewed-only',
			)
		) {
			setVariant('most-viewed-only');
		} else {
			setVariant('none');
		}
	}, [ABTestAPI]);

	return variant;
};
