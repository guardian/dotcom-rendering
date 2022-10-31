type Props = {
	callout: CalloutBlockElement;
};

export const Form = ({ callout }: Props) => (
	<>
		<div> {callout.title} </div>
	</>
);
