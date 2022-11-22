import type { SerializedStyles } from '@emotion/react';
import type { FormOption } from '@guardian/apps-rendering-api-models/formOption';
import { Checkbox, CheckboxGroup } from '@guardian/source-react-components';
import type { ReactElement } from 'react';

interface CheckboxInputProps {
	name: string;
	label: string;
	supporting?: string;
	options: FormOption[];
	cssOverrides?: SerializedStyles;
	disabled: boolean;
}

const CheckboxInput = ({
	label,
	name,
	options,
	supporting,
	cssOverrides,
	disabled,
}: CheckboxInputProps): ReactElement => (
	<CheckboxGroup
		label={label}
		name={name}
		supporting={supporting}
		cssOverrides={cssOverrides}
	>
		{options.map(({ label, value }) => (
			<Checkbox label={label} value={value} key={value} disabled={disabled}/>
		))}
	</CheckboxGroup>
);

export default CheckboxInput;
