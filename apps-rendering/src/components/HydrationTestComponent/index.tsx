import {
	Hydrateable,
	makeRenderInnerComponentFunction,
} from 'client/hydratables';
import { FC } from 'react';
import { HydrationTestComponentInner, Props } from './inner';

const containerClassName = 'js-test-component-container';

const HydrationTestComponent: FC<Props> = (props) => {
	return (
		<div className={containerClassName} data-props={JSON.stringify(props)}>
			<HydrationTestComponentInner {...props} />
		</div>
	);
};

const testComponentnHydrateable: Hydrateable = {
	containerClassName,
	renderInnerComponent: makeRenderInnerComponentFunction(
		HydrationTestComponentInner,
	),
	needsInlineStyles: true,
};

// ----- Exports ----- //

export default HydrationTestComponent;
export { testComponentnHydrateable };
