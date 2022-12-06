import type { SerializedStyles } from '@emotion/react';
import type { FormOption } from '@guardian/apps-rendering-api-models/formOption';
import { Radio, RadioGroup } from '@guardian/source-react-components';
import type { ReactElement } from 'react';

interface RadioInputProps {
	name: string;
	mandatory: boolean;
	options: FormOption[];
	cssOverrides?: SerializedStyles;
}

const RadioInput = ({
	name,
	options,
	cssOverrides,
	mandatory,
}: RadioInputProps): ReactElement => (
	<RadioGroup
		defaultChecked
		name={name}
		orientation="horizontal"
		cssOverrides={cssOverrides}
	>
		{options.map(({ value, label }, i) => (
			<Radio key={value} value={value} label={label} defaultChecked={mandatory && i===0}/>
		))}
	</RadioGroup>
);

export default RadioInput;
