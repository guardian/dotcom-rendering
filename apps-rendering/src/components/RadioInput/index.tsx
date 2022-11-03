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
}

const RadioInput = ({label, name, options, supporting, cssOverrides}: RadioInputProps): ReactElement => (
		<RadioGroup
			label={label}
			name={name}
			orientation="horizontal"
			supporting={supporting}
			cssOverrides={cssOverrides}
		>
			{options.map(({ value, label }) => {
				return (
					<Radio
						key={value}
						value={value}
						label={label}
					/>
				);
			})}
		</RadioGroup>
);

export default RadioInput;
