import type { SerializedStyles } from '@emotion/react';
import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import { Radio, RadioGroup } from '@guardian/source-react-components';
import type { ReactElement } from 'react';

interface RadioInputProps {
	formField: FormField;
	formData: { [key in string]: any };
	setFieldInFormData: (id: string, data: string | undefined) => void;
	error?: string;
	cssOverrides?: SerializedStyles;
}

const RadioInput = ({
	formField,
	formData,
	setFieldInFormData,
	error,
	cssOverrides,
}: RadioInputProps): ReactElement => {
	const { name, options, id, label, description } = formField;
	return (
		<RadioGroup
			defaultChecked
			name={name}
			orientation="horizontal"
			cssOverrides={cssOverrides}
			label={label}
			supporting={description}
			id={name}
			error={error}
		>
			{options.map((option) => (
				<Radio
					key={option.value}
					value={option.value}
					label={option.label}
					checked={id in formData && formData[id] === option.value}
					onChange={(): void => setFieldInFormData(id, option.value)}
				/>
			))}
		</RadioGroup>
	);
};

export default RadioInput;
