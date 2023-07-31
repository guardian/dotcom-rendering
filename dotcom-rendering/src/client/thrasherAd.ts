export const thrasherAd = (): Promise<void> => {
	// setTimeout(() => { alert('Thrasher Ad'); }, 1000);
	return new Promise((resolve) => {
		const el = document.getElementById('thrasher-ad');
		const adContainer = document.createElement('div');
		console.log('el: ', el);
		adContainer.setAttribute('class', 'ad-slot-container');
		const ad = document.createElement('div');
		ad.setAttribute('id', 'dfp-ad--sponsored1');
		ad.setAttribute('data-link-name', 'ad slot sponsored1');
		ad.setAttribute('data-name', 'sponsored1');
		ad.setAttribute('aria-hidden', 'true');
		ad.setAttribute('class', 'js-ad-slot ad-slot ad-slot--sponsored1');
		ad.setAttribute('data-label-show', 'true');
		console.log('ad: ', ad);
		adContainer.appendChild(ad);
		console.log('adContainer: ', adContainer);
		el?.appendChild(adContainer);
		resolve();
	});
};
