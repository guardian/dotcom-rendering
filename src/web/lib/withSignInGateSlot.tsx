// This placeholder p is used by the SignInGate component to insert the sign in gate into the appropriate location within body of an article,
// if the SignInGateSelector determines a gate should be rendered.

const SignInGateSlot = <p id="sign-in-gate" />;

export const withSignInGateSlot = (
	articleElements: (JSX.Element | null | undefined)[],
): React.ReactNode => {
	return articleElements.map((element, i) => {
		return (
			<>
				{element}
				{/* Add the placeholder div after the second article element */}
				{i === 1 && SignInGateSlot}
			</>
		);
	});
};
