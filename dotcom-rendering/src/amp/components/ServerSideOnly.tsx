type Props = {
	children: React.ReactNode;
};

export const ServerSideOnly = ({ children }: Props) => {
	const isClient = typeof window !== 'undefined';

	return isClient ? (
		<div dangerouslySetInnerHTML={{ __html: '' }} />
	) : (
		<div> {children}</div>
	);
};
