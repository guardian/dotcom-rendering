type FormDataType = { [key in string]: any };

type FormFieldProp = {
	formField: CampaignFieldType;
	formData: FormDataType;
	setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

type FormProps = {
	formFields: CampaignFieldType[];
};

export const Form = ({ formFields }: FormProps) => (
	<>
		{/* <div> {formFields.title} </div>
		<div> {formFields.description} </div> */}

		{formFields.map((field) => (
			<>
				<div>{field.name}</div>
				<div>{field.id}</div>
			</>
		))}
	</>
);
