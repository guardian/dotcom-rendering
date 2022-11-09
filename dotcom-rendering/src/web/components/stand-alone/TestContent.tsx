import { Section } from '../Section';

export interface TestContentProps {
	message: string;
}

export const TestContent = ({ message }: TestContentProps) => (
	<main>
		<Section>
			<h1>This is a test page Component</h1>
			<p>Message: {message}</p>
		</Section>
	</main>
);
