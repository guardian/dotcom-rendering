export interface TestContentProps {
	message: string;
}

export const TestContent = ({ message }: TestContentProps) => (
	<main>
		<h1>This is a test page Component</h1>
		<p>Message: {message}</p>
	</main>
);
