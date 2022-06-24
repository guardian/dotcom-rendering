// RecipeAtomWrapper.importable.tsx
import { RecipeAtom } from '@guardian/atoms-rendering';

type RecipeSchemaProps = {
	id: string;
	json: string;
};

export const RecipeSchemaAtomWrapper = (props: RecipeSchemaProps) => (
	<RecipeAtom {...props}></RecipeAtom>
);
