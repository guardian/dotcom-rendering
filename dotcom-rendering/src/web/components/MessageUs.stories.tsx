import { SendAMessage } from './MessageUs';
import { Section } from './Section';
import { MessageForm } from '../../../fixtures/manual/message-us-form';
export default {
	component: SendAMessage,
	title: 'Components/MessageUs',
	parameters: {
		chromatic: { diffThreshold: 0.2 },
	},
};

export const Default = () => {
	return (
		<Section>
			<SendAMessage
				formFields={MessageForm.formFields}
				submissionURL={MessageForm.submissionURL}
				formID={MessageForm.formID}
			/>
		</Section>
	);
};
Default.story = { name: 'default' };
