import type { SerializedStyles } from '@emotion/react';
import type { FormOption } from '@guardian/apps-rendering-api-models/formOption';
import { Radio, RadioGroup } from '@guardian/source-react-components';
import type { ReactElement } from 'react';

interface RadioInputProps {
	name: string;
	label: string;
	supporting?: string;
	options: FormOption[];
	cssOverrides?: SerializedStyles;
	disabled: boolean;
}

const RadioInput = ({
	label,
	name,
	options,
	supporting,
	cssOverrides,
	disabled,
}: RadioInputProps): ReactElement => (
	<RadioGroup
		label={label}
		name={name}
		orientation="horizontal"
		supporting={supporting}
		cssOverrides={cssOverrides}
		disabled={disabled}
	>
		{options.map(({ value, label }) => (
			<Radio key={value} value={value} label={label} />
		))}
	</RadioGroup>
);

export default RadioInput;
