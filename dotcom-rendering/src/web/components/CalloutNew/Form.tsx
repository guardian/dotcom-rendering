type FormProps = {
	formFields: CalloutBlockElement;
};

export const Form = ({ formFields }: FormProps) => (
	<>
		<div> {formFields.title} </div>
		<div> {formFields.description} </div>

		{formFields.formFields.map((field) => (
			<>
				<div>{field.name}</div>
				<div>{field.id}</div>
			</>
		))}
	</>
);
