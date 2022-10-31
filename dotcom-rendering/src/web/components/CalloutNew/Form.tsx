type FormProps = {
	formFields: CalloutBlockElement;
};

export const Form = ({ formFields }: FormProps) => (
	<>
		<div> {formFields.title} </div>
	</>
);
