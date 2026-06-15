export const SportsPageTabContent = ({
	isUsingclientSideTab,
	children,
}: {
	isUsingclientSideTab: boolean;
	children: React.ReactNode;
}) => {
	if (isUsingclientSideTab) {
		return <div>{children}</div>;
	}

	return <>{children}</>;
};
