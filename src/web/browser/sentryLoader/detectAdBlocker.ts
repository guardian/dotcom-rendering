let adBlockInUse: boolean;

export const isAdBlockInUse: () => Promise<boolean> = () => {
	if (adBlockInUse !== undefined) {
		return Promise.resolve(adBlockInUse);
	}

	if (typeof window.getComputedStyle !== 'function') {
		// Old browsers not supporting getComputedStyle most likely won't have adBlockers
		adBlockInUse = false;
		return Promise.resolve(adBlockInUse);
	}

	return new Promise((resolve) => {
		const ad = document.createElement('div');

		ad.style.position = 'absolute';
		ad.style.left = '0';
		ad.style.top = '0';
		ad.style.height = '10px';
		ad.style.zIndex = '-1';
		ad.innerHTML = '&nbsp;';
		ad.setAttribute('class', 'ad_unit');

		// avoid a forced layout
		window.requestAnimationFrame(() => {
			document.body.appendChild(ad);

			// avoid a forced layout
			window.requestAnimationFrame(() => {
				const adStyles = window.getComputedStyle(ad);
				const displayProp =
					adStyles && adStyles.getPropertyValue('display');
				const mozBindingProp =
					adStyles && adStyles.getPropertyValue('-moz-binding');

				adBlockInUse =
					displayProp === 'none' ||
					!!(mozBindingProp && mozBindingProp.includes('about:'));

				resolve(adBlockInUse);
			});
		});
	});
};
