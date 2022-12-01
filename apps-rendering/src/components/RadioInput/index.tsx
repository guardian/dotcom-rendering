import type { SerializedStyles } from '@emotion/react';
import type { FormOption } from '@guardian/apps-rendering-api-models/formOption';
import { Radio, RadioGroup } from '@guardian/source-react-components';
import type { ReactElement } from 'react';

interface RadioInputProps {
	name: string;
	disabled: boolean;
	mandatory: boolean;
	options: FormOption[];
	cssOverrides?: SerializedStyles;
}

const RadioInput = ({
	name,
	options,
	cssOverrides,
	disabled,
	mandatory,
}: RadioInputProps): ReactElement => (
	<RadioGroup
		defaultChecked
		name={name}
		orientation="horizontal"
		cssOverrides={cssOverrides}
		disabled={disabled}
	>
		{options.map(({ value, label }, i) => (
			<Radio key={value} value={value} label={label} defaultChecked={mandatory && i===0}/>
		))}
	</RadioGroup>
);

export default RadioInput;
