type Props = { o: any };

export const JsonScript = ({ o }: Props) => {
	const JSONString: string = JSON.stringify(o);
	return (
		<script
			type="application/json"
			dangerouslySetInnerHTML={{ __html: JSONString }}
		/>
	);
};
