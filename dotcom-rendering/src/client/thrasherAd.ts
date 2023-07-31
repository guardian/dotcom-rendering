export const thrasherAd = (): Promise<void> => {
	// setTimeout(() => { alert('Thrasher Ad'); }, 1000);
	return new Promise((resolve) => {
		const el = document.getElementById('thrasher-ad');
		const adContainer = document.createElement('div');
		adContainer.setAttribute('class', 'ad-slot-container');
		const ad = document.createElement('div');
		ad.setAttribute('id', 'dfp-ad--external1');
		ad.setAttribute('data-link-name', 'ad slot external1');
		ad.setAttribute('data-name', 'external1');
		ad.setAttribute('aria-hidden', 'true');
		ad.setAttribute('class', 'js-ad-slot ad-slot ad-slot--external1');
		ad.setAttribute('data-label-show', 'true');
		adContainer.appendChild(ad);
		el?.appendChild(adContainer);
		resolve();
	});
};
