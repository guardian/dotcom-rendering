/**
 * @param {puppeteer.Browser} browser
 * @param {{url: string, options: LHCI.CollectCommand.Options}} context
 */
module.exports = async (browser, context) => {
	const page = await browser.newPage();
	await page.goto(context.url);
	const cookie = {
		name: 'gu-cmp-disabled',
		value: 'true',
		url: context.url,
		'Max-Age': '31536000', //year
	};

	await page.setCookie(cookie);
};
