type Props = {
	children: React.ReactNode;
};

/**
 * ServerSideOnly - Use this if you have some JSX you want to be rendered on the server - but not hydrated on the client
 *
 * How does this work? When on the server, this component will render its children within a <div> normally.
 * 	Once on the client, it will render a <div> with an empty dangerouslySetInnerHTML. This communicates to (p)react that there
 * 	should be HTML in the <div>, but because it's set with dangerouslySetInnerHTML, (p)react will not parse it as part of hydration.
 *
 * When do I need this? DCR will only hydrate code that lives within islands -
 * 	you should only need to use this component if you have specific code within an island you do not want to be hydrated.
 *
 * Note: Keep in mind this function prevents hydration, but does not prevent code from being included in the webpack bundle.
 * 	Be cautious in understanding *where* your imports are, to avoid including redundant code in the client bundle.
 */
export const ServerSideOnly = ({ children }: Props) => {
	const isClient = typeof window !== 'undefined';

	return isClient ? (
		// We do not need to set the actual html within the div, as (p)react is ambivalent towards the content
		<div dangerouslySetInnerHTML={{ __html: '' }} />
	) : (
		<div>{children}</div>
	);
};
