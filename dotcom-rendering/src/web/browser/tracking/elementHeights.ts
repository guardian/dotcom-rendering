const getMainContentHeight = (): number => {
	const body: HTMLElement = document.body;
	const mainContent = document.querySelector<HTMLElement>('#maincontent');
	if (!mainContent) return -1;

	return (
		mainContent.getBoundingClientRect().bottom -
		body.getBoundingClientRect().top
	);
};

export { getMainContentHeight };
