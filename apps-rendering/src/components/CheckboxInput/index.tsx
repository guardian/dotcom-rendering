import { useState } from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { FormOption } from '@guardian/apps-rendering-api-models/formOption';
import { Checkbox, CheckboxGroup } from '@guardian/source-react-components';
import type { ReactElement } from 'react';

interface CheckboxInputProps {
	name: string;
	label: string;
	disabled: boolean;
	hideLabel: boolean;
	mandatory: boolean;
	options: FormOption[];
	supporting?: string;
	cssOverrides?: SerializedStyles;
}

const CheckboxInput = ({
	label,
	name,
	options,
	hideLabel,
	supporting,
	cssOverrides,
	disabled,
	mandatory,
}: CheckboxInputProps): ReactElement =>  (
	<CheckboxGroup
		id={`checkbox-group-${name}--${mandatory ? 'mandatory' : 'optional'}`}
		label={label}
		name={name}
		supporting={supporting}
		hideLabel={hideLabel}
		cssOverrides={cssOverrides}
	>
		{options.map(({ label, value }) => {
			return (
			<Checkbox
				label={label}
				value={value}
				key={value}
				disabled={disabled}
			/>
		)})}
	</CheckboxGroup>
);

export default CheckboxInput;
